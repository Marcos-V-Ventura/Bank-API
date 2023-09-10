let bancodedados = require("../bancodedados")
let utils = require("../helpers/utils")
let errorMessages = require("../helpers/errorMessages")
let idContaNova = (bancodedados.contas.length + 1)

function listarContas(req, res) {
    let { senha_banco } = req.query;

    if (!senha_banco) return res.status(400).json({ mensagem: errorMessages.senhaObrigatoria })

    if (senha_banco !== "Cubos123Bank") return res.status(403).json({ mensagem: errorMessages.senhaBancoInvalida })

    return res.status(200).json(bancodedados.contas)
}

function criarContaBancaria(req, res) {
    let { nome, cpf, data_nascimento, telefone, senha, email } = req.body


    if (utils.EmailOuCpfRepetido(email, email, cpf))
        return res.status(406).json({ mensagem: errorMessages.contaExistente })

    bancodedados.contas.push({
        numero: (idContaNova++).toString(),
        saldo: 0,
        usuario: { nome, cpf, data_nascimento, telefone, senha, email }
    })

    return res.status(204).json()
}

function atualizarUsuario(req, res) {
    let { numeroConta } = req.params;
    let { nome, cpf, data_nascimento, telefone, senha, email } = req.body;
    let usuarioAtualizado = utils.encontrarUsuario(numeroConta);

    if (!usuarioAtualizado)
        return res.status(404).json({ mensagem: errorMessages.contaNaoEncontrada })

    if (utils.EmailOuCpfRepetido(numeroConta, email, cpf))
        return res.status(406).json({ mensagem: errorMessages.contaExistente })

    usuarioAtualizado.usuario = { nome, cpf, data_nascimento, telefone, senha, email }

    return res.status(204).json()
}

function excluirConta(req, res) {
    let { numeroConta } = req.params
    let usuarioExcluido = utils.encontrarUsuario(numeroConta)

    if (!usuarioExcluido)
        return res.status(404).json({ mensagem: errorMessages.contaNaoEncontrada })

    if (usuarioExcluido.saldo !== 0)
        return res.status(400).json({ mensagem: errorMessages.saldoNaoZero })

    bancodedados.contas = bancodedados.contas.filter(element => element.numero !== numeroConta)

    return res.status(204).json()
}

function extrato(req, res) {
    let { numero_conta, senha } = req.query
    let contaExtrato = utils.encontrarUsuario(numero_conta)

    if (!numero_conta || !senha)
        return res.status(400).json({ mensagem: errorMessages.camposSaldoExtratoObrigatorios })

    if (!contaExtrato) return res.status(404).json({ mensagem: errorMessages.contaNaoEncontrada })

    if (contaExtrato.usuario.senha !== senha)
        return res.status(403).json({ mensagem: errorMessages.senhaUsuarioInvalida })

    let movimentacaoBanco = {
        depositos: bancodedados.depositos.filter(element => element.numero_conta === numero_conta),
        saques: bancodedados.saques.filter(element => element.numero_conta === numero_conta),
        transferenciasEnviadas: bancodedados.transferencias.filter(element => element.numero_conta_origem === numero_conta),
        transferenciasRecebidas: bancodedados.transferencias.filter(element => element.numero_conta_destino === numero_conta)
    }

    return res.status(200).json(movimentacaoBanco)
}

module.exports = { listarContas, criarContaBancaria, atualizarUsuario, excluirConta, extrato }
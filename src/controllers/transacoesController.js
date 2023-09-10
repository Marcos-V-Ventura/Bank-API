let bancodedados = require("../bancodedados")
let utils = require("../helpers/utils")
let errorMessages = require("../helpers/errorMessages")

function depositar(req, res) {
    let { numero_conta, valor } = req.body;
    let usuarioDeposito = utils.encontrarUsuario(numero_conta)

    if (!numero_conta || !valor)
        return res.status(400).json({ mensagem: errorMessages.camposDepositarObrigatorios })

    if (!usuarioDeposito)
        return res.status(404).json({ mensagem: errorMessages.contaNaoEncontrada })

    if (valor <= 0)
        return res.status(400).json({ mensagem: errorMessages.valorMinimo })

    usuarioDeposito.saldo += valor;
    bancodedados.depositos.push(utils.criarExtratoDepositoSaque(numero_conta, valor))

    return res.status(204).json()
}

function sacar(req, res) {
    let { numero_conta, valor, senha } = req.body;
    let usuarioSacar = utils.encontrarUsuario(numero_conta)

    if (!usuarioSacar)
        return res.status(404).json({ mensagem: errorMessages.contaNaoEncontrada })

    if (!numero_conta || !valor || !senha)
        return res.status(400).json({ mensagem: errorMessages.camposSacarObrigatorios })

    if (usuarioSacar.usuario.senha !== senha)
        return res.status(403).json({ mensagem: errorMessages.senhaUsuarioInvalida })

    if (usuarioSacar.saldo < valor)
        return res.status(400).json({ mensagem: errorMessages.saldoInsuficiente })

    usuarioSacar.saldo -= valor;
    bancodedados.saques.push(utils.criarExtratoDepositoSaque(numero_conta, valor))

    return res.status(204).json()
}

function transferir(req, res) {
    let { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    let contaOrigem = utils.encontrarUsuario(numero_conta_origem)
    let contaDestino = utils.encontrarUsuario(numero_conta_destino)

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha)
        return res.status(400).json({ mensagem: errorMessages.camposTransferirObrigatorios })

    if (!contaOrigem) return res.status(404).json({ mensagem: errorMessages.contaOrigemInexistente })

    if (!contaDestino) return res.status(404).json({ mensagem: errorMessages.contaDestinoInexistente })

    if (contaOrigem.usuario.senha !== senha)
        return res.status(403).json({ mensagem: errorMessages.senhaUsuarioInvalida })

    if (valor <= 0) return res.status(400).json({ mensagem: errorMessages.valorMinimo })

    if (contaOrigem.saldo < valor)
        return res.status(400).json({ mensagem: errorMessages.saldoInsuficiente })

    if (contaOrigem === contaDestino)
        return res.status(400).json({ mensagem: errorMessages.transferenciaPropriaConta })

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    bancodedados.transferencias.push(utils.criarExtratoTransferencia(numero_conta_origem, numero_conta_destino, valor))

    return res.status(204).json()
}

function saldo(req, res) {
    let { numero_conta, senha } = req.query
    let contaSaldo = utils.encontrarUsuario(numero_conta)

    if (!numero_conta || !senha)
        return res.status(400).json({ mensagem: errorMessages.camposSaldoExtratoObrigatorios })

    if (!contaSaldo) return res.status(404).json({ mensagem: errorMessages.contaNaoEncontrada })

    if (contaSaldo.usuario.senha !== senha)
        return res.status(403).json({ mensagem: errorMessages.senhaUsuarioInvalida })

    return res.status(200).json({ saldo: contaSaldo.saldo })
}

module.exports = { depositar, sacar, transferir, saldo }
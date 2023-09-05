let bancodedados = require("../bancodedados")
let utils = require("../helpers/utils")

function depositar(req, res) {
    let { numero_conta, valor } = req.body;
    let usuarioDeposito = utils.encontrarUsuario(numero_conta)

    if (!numero_conta || !valor)
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" })

    if (!usuarioDeposito)
        return res.status(404).json({ mensagem: "Conta bancária não encontrada" })

    if (valor <= 0)
        return res.status(400).json({ mensagem: "Valor de depósito muito baixo. Favor informar um valor maior." })

    usuarioDeposito.saldo += valor;
    bancodedados.depositos.push(utils.criarExtratoDepositoSaque(numero_conta, valor))

    return res.status(204).json()
}

function sacar(req, res) {
    let { numero_conta, valor, senha } = req.body;
    let usuarioSacar = utils.encontrarUsuario(numero_conta)

    if (!usuarioSacar)
        return res.status(404).json({ mensagem: "Conta bancária não encontrada" })

    if (!numero_conta || !valor || !senha)
        return res.status(400).json({ mensagem: "O número da conta, valor e senha são obrigatórios!" })

    if (usuarioSacar.usuario.senha !== senha)
        return res.status(400).json({ mensagem: "Senha inválida." })

    if (usuarioSacar.saldo < valor)
        return res.status(400).json({ mensagem: "Saldo insuficiente." })

    usuarioSacar.saldo -= valor;
    bancodedados.saques.push(utils.criarExtratoDepositoSaque(numero_conta, valor))

    return res.status(204).json()
}

function transferir(req, res) {
    let { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    let contaOrigem = utils.encontrarUsuario(numero_conta_origem)
    let contaDestino = utils.encontrarUsuario(numero_conta_destino)

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha)
        return res.status(400).json({ mensagem: "numero_conta_origem, numero_conta_destino, valor e senha são obrigatórios!" })

    if (!contaOrigem) return res.status(404).json({ mensagem: "Conta de origem não encontrada" })

    if (!contaDestino) return res.status(404).json({ mensagem: "Conta de destino não encontrada" })

    if (contaOrigem.usuario.senha !== senha)
        return res.status(400).json({ mensagem: "Senha inválida." })

    if (valor <= 0) return res.status(400).json({ mensagem: "Valor de depósito muito baixo. Favor informar um valor maior." })

    if (contaOrigem.saldo < valor)
        return res.status(400).json({ mensagem: "Saldo insuficiente." })

    if (contaOrigem === contaDestino)
        return res.status(400).json({ mensagem: "Não é possível transferir para a própria conta." })

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    bancodedados.transferencias.push(utils.criarExtratoTransferencia(numero_conta_origem, numero_conta_destino, valor))

    return res.status(204).json()
}

function saldo(req, res) {
    let { numero_conta, senha } = req.query
    let contaSaldo = utils.encontrarUsuario(numero_conta)

    if (!numero_conta || !senha)
        return res.status(400).json({ mensagem: "Senha e numero_conta são obrigatórios." })

    if (!contaSaldo) return res.status(404).json({ mensagem: "Conta bancária não encontrada" })

    if (contaSaldo.usuario.senha !== senha)
        return res.status(400).json({ mensagem: "Senha incorreta." })

    return res.status(200).json({ saldo: contaSaldo.saldo })
}

module.exports = { depositar, sacar, transferir, saldo }
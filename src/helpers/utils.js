let { format } = require("date-fns")
let bancodedados = require("../bancodedados")

function pegarDataAgora() {
    return format(new Date(), "yyyy-dd-MM HH:mm:ss")
}

function criarExtratoDepositoSaque(numero_conta, valor) {
    return {
        data: pegarDataAgora(),
        numero_conta,
        valor
    }
}

function criarExtratoTransferencia(numero_conta_origem, numero_conta_destino, valor) {
    return {
        data: pegarDataAgora(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
}

function encontrarUsuario(numeroConta) {
    let usuarioEncontrado = bancodedados.contas.find(element => element.numero === numeroConta);

    if (usuarioEncontrado)
        return usuarioEncontrado;
    else
        return false;
}

function EmailOuCpfRepetido(numeroConta, email, cpf) {
    if (!bancodedados.contas.find(element => element.numero === numeroConta))
        return bancodedados.contas.some(element => element.usuario.email === email || element.usuario.cpf === cpf)
    else
        return bancodedados.contas.some(element => element.usuario.email === email || element.usuario.cpf === cpf && element.numero !== numeroConta)
}

module.exports = { pegarDataAgora, criarExtratoDepositoSaque, criarExtratoTransferencia, encontrarUsuario, EmailOuCpfRepetido }
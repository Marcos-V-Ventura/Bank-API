let { Router } = require("express")
let router = Router()

let usuarios = require("./middleware/usuarios")
let { listarContas, criarContaBancaria, atualizarUsuario, excluirConta, extrato } = require("./controllers/contasController")
let { depositar, sacar, transferir, saldo } = require("./controllers/transacoesController")

router.get("/contas", listarContas)
router.get("/contas/saldo", saldo)
router.get("/contas/extrato", extrato)
router.post("/contas", usuarios.verificarBody, criarContaBancaria)
router.put("/contas/:numeroConta/usuario", usuarios.verificarBody, atualizarUsuario)
router.delete("/contas/:numeroConta", excluirConta)

router.post("/transacoes/depositar", depositar)
router.post("/transacoes/sacar", sacar)
router.post("/transacoes/transferir", transferir)

module.exports = router
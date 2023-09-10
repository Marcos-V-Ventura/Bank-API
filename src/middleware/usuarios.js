let errorMessages = require("../helpers/errorMessages")

function verificarBody(req, res, next) {
    let { nome, cpf, data_nascimento, telefone, senha, email } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha)
        return res.status(400).json({ mensagem: errorMessages.camposBodyObrigatorios })

    next();
}

module.exports = { verificarBody }
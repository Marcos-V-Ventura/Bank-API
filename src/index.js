let express = require("express")
let app = express();
let router = require("./rotas")

app.use(express.json())

app.use(router)

app.listen(3000)
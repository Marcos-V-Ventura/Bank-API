let express = require("express")
let router = require("./routes")
let app = express();

app.use(express.json())

app.use(router)

app.listen(3000)
let express = require("express")
let app = express();
let router = require("./routes")

app.use(express.json())

app.use(router)

app.listen(3000)
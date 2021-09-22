import express = require('express');
const app : express.Application = express();

const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json({limit: "50mb"}));

//rutas localhost:3000/api
app.use("/api", require("./routes/routes"));

app.listen(3000, function() {
    console.log("Interprete escuchando el puerto 3000!!");
})

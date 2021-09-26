import express = require('express');
const app : express.Application = express();

const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json({limit: "50mb"}));

//rutas localhost:3000/api
app.use("/api", require("./routes/routes"));

app.listen(3000, function() {
    console.log("Hola estoy en el http://localhost:3000/api \npuedes probarme utilizando postman u otra herramienta con: \nmetodo: POST \nruta: http://localhost:3000/api/ejecutar \nbody(json): { \"input\": \"Evaluar[((-(1+1+1+1+1-5-10)+(4*3-5^3))+8200*3/10)*3]; Evaluar[5+true]; Evaluar[1+'A']; Evaluar[0+\"hola\"]; Evaluar[true + false];  Evaluar[18-13];  Evaluar[8*9+7^5];\"}");
})

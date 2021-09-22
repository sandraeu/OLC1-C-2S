import express = require('express');


var gramatica = require('../../src/Analizador/gramatica').parser;

const router = express.Router();

router.get('/', function(req, res){
    res.send('HOLA DESDE EL SERVIDOR DEL INTERPRETE');
})

router.post('/evaluar', function(req, res) {
    try {
        const { input } = req.body;
        let arreglo = gramatica.parse(input);
        
        let respuesta = "";

        for(let evaluar of arreglo){
            console.log(`El valor de la expresion es : ${evaluar.expresion}`);
            respuesta += `El valor de la expresion es : ${evaluar.expresion} \n`;
        }
        res.status(200).json({resultado : respuesta});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado : "Se ha producido un error"});
    }
})

module.exports = router;
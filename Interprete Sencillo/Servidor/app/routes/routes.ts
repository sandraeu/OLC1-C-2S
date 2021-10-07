import express = require('express');
import Ast from '../../src/Interprete/Ast/Ast';
import Controlador from '../../src/Interprete/Controlador';
import TablaSimbolos from '../../src/Interprete/TablaSimbolos/TablaSimbolos';


var gramatica = require('../../src/Analizador/gramatica').parser;
var interprete = require('../../src/Analizador/interprete').parser;

const router = express.Router();

router.get('/', function(req, res){
    res.send('HOLA DESDE EL SERVIDOR DEL INTERPRETE');
})

router.post('/ejecutar', function(req, res) {
    try {
        const { input } = req.body;
        let ast : Ast = interprete.parse(input);
        
        let respuesta = "";

        let controlador = new Controlador();
        let ts_global = new TablaSimbolos(null);

        ast.ejecutar(controlador, ts_global);


       /* for(let evaluar of arreglo){
            let valor = evaluar.expresion.getValor(controlador,ts_global);

            if(valor != null){
                console.log(`El valor de la expresion es : ${valor}`);
                respuesta += `El valor de la expresion es : ${valor} \n`;
            }else{
                console.log(`El valor de la expresion es : ERROR`);
                respuesta += `El valor de la expresion es : ERROR \n`;
            }
            
        }*/
        res.status(200).json({consola : controlador.consola});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado : "Se ha producido un error"});
    }
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
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";

export default class WriteLine implements Instruccion{
    
    public expresion : Expresion;
    public linea : number;
    public columna : number;

    constructor(expresion : Expresion, linea : number, columna: number) {
        this.expresion =expresion;
        this.linea = linea;
        this.columna = columna;
    }
    
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let tipo_valor = this.expresion.getTipo(controlador, ts);
        

        if(tipo_valor == tipo.ENTERO || tipo_valor == tipo.DOBLE || tipo_valor == tipo.CARACTER || tipo_valor == tipo.CADENA || tipo_valor == tipo.BOOLEANO){
            let valor = this.expresion.getValor(controlador,ts);
            controlador.append(valor);
        }
    }
    
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}
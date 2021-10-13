import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export default class Ternario implements Expresion{

    public condicion : Expresion;
    public verdadero : Expresion;
    public falso : Expresion;
    public linea : number;
    public columna : number;

    constructor(condicion : Expresion, verdadero :Expresion, falso :Expresion, linea: number, columna: number) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        // condicion ? true : false;
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO){
            return valor_condicion ? this.verdadero.getTipo(controlador,ts) : this.falso.getTipo(controlador,ts);
        }else{
            return tipo.ERROR;
        }
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO){
            return valor_condicion ? this.verdadero.getValor(controlador,ts) : this.falso.getValor(controlador,ts);
        }else{
            //reportamos error semantico 
            return null;
        }
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}
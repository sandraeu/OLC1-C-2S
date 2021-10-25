import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Llamada from "./Llamada";

export default class StartWith implements Instruccion{

    public llamada : Llamada;
    public linea : number;
    public column : number;
    
    constructor(llamada: Llamada, linea :number, columna : number) {
        this.llamada = llamada;
        this.linea = linea;
        this.column = columna;
    }

    
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        this.llamada.ejecutar(controlador,ts);
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    } 

}
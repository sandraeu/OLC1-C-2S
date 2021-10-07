import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;

    constructor(lista_instruciones : Array<Instruccion>) {
        this.lista_instrucciones = lista_instruciones;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        // Vamos a recorrer las instrucciones que vengan desde la gramatica 
        // writeline(x);
        // int x = 9;
        //1 era pasada. ejecutar las declaraciones de variables
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Declaracion){
                instruccion.ejecutar(controlador,ts);
            }
        }

        //2da pada. ejecutamos todas las demas instrucciones
        for(let instruccion of this.lista_instrucciones){
            if(!(instruccion instanceof Declaracion)){
                instruccion.ejecutar(controlador,ts);
            }
        }
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}
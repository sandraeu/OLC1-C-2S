import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import Funcion from "../Instrucciones/Funcion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;

    constructor(lista_instruciones : Array<Instruccion>) {
        this.lista_instrucciones = lista_instruciones;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //1era pasada vamos a guardar las funciones y metodos del programa
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Funcion){
                let funcion = instruccion as Funcion;
                funcion.agregarFuncionTS(ts);
            }
        }
        // Vamos a recorrer las instrucciones que vengan desde la gramatica 
        // writeline(x);
        // int x = 9;
        //2 da pasada. ejecutar las declaraciones de variables
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Declaracion){
                instruccion.ejecutar(controlador,ts);
            }
        }

        //3ra pada. ejecutamos todas las demas instrucciones
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
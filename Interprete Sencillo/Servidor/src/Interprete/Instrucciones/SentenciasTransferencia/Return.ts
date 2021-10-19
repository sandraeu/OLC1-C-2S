import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";

export default class Retorno implements Instruccion{

    public valor_retorno : Expresion;

    constructor(valor_retorno : Expresion) {
        this.valor_retorno = valor_retorno;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
       //Verificamos que el valor no sea nulo 
        if(this.valor_retorno !=null){
            return this.valor_retorno.getValor(controlador, ts);
        }else{
            this; 
        }
       
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    } 

}
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import Break from "../SentenciasTransferencia/Break";

export default class Caso implements Instruccion{
    // case 1: 
        //print("es uno");
    // case 2: 
        //print("es uno");
        //break;

    public valor: Expresion;
    public instrucciones : Array<Instruccion>;

    constructor(valor: Expresion, instrucciones : Array<Instruccion>) {
        this.valor = valor;
        this.instrucciones = instrucciones;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);
        for(let inst of this.instrucciones){
            let res:any =  inst.ejecutar(controlador, ts_local);
            console.log(inst);
            if(res instanceof Break){ 
                return res;
            }
        }
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    } 
}
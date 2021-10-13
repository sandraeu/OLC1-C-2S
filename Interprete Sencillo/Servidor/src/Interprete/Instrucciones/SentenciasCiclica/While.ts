import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Break from "../SentenciasTransferencia/Break";

export default class While implements Instruccion{

    public condicion: Expresion;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;
    
   
    constructor(condicion : Expresion, lista_instrucciones: Array<Instruccion>, linea:number, columna:number) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let temp = controlador.sent_ciclica;
        controlador.sent_ciclica = true;

        if(this.condicion.getTipo(controlador,ts) == tipo.BOOLEANO){
            while(this.condicion.getValor(controlador,ts)){
                let ts_local = new TablaSimbolos(ts);
                for(let inst of this.lista_instrucciones){
                    let ret = inst.ejecutar(controlador,ts_local);
                    if(ret instanceof Break){
                        controlador.sent_ciclica = temp;
                        return ret;
                    }
                }
            }
        }else{
            //reportamos error semantico de que la condicion no es booleana\
            
        }


        controlador.sent_ciclica = temp;
        return null;
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}
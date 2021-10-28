import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Break from "../SentenciasTransferencia/Break";

export default class For implements Instruccion {

    public dec_asig: Instruccion;
    public condicion: Expresion;
    public actualizacion: Instruccion;
    public lista_instrucciones: Array<Instruccion>;
    public linea: number;
    public columna: number;

    constructor(dec_asig : Instruccion, condicion: Expresion, actualizacion: Instruccion, lista_instrucciones: Array<Instruccion>, linea : number, columna: number) {
        this.dec_asig = dec_asig;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;

    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);
        let temp = controlador.sent_ciclica;
        controlador.sent_ciclica = true;
        //console.log("estamos en el for")
        this.dec_asig.ejecutar(controlador,ts_local);

        //for(int i = 0; i < 10; i++){//int k; }
        if(this.condicion.getTipo(controlador,ts_local) == tipo.BOOLEANO){
            while(this.condicion.getValor(controlador,ts_local)){
               
                let ts_local2 = new TablaSimbolos(ts_local);
                for(let inst of this.lista_instrucciones){
                    let ret = inst.ejecutar(controlador,ts_local2);
                    if(ret instanceof Break){
                        controlador.sent_ciclica = temp;
                        return ret;
                    }
                }
                this.actualizacion.ejecutar(controlador,ts_local);
            }
        }else{
            //reportamos error semantico de que la condicion no es booleana\
            
        }


        controlador.sent_ciclica = temp;
        return null;

    }
    recorrer(): Nodo {
       let padre = new Nodo("SENT FOR", "");

       padre.AddHijo(new Nodo("for", ""));
       padre.AddHijo(new Nodo("(", ""));
       padre.AddHijo(this.dec_asig.recorrer());
       padre.AddHijo(this.condicion.recorrer());
       padre.AddHijo(this.actualizacion.recorrer());
       padre.AddHijo(new Nodo(")", ""));
       
       let hijo_instrucciones = new Nodo("Instrucciones","");
        for(let inst of this.lista_instrucciones){
            hijo_instrucciones.AddHijo(inst.recorrer());
        }

        padre.AddHijo(hijo_instrucciones);

       return padre;
    }
}
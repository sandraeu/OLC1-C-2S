import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import Break from "../SentenciasTransferencia/Break";
import Caso from "./Caso";

export default class Switch implements Instruccion{

    public condicion : Expresion;
    public lista_casos : Array<Caso>;
    public ist_default : Instruccion;
    public linea : number;
    public column : number;

    constructor(condicion : Expresion, lista_casos : Array<Caso> , ist_default : Instruccion, linea : number, column: number) {
        this.condicion = condicion;
        this.lista_casos = lista_casos;
        this.ist_default = ist_default;
        this.linea = linea;
        this.column = column;
    }



    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //switch (1){ 
        // case 1: 
            //print("es uno");
            //break;
        // case 2: 
            //print("es dos"); 
           //default: 
             //print("default");
        //}
        let ts_local = new TablaSimbolos(ts);

        // Manejamos 2 banderas 
        let bandera_break=false; // nos indica cuando dentro de un caso vino la sentencia break
        let bandera_entro_caso = false; // nos indica cuando paso las validaciones y entro a ejecutar las instrucciones de un caso
        //la bandera si entro al caso es necesaria ya que si entramos a ejecutar un caso y no tiene un break continua ejecutando los siguientes casos hasta encontrar un break
        for(let caso of this.lista_casos){
            
            if(this.condicion.getTipo(controlador, ts) == caso.valor.getTipo(controlador,ts)){
                //Validamos si la condicion tiene el mismo valor del caso y si no es el mismo valor validamos si ya entro a ejecutar un caso
                if(this.condicion.getValor(controlador,ts) == caso.valor.getValor(controlador,ts) || bandera_entro_caso){
                    bandera_entro_caso = true; //indicamos que entro a ejecutar un caso
                    let res:any = caso.ejecutar(controlador, ts_local);
                    if(res instanceof Break){
                        bandera_break = true;
                        return res;
                    }

                }
            }else {
                //error
            }
        }

        if(!bandera_break && this.ist_default != null){
            let res:any =  this.ist_default.ejecutar(controlador, ts_local);
            if(res instanceof Break){
                bandera_break = true;
                return res;
            }
        }

    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    } 

}
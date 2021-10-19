import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolo";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";

export default class Funcion extends Simbolo implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    
    constructor(simbolo: number, tipo: Tipo, identificador: string, lista_params:Array<Simbolo>, metodo:boolean, lista_instrucciones : Array<Instruccion>, linea: number, columna: number ) {
        super(simbolo, tipo, identificador, null, lista_params, metodo);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    //-- agregamos un metodo para agregar el simbolo de la funcion a la tabla de simbolos
    agregarFuncionTS(ts: TablaSimbolos){
         if(!(ts.existe(this.identificador))){
             ts.agregar(this.identificador, this);
         }else{
             // error semantico.
         }
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
       // Aqui solo necesitamos mandar a ejecutar las instrucciones ya que las validaciones para llegar hasta aca se hacen en la clase llamada
       let ts_local = new TablaSimbolos(ts);

       for(let inst of this.lista_instrucciones){
            let retorno = inst.ejecutar(controlador,ts_local);

            if(retorno != null){
                return retorno;
            }
       }

       return null;
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}
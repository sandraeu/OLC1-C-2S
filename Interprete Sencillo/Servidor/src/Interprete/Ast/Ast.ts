import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import Funcion from "../Instrucciones/Funcion";
import StartWith from "../Instrucciones/StartWith";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;

    constructor(lista_instruciones : Array<Instruccion>) {
        this.lista_instrucciones = lista_instruciones;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let bandera_startwith = false;
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
            if(instruccion instanceof StartWith && !bandera_startwith){
                instruccion.ejecutar(controlador,ts);
                bandera_startwith = true;
            }else if(bandera_startwith){
                //error solo se puede tener un start with  

                //start with suma(2,3);
                //start with resta(8,5);
            }
            
            if(!(instruccion instanceof Declaracion) && !(instruccion instanceof Funcion)){
                instruccion.ejecutar(controlador,ts);
            }
        }
    }

    recorrer(): Nodo {
        let raiz = new Nodo("INICIO","");

        for(let inst of this.lista_instrucciones){
            raiz.AddHijo(inst.recorrer());
        }
        return raiz;
    }
}
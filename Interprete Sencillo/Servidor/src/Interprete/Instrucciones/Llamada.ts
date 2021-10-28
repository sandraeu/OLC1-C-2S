import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolo";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Funcion from "./Funcion";

export default class Llamada implements Instruccion, Expresion{

    public identificador : string;
    public parametros : Array<Expresion>;
    public linea : number;
    public columna : number;

    constructor(identificador : string,  parametros : Array<Expresion>, linea :number, columna:number) {
        this.identificador = identificador;
        this.parametros = parametros;
        this.columna = columna;
        this.linea = linea;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let simbolo_funcion = ts.getSimbolo(this.identificador) as Funcion ;

        return simbolo_funcion.tipo.enum_tipo; 
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        //1. Verificar si el método existe en la tabla de símbolos.
        if(ts.existe(this.identificador)){
            //2. Crear una nueva tabla de símbolos la cual será local.
            let ts_local = new TablaSimbolos(ts);
            //3. obtener el simbolo del metodo 
            let simbolo_funcion = ts.getSimbolo(this.identificador)  as Funcion;


            //4. verificar si los parametros estan correctos
            if(this.validar_parametros(this.parametros, simbolo_funcion.lista_params!, controlador, ts, ts_local)){
                let retorno = simbolo_funcion.ejecutar(controlador, ts_local);

                if(retorno != null){
                    return retorno; 
                }
            }
        }else{
            // error semantico no existe el metodo a llamar
        }
    }

    // string s = holamundo();
    // string holamundo(){  writeline("hola mundo"); return "holamundo "; }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        
        //1. Verificar si el método existe en la tabla de símbolos.
        if(ts.existe(this.identificador)){
            //2. Crear una nueva tabla de símbolos la cual será local.
            let ts_local = new TablaSimbolos(ts);
            //3. obtener el simbolo del metodo 
            let simbolo_funcion = ts.getSimbolo(this.identificador)  as Funcion;

            console.log("llamada");
            //4. verificar si los parametros estan correctos
            if(this.validar_parametros(this.parametros, simbolo_funcion.lista_params!, controlador, ts, ts_local)){
                let retorno = simbolo_funcion.ejecutar(controlador, ts_local);

                if(retorno != null){
                    return retorno; 
                }
            }
        }else{
            // error semantico no existe el metodo a llamar
        }
        
    }

    validar_parametros(parametros_llamada : Array<Expresion>, parametros_funcion: Array<Simbolo>, controlador : Controlador, ts: TablaSimbolos, ts_local: TablaSimbolos){
        /* 4. Verificar si la cantidad de parámetros en la llamada 
            es igual a la cantidad de parámetros que posee el método. */
            console.log("validar params");
        if(parametros_llamada.length == parametros_funcion.length){
            //--> parametros desde funcion/metodo
            let aux : Simbolo; // -> parametro
            let aux_id : string; // -> id parametro 
            let aux_tipo; //-> tipo parametro 

            //--> valores de la llamada
            let aux_exp : Expresion; //-> expresion que se le va a asignar al parametro 
            let aux_exp_tipo; //-> tipo de la expresio 
            let aux_exp_valor;  //-> valor de la expresion 

            // 5. Verificar que cada valor a asignar sea del mismo tipo de los parametros del metodo.
            for(let i = 0; i < parametros_llamada.length ; i++){
                // void suma( int n1 , int n2){... }
                // suma(3,4); 
                // int n1 = 3; int n2 = 4; 
                //--> vamos a guardar la informacion del parametro de la funcion
                aux = parametros_funcion[i] as Simbolo;
                aux_id = aux.identificador;
                aux_tipo = aux.tipo.enum_tipo; // ENTERO, DOBLE 

                //--> Vamos a guardar la informacion del parametro de la llamada
                aux_exp = parametros_llamada[i] as Expresion;
                aux_exp_tipo = aux_exp.getTipo(controlador, ts);
                aux_exp_valor = aux_exp.getValor(controlador,ts);

                // validar si el valor del parametro de llamada es igual al valor del parametro de la funcion
                if(aux_tipo == aux_exp_tipo){
                      // 5. a) Si son del mismo tipo se debe de guardar cada parámetro con su valor en la tabla de símbolos local. 
                      
                      let simbolo = new Simbolo(aux.simbolo, aux.tipo, aux_id, aux_exp_valor);
                      ts_local.agregar(aux_id, simbolo);
                }
            }
            return true;
        }else {
            //reportamos error semantico
            return false;
        }
        return true;
         
    }


    recorrer(): Nodo {
        let padre = new Nodo("Llamada",""); 
        padre.AddHijo(new Nodo(this.identificador,""));
        padre.AddHijo(new Nodo("(",""));

        //TODO: AGREGAR NODOS HIJOS DE PARAMETROS
        
        padre.AddHijo(new Nodo(")",""));
        
       return padre;
    } 

}
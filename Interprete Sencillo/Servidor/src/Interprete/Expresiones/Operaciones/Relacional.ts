import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operacion";

export default class Relacional extends Operacion implements Expresion{

    /**
     * @constructor este constructor utiliza el mismo de la clase Operacion
     */
    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, columna : number, expU: boolean) {
        super(exp1, signo_operador, exp2, linea, columna, expU);
        
    }


    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let tipo_exp1 : tipo;
        let tipo_exp2 : tipo; 

            /** Ejemplo 1
             *  5.5 < 5 -> exp1 < exp2 -> exp1 = 5.5, exp2 = 5
             *  exp1.getTipo = DOBLE 
             *  exp2.getTipo = ENTERO
             * 
             */
            tipo_exp1 = this.exp1.getTipo(controlador, ts);
            tipo_exp2 = this.exp2.getTipo(controlador,ts);

            if(tipo_exp1 == tipo.ERROR || tipo_exp2 == tipo.ERROR){
                return tipo.ERROR;
            }
        
        
            /** segun el enununciado 
             * Se pueden realizar operaciones relacionales entre: entero-entero, entero-doble,
               entero-caracter, doble-entero, doble-caracter, caracter-entero, caracterdoble, 
               caracter-carácter y cualquier otra operación relacional entre entero, doble
               y carácter 
             */
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                        return tipo.BOOLEANO;
                    }else{
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                        return tipo.BOOLEANO;
                    }else{
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                        return tipo.BOOLEANO;
                    }else{
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        return tipo.BOOLEANO;
                    }else{
                        return tipo.ERROR; 
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){
                        return tipo.BOOLEANO;
                    }else{
                        return tipo.ERROR;
                    }
                } 
        return tipo.ERROR;

    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;

        let tipo_exp1 :tipo;
        let tipo_exp2 : tipo;

       
        //Ejemplo si fuera  8 >= 8.5 -> exp1 = 8, exp2 = 8.5
            tipo_exp1 = this.exp1.getTipo(controlador,ts); // ENTERO
            tipo_exp2 = this.exp2.getTipo(controlador,ts); // DOBLE 
            
            valor_exp1 = this.exp1.getValor(controlador,ts); // 8
            valor_exp2 = this.exp2.getValor(controlador,ts); // 8.5

        switch (this.operador) {
            case Operador.MENORQUE:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 < valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){ // 5 < 'a' 
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }else{
                        //reportar error semanticoS
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 < valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }else{
                        //reportar error semantico
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci < valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                        let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                        return num_ascci_exp1 < num_ascci_exp2;
                    }else{
                        //reportar error semantico
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        let num_bool_exp1 = 1;
                        if(valor_exp1 == false){
                            num_bool_exp1= 0;
                        }
                        let num_bool_exp2 = 1;
                        if(valor_exp2 == false){
                            num_bool_exp2= 0;
                        }
                        
                        return num_bool_exp1 < num_bool_exp2;
                    }else{
                        //reportar error semantico
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){ 
                        return valor_exp1 < valor_exp2; //"hola" < "hola"
                    }else{
                        //reportar error semantico
                    }
                } 
                
                break;
        case Operador.IGUALIGUAL:
            if(tipo_exp1 == tipo.ENTERO){
                if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                    return valor_exp1 == valor_exp2;
                }else if(tipo_exp2 == tipo.CARACTER){ // 5 < 'a' 
                    let num_ascci = valor_exp2.charCodeAt(0);
                    return valor_exp1 == num_ascci;
                }else{
                    //reportar error semanticoS
                    return null;
                }
            }else if(tipo_exp1 == tipo.DOBLE){
                if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                    return valor_exp1 == valor_exp2;
                }else if(tipo_exp2 == tipo.CARACTER){
                    let num_ascci = valor_exp2.charCodeAt(0);
                    return valor_exp1 == num_ascci;
                }else{
                    //reportar error semantico
                }
            }else if(tipo_exp1 == tipo.CARACTER){
                if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                    let num_ascci = valor_exp1.charCodeAt(0);
                    return num_ascci == valor_exp2;
                }else if(tipo_exp2 == tipo.CARACTER){
                    let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                    let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                    return num_ascci_exp1 == num_ascci_exp2;
                }else{
                    //reportar error semantico
                }
            }else if(tipo_exp1 == tipo.BOOLEANO){
                if(tipo_exp2 == tipo.BOOLEANO){
                    let num_bool_exp1 = 1;
                    if(valor_exp1 == false){
                        num_bool_exp1= 0;
                    }
                    let num_bool_exp2 = 1;
                    if(valor_exp2 == false){
                        num_bool_exp2= 0;
                    }
                    
                    return num_bool_exp1 == num_bool_exp2;
                }else{
                    //reportar error semantico
                }
            }else if(tipo_exp1 == tipo.CADENA){
                if(tipo_exp2 == tipo.CADENA){ 
                    return valor_exp1 == valor_exp2; //"hola" == "hola"
                }else{
                    //reportar error semantico
                }
            } 
            
            break;
            case Operador.MAYORQUE:
            if(tipo_exp1 == tipo.ENTERO){
                if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                    return valor_exp1 > valor_exp2;
                }
            }
            default:
                break;
        }
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}
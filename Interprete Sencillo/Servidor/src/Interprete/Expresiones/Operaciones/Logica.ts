import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operacion";

export default class Logica extends Operacion implements Expresion{

    /**
     * @constructor este constructor utiliza el mismo de la clase Operacion
     */
    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, columna : number, expU: boolean) {
        super(exp1, signo_operador, exp2, linea, columna, expU);
        
    }


    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let tipo_exp1 : tipo;
        let tipo_exp2 : tipo; 
        let tipo_expU : tipo;

           
        if(this.expU == false){
             /** Ejemplo 1
             *  true || flase -> exp1 or exp2 -> exp1 = true, exp2 = false
             *  exp1.getTipo = BOOLEANO 
             *  exp2.getTipo = BOOLEANO
             * 
             *  Ejemplo 2
             *  false || 5 > 4.9 -> exp1 or exp2 -> exp1 = false, exp2 = 5 > 4.9 -> 
             *  exp1.getTipo = BOOLEANO 
             *  exp2.getTipo = BOOLEANO
             */
            tipo_exp1 = this.exp1.getTipo(controlador,ts); // BOOLEANO
            tipo_exp2 = this.exp2.getTipo(controlador,ts); // BOOLEANO 
                
            tipo_expU = tipo.ERROR;
     
    
        }else{ 
            tipo_expU = this.exp1.getTipo(controlador,ts);
            tipo_exp1 = tipo.ERROR;
            tipo_exp2 = tipo.ERROR;
    
        }
        
            /** segun el enununciado 
             * Se comparan simbolos a nivel logico -> verdadero o falso 
             */
        if(this.expU == false){ 
            if(tipo_exp1 == tipo.BOOLEANO){
                if(tipo_exp2 == tipo.BOOLEANO){
                    return tipo.BOOLEANO;
                }else{
                    return tipo.ERROR;
                }
            }else{
               return tipo.ERROR;
            }
        }else{// !true
            //sera unario cuando el operador sea NOT
            if(tipo_expU == tipo.BOOLEANO){
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
        let valor_expU;

        let tipo_exp1 :tipo;
        let tipo_exp2 : tipo;
        let tipo_expU : tipo;

       
        if(this.expU == false){
             /** 
             *  Ejemplo 
             *  false || 5 > 4.9 -> exp1 or exp2 -> exp1 = false, exp2 = 5 > 4.9 = true 
             *  exp1.getTipo = BOOLEANO 
             *  exp2.getTipo = BOOLEANO
             */
            tipo_exp1 = this.exp1.getTipo(controlador,ts); // BOOLEANO
            tipo_exp2 = this.exp2.getTipo(controlador,ts); // BOOLEANO 
            
            tipo_expU = tipo.ERROR;

            valor_exp1 = this.exp1.getValor(controlador,ts); // false 
            valor_exp2 = this.exp2.getValor(controlador,ts); // true

        }else{
            /**
             * Ejemplo
             * !(9 > 10) -> !exp1 = exp1 = (9>10) = false 
             */
            tipo_expU = this.exp1.getTipo(controlador,ts); // BOOLEANO
            tipo_exp1 = tipo.ERROR;
            tipo_exp2 = tipo.ERROR;

            valor_expU = this.exp1.getValor(controlador,ts); // false

        }

        switch (this.operador) {
            case Operador.AND:
                if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO ){
                        return valor_exp1 && valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica AND.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica AND. En la linea ${this.linea} y columna ${this.columna}`)
                        return null;
                    }
                }else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica AND ya que solo se permiten valores booleanos.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica AND ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                } 
                break;
            case Operador.OR:
                if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO ){
                       return valor_exp1 || valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica OR.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica OR. En la linea ${this.linea} y columna ${this.columna}`)
                        return null;
                    }
                }else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica OR ya que solo se permiten valores booleanos.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica OR ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                } 
                break;
            case Operador.NOT:
                if(tipo_expU == tipo.BOOLEANO){
                    return !valor_expU; 
                }else{
                    let error = new Errores("Semantico", `No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;
        }
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";

/**
 * @enum Este sirve para enumerar la lista de operadores que maneja nuestro lenguaje 
 */
export enum Operador{
    SUMA,
    RESTA, 
    MULTIPLICACION,
    DIVISION, 
    POT,
    MOD,
    UNARIO,
    IGUALIGUAL,
    DIFERENCIA,
    MENORQUE,
    MAYORQUE,
    MENORIGUAL,
    MAYORIGUAL,
    OR,
    AND,
    NOT, 
    X

}

/**
 * @class Clase para el manejo de operaciones del programa
 */

export default class Operacion implements Expresion{

    public exp1: Expresion;
    public exp2: Expresion;
    public expU: boolean;
    public linea: number;
    public columna : number;
    public signo_operador : string;
    public operador : Operador;

   /**
     * @constructor Creamos una nueva operacion
     * @param exp1 expresion izquierda de la operacion
     * @param signo_operador operador de la operacion
     * @param exp2 expresion derecha de la operacion
     * @param linea linea donde se ubica la operacion
     * @param columna columna donde se ubica la operacion
     * @param expU boolean que indica si la operacion es una expresion unaria
     */
    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, columna : number, expU: boolean) {
        this.exp1= exp1;
        this.exp2 = exp2;
        this.columna = columna;
        this.linea = linea;
        this.signo_operador = signo_operador;
        this.expU = expU; 
        this.operador = this.getOperador(signo_operador);
    
    }
    
    /**
     * @function getOperador obtiene el tipo de operador que se maneja
     * @param op operador en string 
     * @returns retorna un tipo de operador 
     */
    getOperador(signo_operador: string):Operador {
        if(signo_operador == '+'){
            return Operador.SUMA;
        }else if(signo_operador == '-'){
            return Operador.RESTA;
        }else if(signo_operador == '*'){
            return Operador.MULTIPLICACION;
        }else if(signo_operador == '/'){
            return Operador.DIVISION;
        }else if(signo_operador == 'UNARIO'){
            return Operador.UNARIO;
        }else if(signo_operador == '^'){
            return Operador.POT;
        }else if(signo_operador == '%'){
            return Operador.MOD;
        }else if(signo_operador == '<'){
            return Operador.MENORQUE;
        }else if(signo_operador == '>'){
            return Operador.MAYORQUE;
        }else if(signo_operador == '<='){
            return Operador.MENORIGUAL;
        }else if(signo_operador == '>='){
            return Operador.MAYORIGUAL;
        }else if(signo_operador == '||'){
            return Operador.OR;
        }else if(signo_operador == '&&'){
            return Operador.AND;
        }else if(signo_operador == '!'){
            return Operador.NOT;
        }else if(signo_operador == '=='){
            return Operador.IGUALIGUAL;
        }else if(signo_operador == '!='){
            return Operador.DIFERENCIA;
        }else{
            return Operador.X;
        }
    }

    /**
     * En esta clase no agregaremos codigo en los metodos de abajo.
     * Ya que esta es la clase padre le heredamos el contructor a las clases que extienden de el 
     */
    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}
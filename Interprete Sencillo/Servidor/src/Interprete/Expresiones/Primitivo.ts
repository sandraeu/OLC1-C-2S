import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";

/**
 * @class Primitivo esta clase guarda los valores primitivos que son los enteros, dobles, cadenas, booleanos, caracteres
 * ejemplo
 * 1 -> primitivo -> tipo = ENTERO -> valor = 1
 * 1.5 -> primitivo -> tipo = DOBLE -> valor = 1.5
 * true -> primitivo -> tipo = BOOLEANO -> valor = true
 * 'A' -> primitivo -> tipo = CARACTER -> valor = A
 * "hola mundo" -> primitivo -> tipo = CADENA ->  valor = hola mundo
 */
export default class Primitivo implements Expresion{
    
    public valor_primitivo : any;
    public linea : number;
    public columna : number;
    public tipo : Tipo;

    /**
     * @constructor creamos un nuevo primitivo
     * @param valor_primitivo hace referencia a los VALORES enteros, dobles, cadenas, caracteres, booleanos
     * @param tipo hace referencia al tipo del valor primitivo ENTERO, DOBLE, CADENA, CARACTER, BOOLEANO
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    constructor(valor_primitivo : any, tipo : string , linea : number, columna: number) {
        this.valor_primitivo = valor_primitivo;
        this.linea = linea;
        this.columna = columna;
        this.tipo = new Tipo(tipo);
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        return this.tipo.enum_tipo;
    }
    
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        return this.valor_primitivo;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Primitivo",""); //Primitivo -> "hola mundo"
        padre.AddHijo(new Nodo(this.valor_primitivo.toString(),""));

       return padre;
    }

}
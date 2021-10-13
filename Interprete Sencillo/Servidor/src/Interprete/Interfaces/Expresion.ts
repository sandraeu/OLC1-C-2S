import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

/**
 * @interface Expresion
 * Las funciones dentro de esta clase solo estan declarados indicando su tipo, nombre y parametros
 * Las clases que implementen esta interfaz le estaremos indicando al programa que seran Expresiones 
 * y deberan de implementar las mismas funciones declaradas aca 
 */
export interface Expresion{


    /**
     * @function getTipo retorna el tipo del valor de la expresion 
     * @param controlador llevamos el control de todo el programa
     * @param ts accede a la tabla de simbolos
     */
    getTipo(controlador : Controlador, ts : TablaSimbolos) : tipo ;


    /**
     * @function getValor retorna el valor de la expresion 
     * @param controlador llevamos el control de todo el programa
     * @param ts accede a la tabla de simbolos 
     */
    getValor(controlador : Controlador, ts: TablaSimbolos):any;

    /**
     * @function recorrer crea y recorre el subarbol de la expresion
     */
    recorrer(): Nodo;

}
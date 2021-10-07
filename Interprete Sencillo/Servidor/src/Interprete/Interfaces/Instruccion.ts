import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";

export interface Instruccion {

    /**
     * @function ejecutar ejecuta las instrucciones 
     * @param controlador llevamos el control de todo el programa
     * @param ts accede a la tabla de simbolos
     */
    ejecutar(controlador : Controlador, ts : TablaSimbolos) :any ;

    /**
     * @function recorrer crea y retorna el subarbol de la instruccion
     */
    recorrer(): Nodo;
}
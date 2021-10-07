
/**
 * @class Clase que nos permitira llevar el control de errores y la consola de todo el programa. 
 */

import Errores from "./Ast/Errores";


export default class Controlador{

    public errores : Array<Errores>;
    public consola : string;

    constructor() {
        this.errores = new Array<Errores>();
        this.consola = "";
    }

    append(cadena : string){
        this.consola = this.consola + cadena + "\n";
    }
}
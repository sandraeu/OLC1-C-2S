/**
 * @enum de Tipo nos permite enumerar los tipos del lenguaje
 */

export enum tipo{
    ENTERO,
    DOBLE,
    BOOLEANO,
    CARACTER, 
    CADENA, 
    ERROR,
    VOID
}

/** 
 * @class me permite llevar el control de los tipos del programa ENTERO, DOBLE, CADENA ...
 */
export default class Tipo{
    public nombre_tipo : string;
    public enum_tipo : tipo;

    /**
     * @constructor Guarda el string con el nombre del tipo y el enum que identifica al tipo
     */
    constructor(nombre_tipo : string) {
        this.nombre_tipo = nombre_tipo;
        this.enum_tipo = this.gettipo();
    }
    
    gettipo(): tipo{
        if(this.nombre_tipo == 'ENTERO'){
            return tipo.ENTERO;
        }else if(this.nombre_tipo == 'DOBLE'){
            return tipo.DOBLE;
        }else if(this.nombre_tipo == 'CADENA'){
            return tipo.CADENA;
        }else if(this.nombre_tipo == 'CARACTER'){
            return tipo.CARACTER;
        }else if(this.nombre_tipo == 'BOOLEANO'){
            return tipo.BOOLEANO;
        }else if(this.nombre_tipo == 'VOID'){
            return tipo.VOID;
        }else{
            return tipo.ERROR;
        }
    }

}
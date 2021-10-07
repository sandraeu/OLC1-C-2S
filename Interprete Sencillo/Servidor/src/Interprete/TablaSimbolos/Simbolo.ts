
/**
 * @class Simbolo esta clase define los simbolos del lenguaje que seran variables o funciones/metodos
 * los metodos para esta clase seran explicados proximamente
 */

import Tipo from "./Tipo";

export default class Simbolo{
    
    public simbolo : number; 
    //--> Simbolo variable
    public tipo : Tipo;                 
    public identificador : string;
    public valor : any;
    
    //--> Simbolo funcion/metodo
    public lista_params : Array<Simbolo> | undefined;
    public metodo : boolean | undefined;

    /**
     * @constructor 
     * @param simbolo indica el tipo de simbolo que es: 1- variable  2- funcion  3- metodo  4- vector  5- lista  6- param
     * @param tipo indica el tipo de la variable 
     * @param identificador nombre identificador de la variable
     * @param valor valor de la variable
     * @param lista_params lista de simbolos de tipo parametro (para funciones o metodos)
     * @param metodo booleano que indica si es metodo (true) o funcion (false) 
     */
    constructor(simbolo: number, tipo: Tipo, identificador: string, valor: any, lista_params?:Array<Simbolo>, metodo?:boolean) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.lista_params = lista_params;
        this.metodo = metodo;
       
    }

    setValor(valor:any): void{
        this.valor = valor;
    }
    
}
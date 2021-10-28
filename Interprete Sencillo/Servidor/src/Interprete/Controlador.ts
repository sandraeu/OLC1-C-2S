
/**
 * @class Clase que nos permitira llevar el control de errores y la consola de todo el programa. 
 */

import Errores from "./Ast/Errores";
import Simbolo from "./TablaSimbolos/Simbolo";
import TablaSimbolos from "./TablaSimbolos/TablaSimbolos";


export default class Controlador{

    public errores : Array<Errores>;
    public consola : string;
    public sent_ciclica : boolean;
    constructor() {
        this.errores = new Array<Errores>();
        this.consola = "";
        this.sent_ciclica = false;
    }

    append(cadena : string){
        this.consola = this.consola + cadena + " \r\n ";
    }

     
    /**
     * @function graficar_ts funcion para graficar la tabla de simbolos
     * @param controlador lleva el control del programa
     * @param ts accede a la tabla de simbolos
     * @returns retorna el cuerpo de la tabla de simbolos de html
     */
     graficar_ts(controlador:Controlador, ts:TablaSimbolos):string{
        var cuerpohtml = "<thead  class=\"thead-dark\"><tr><td colspan=\"6\">Tabla de Simbolos </td></tr><tr><th>Rol</th><th>Nombre</th><th>Tipo</th><th>Ambito</th><th>Valor</th><th>Parametros</th></tr></thead>";

        while(ts != null){

           /* for(let sim of ts.tabla.values()){
                console.log(`simbolo`);
                
                cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" +  this.getRol(sim) + "</th><td>" + sim.identificador + 
                "</td><td>" + this.getTipo(sim) +"</td>"  + 
                "</td><td>" + this.getAmbito() + 
                "</td><td>" + this.getValor(sim) + 
                "</td><td>" + this.parametros(sim) +"</td>" +  "</tr>";
            }*/

            ts.tabla.forEach((sim: Simbolo, key : string) =>{
                cuerpohtml += "<tr ><th scope=\"row\">" +  this.getRol(sim) + "</th><td>" + sim.identificador + 
                "</td><td>" + this.getTipo(sim) +"</td>"  + 
                "</td><td>" + this.getAmbito() + 
                "</td><td>" + this.getValor(sim) + 
                "</td><td>" + this.parametros(sim) +"</td>" +  "</tr>";
            })
            
            
            ts = ts.ant;
        }
        
        
        return cuerpohtml;
    }

    /**
     * @function getValor obtiene el valor del simbolo de la tabla
     * @param sim simbolo de la tabla
     * @returns retorna el valor del simbolo
     */
    getValor(sim:Simbolo):string{
        if(sim.valor != null){
            return sim.valor.toString(); 
        }else{
            return '...';
        }
    }

    /**
     * @function getTipo obtiene el tipo del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el tipo del simbolo
     */
    getTipo(sim : Simbolo):string{

        return sim.tipo.nombre_tipo.toLowerCase();
    }

    /**
     * @function getTipo obtiene el rol del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el rol del simbolo
     */
    getRol(sim:Simbolo):string{
        let rol : string = '';
        switch(sim.simbolo){
            case 1:
                rol = "variable"
                break
            case 2:
                rol = "funcion";
                break;
            case 3:
                rol = "metodo";
                break;
             case 4:
                rol = "vector";
                break
             case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro"
                break;
            
        }
        return rol;
    }

     /**
     * @function getTipo Le indicamos el ambito del simbolo 
     * @returns retorna el ambito del simbolo
     */
    getAmbito():string{
        return 'global'
    }

     /**
     * @function getTipo obtiene la cantidad de parametros del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna la cantidad de parametros del simbolo si es que tiene
     */
    parametros(sim : Simbolo){
        if(sim.lista_params != undefined){
            return sim.lista_params.length
        }else{
            return "...";
        }
    }
}
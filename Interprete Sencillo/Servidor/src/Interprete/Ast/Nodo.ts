/**
 * @class Clase para el manejo de nodos de la grafica del ast
 * Los metodos los implementaremos mas adelante
 */

 export default class Nodo{
    public token : string;
    public lexema : string;
    public hijos : Array<Nodo>;

    /**
     * @constructor Crea un nuevo nodo a graficar del ast
     * @param token guarda el token del nodo
     * @param lexema guarda el lexema del nodo
     */
    constructor(token : string, lexema : string) {
        this.token = token;
        this.lexema = lexema;
        this.hijos = new Array<Nodo>();
    }

    /**
     * @method AddHijo agrega un nuevo hijo a la lista
     * @param nuevo hace referencia al nuevo nodo
     */
    public AddHijo(nuevo :Nodo):void{
        this.hijos.push(nuevo);
    }

    /**
     * @function getToken retorna el nombre del token 
     * @returns retorna el token
     */
    public getToken():string{
        return this.token;
    }

    /**
     * @function GraficarSintactico Hace la estructura de la grafica 
     * @returns retorna la cadena total de la grafica 
     */
    public GraficarSintactico():string{
        let grafica: string = `digraph {\n\n${this.GraficarNodos(this, "0")} \n\n}`
        return grafica;
    }

    /**
     * @function GraficarNodos
     * @param nodo indica el nodo donde nos posicionamos
     * @param i hara referencia al numero o identificador del nodo a graficar
     * @returns retorna la cadena de los nodos 
     */
    public GraficarNodos(nodo: Nodo, i: string):string{
        let k = 0;
        let r = "";
        let nodoTerm : string = nodo.token;
        nodoTerm = nodoTerm.replace("\"","");
        r = `node${i}[label = \"${nodoTerm}\"];\n`;

        for(let j = 0; j<= nodo.hijos.length - 1; j++){
            r = `${r}node${i} -> node${i}${k}\n`;
            r = r + this.GraficarNodos(nodo.hijos[j], ""+i+k);
            k = k + 1;
        }

        if(!(nodo.lexema.match(''))||!(nodo.lexema.match(""))){
            let nodoToken = nodo.lexema;
            nodoToken = nodoToken.replace("\"","");
            r = r + `node${i}c[label = \"${nodoToken}\"];\n`;
            r = r + `node${i} -> node${i}c\n`;
        }
        return r;
    }
}
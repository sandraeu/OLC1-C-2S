import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolo";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";

export default class Declaracion implements Instruccion{
    
    public type : Tipo; 
    public lista_ids : Array<string>;
    public expresion : Expresion;

    public linea : number;
    public columna: number;

    constructor(type : Tipo, lista_ids : Array<string>, expresion: any, linea : number, columna: number) {
        this.type = type;
        this.lista_ids = lista_ids;
        this.expresion = expresion;
        this.linea = linea; 
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        // int x, y, z = 0;
        // int a = 9;
        // boolean verdadero;
        for(let id of this.lista_ids){

            //1er paso. verificar si existe en la tabla de simbolos actual
            if(ts.existeEnActual(id)){
                let error = new Errores("Semantico", `La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(` *** ERROR: Semantico, La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar. En la linea ${this.linea} y columna ${this.columna}`)
                continue;
            }

            if(this.expresion != null){
                let tipo_valor = this.expresion.getTipo(controlador, ts); //ENTERO
                let valor = this.expresion.getValor(controlador,ts); //0

                if(tipo_valor == this.type.enum_tipo) {
                    let nuevo_simbolo = new Simbolo(1, this.type, id, valor);
                    ts.agregar(id, nuevo_simbolo);
                }else{
                    //Tomar en cuenta casteos implicitos
                    if(this.type.enum_tipo == tipo.DOBLE && tipo_valor == tipo.ENTERO){
                        let nuevo_simbolo = new Simbolo(1, this.type, id, valor);
                        ts.agregar(id, nuevo_simbolo); 
                    }else if(this.type.enum_tipo == tipo.ENTERO && tipo_valor == tipo.DOBLE){
                        let nuevo_simbolo = new Simbolo(1, this.type, id, Math.trunc(valor));
                        ts.agregar(id, nuevo_simbolo); // int x = 9.7; -> x = 9
                    }else{
                         //reportar error semantico 
                    }

                   
                }
            }else{
                let nuevo_simbolo = new Simbolo(1, this.type, id, null);
                ts.agregar(id, nuevo_simbolo);
                 
                if(this.type.enum_tipo == tipo.ENTERO){
                    nuevo_simbolo.setValor(0);
                }else if(this.type.enum_tipo == tipo.DOBLE){
                    nuevo_simbolo.setValor(0.0);
                }else if(this.type.enum_tipo == tipo.BOOLEANO){
                    nuevo_simbolo.setValor(true);
                }else if(this.type.enum_tipo == tipo.CADENA){
                    nuevo_simbolo.setValor("");
                }else if(this.type.enum_tipo == tipo.CARACTER){
                    nuevo_simbolo.setValor('0');
                }
            }
        }
        return null;
    }
    recorrer(): Nodo {
       let padre = new Nodo("DECLARACION", "");

       padre.AddHijo(new Nodo(this.type.nombre_tipo, ""));

       let hijos_id = new Nodo("Ids",""); 
       for(let id of this.lista_ids){
        hijos_id.AddHijo(new Nodo(id, ""));
       }
       padre.AddHijo(hijos_id);
       if(this.expresion != null){
           padre.AddHijo(this.expresion.recorrer())
       }

       return padre;
    }
}
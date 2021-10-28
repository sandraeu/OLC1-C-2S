import { lista_errores } from "./Lista_Errores";

export default class Errores{

    public tipo : string;
    public descripcion : string;
    public linea : number;
    public columna : number;

    constructor(tipo: string, descripcion:string, linea:number, columna:number) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
        if(tipo == "Sintactico" || tipo == "Lexico"){
            lista_errores.Errores.push(this);
        }
    }
}
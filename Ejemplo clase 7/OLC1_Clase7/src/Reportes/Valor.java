/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Reportes;
import olc1_clase4.Archivo;
import olc1_clase4.Editor;
/**
 *
 * @author sandr
 */
public class Valor {
    
    public int tipo;    //1= decimal, 2= entero, 3= identificador, 4= cadena, 5 = puntajesEspecifico || puntajeGeneral
    public Object valor;
    
    //--> para puntajes especificos
    public String nombrearchivo;
    public String caracteristica; // 1= variable
    public String identificador; // nombre del identificador de la variable
    
    public Valor(int tipo, Object valor){
        this.tipo = tipo;
        this.valor = valor;
    }
    
    //Para puntajes especificos
    public Valor(int tipo, String nombrearchivo, String caracteristica, String identificador){
        this.tipo = tipo;
        this.nombrearchivo = nombrearchivo;
        this.caracteristica = caracteristica;
        this.identificador = identificador;
    }
    
    public Object getValor(){
        if(this.tipo == 1){ // decimal
            return (double)this.valor;
        }else if(this.tipo == 2){ //entero
            return (int)this.valor;
        }else if(this.tipo ==3){ //identificador
            //--> Caso para variables
            String id = this.valor.toString(); //guardamos el nombre del identificador
            for(Variables ob : Editor.variables_FCA){
                //--> recorremos la lista de variables para buscar si esta el mismo identificador para obtener su valor
                if(id.equalsIgnoreCase(ob.identificador)){
                    return ob.getValor();
                }
            }
        }else if(this.tipo == 4){ //cadena
            return this.valor.toString();
        }else if(this.tipo == 5){ //puntaje especifico
            //puntaje especifico 
            for(Puntajes puntaje : Editor.lista_puntajesEspecificos){
                //--> archivos que ya tenemso 
               if(this.nombrearchivo.equalsIgnoreCase(puntaje.getNombreArchivo())){
                   if(this.caracteristica.equalsIgnoreCase(puntaje.getCaracteristica())){
                       if(this.identificador.equalsIgnoreCase(puntaje.id)){
                            return puntaje.getValor();
                       }
                   }
               }
            }
            //--> si llega hasta aca significa que no encontro nada quiere decir que no se repitio
            return 0; //el valor es 0 
            
        }
         return null;
    }
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package olc1_clase4;

import java.util.LinkedList;

/**
 *
 * @author sandr
 */
public class Archivo {
    
    String nombre_archivo = "";
    LinkedList<String> variables;
    LinkedList<String> comentarios;
    LinkedList<Errores> lista_errores;
    
    public Archivo(String nombre_archivo, LinkedList<String> variables, LinkedList<String> comentarios, LinkedList<Errores> lista_errores){
        this.nombre_archivo = nombre_archivo;
        this.variables = variables;
        this.comentarios = comentarios;
        this.lista_errores = lista_errores;
    }
    
    
    
    
}

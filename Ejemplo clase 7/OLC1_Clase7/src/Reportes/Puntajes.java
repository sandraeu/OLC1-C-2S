/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Reportes;

/**
 *
 * @author sandr
 */
public class Puntajes{
    
    public boolean especifico;  //${PuntajeEspecifico, "archivo1.js" , "variables" , "x"}
    public String nombrearchivo;
    public String caracteristica; // 1= variable, 2= comentario
    public String id; // nombre del identificador de la variable
    
    public double valor;
    
    public Puntajes(){
        this.especifico = false; 
    }
    
    public Puntajes(String nombrearchivo, String caracteristica, String id, double valor){
        this.nombrearchivo = nombrearchivo;
        this.caracteristica = caracteristica;
        this.id= id;
        this.valor = valor;
        this.especifico = true;
    }
    
    public String getNombreArchivo(){
        return this.nombrearchivo;
    }
    
    public String getCaracteristica(){
        return this.caracteristica;
    }
    
    public String getId(){
        return this.id;
    }
    
    public double getValor(){
        return this.valor;
    }
}

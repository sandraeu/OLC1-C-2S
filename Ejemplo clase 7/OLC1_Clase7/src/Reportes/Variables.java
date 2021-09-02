/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Reportes;

import java.util.LinkedList;

/**
 *
 * @author sandr
 */
public class Variables {
    
    public int tipo; //1 = string 2= double
    public String identificador;
    public Object valor;  //es un valor proveniente de la clase valor. 
    
    public Variables(int tipo, String identificador, Object valor){
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor; 
    }
    
    public String getIdentificador(){
        return this.identificador;
    }
    
    public Object getValor(){
       Valor val = (Valor)this.valor;
       return val.getValor();
    }
    
}

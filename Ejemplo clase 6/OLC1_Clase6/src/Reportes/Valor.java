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
public class Valor {
    
    public int tipo;    //1= decimal, 2= entero, 3= identificador, 4= cadena
    public Object valor;
    
    public Valor(int tipo, Object valor){
        this.tipo = tipo;
        this.valor = valor;
    }
    
}

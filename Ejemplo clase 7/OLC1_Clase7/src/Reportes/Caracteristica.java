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
public class Caracteristica {
    public int tipo; //0= titulo, 1= ejex, 2= valores, 3= titulox, 4= tituloy
    public Valor valor;
    public LinkedList<Valor> lista_valores;
    
    
    public Caracteristica(int tipo, Valor valor){
        this.tipo = tipo;
        this.valor = valor;
        
    }
    
    public Caracteristica(int tipo, LinkedList<Valor> lista_valores){
        this.tipo = tipo;
        this.lista_valores = lista_valores;
    }
    
}

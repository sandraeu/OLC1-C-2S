/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package olc1_clase4;

/**
 *
 * @author sandr
 */
public class Errores {
    
    public String tipo;
    public String valor;
    public String archivo;
    public int fila;
    public int columna;

    /**
     * Constructor para agregar errores desde los archivos jflex y cup 
     * @param tipo guarda el tiop de error (lexico o sintactico)
     * @param valor guarda el valor que produjo el error 
     * @param fila guarda la fila donde se produjo el error 
     * @param columna guarda la columna donde se produjo el error 
     */
    
    public Errores(String tipo, String valor, int fila, int columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    
    /**
     * Constructor para agregar errores encontrados en analisis indicando el archivo
     * @param tipo guarda el tiop de error (lexico o sintactico)
     * @param valor guarda el valor que produjo el error 
     * @param archivo guarda el archivo donde se econtro el error
     * @param fila guarda la fila donde se produjo el error 
     * @param columna guarda la columna donde se produjo el error 
     */
    public Errores(String tipo, String valor, String archivo, int fila, int columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.archivo = archivo;
        this.fila = fila;
        this.columna = columna;
    }
    
}

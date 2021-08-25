/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package olc1_clase4;

import Analizadores.Analizador_Lexico;
import Analizadores.Analizador_Lexico_FCA;
import Analizadores.Sintactico;
import Analizadores.Sintactico_FCA;
import Reportes.GBarras;
import java.io.BufferedReader;
import java.io.File; 
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.nio.file.DirectoryIteratorException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author sandr
 */
public class Editor extends javax.swing.JFrame {

    /**
     * Creates new form Editor
     */
    public Editor() {
        initComponents();
    }

    LinkedList<String> variables = new LinkedList<String>();
    LinkedList<Archivo> datos_archivos = new LinkedList<>();
    static LinkedList<Object> instrucciones = new LinkedList<Object>();
    public static LinkedList<Errores> lista_errores = new LinkedList<>();
    public static LinkedList<String> lista_comentarios = new LinkedList<>();
    
    public int cont_variables_repetidas = 0;
    public int cont_comment_repetido = 0;
    
    /**
     * Metodo para recorrer el arbol sintactico generado con el archivo .js
     * @param nodo recibe el nodo padre a recorrer 
     * @param variables recibe la lista de variables 
     */
    public void analizar_entrada(Nodo nodo, LinkedList<String> variables){
        
        for(Nodo instruccion : nodo.hijos){
            //Si encuentra un nodo tipo declaracion guardo el id en la lista de variables 
            if(instruccion.token == "DECLARACION"){
                for(Nodo decla : instruccion.hijos){
                    if(decla.token == "identificador"){
                        variables.add(decla.lexema);
                    }
                } 
            }
            
            if(instruccion.lexema == ""){
                analizar_entrada(instruccion, variables);
            }
        }
    }
    
    //--> metodo para imprimir variables utilizado en ejemplo clase4 
    public void imprimir_variables(){
        for(String id: variables){
            jTextArea2.append("variable encontrada -> " + id + "\n");
            System.out.println("variable encontrada -> " + id );
        }
    }
    
    
    /**
     * Metodo para verificar los archivos dentro de una carpeta 
     * @param ruta_proy1 indica la ruta donde se encuentra la carpeta del proyecto 1
     * @param ruta_proy2 indica la ruta donde se encuentra la carpeta del proyecto 2
     */
    public void archivos_carpetas(String ruta_proy1, String ruta_proy2){
        
        try{
            DirectoryStream<Path> stream_p1 = Files.newDirectoryStream(Paths.get(ruta_proy1), "*.js");
            
           //Recorremos los archivos del proyecto 1
            for (Path file_p1: stream_p1) {
                DirectoryStream<Path> stream_p2 = Files.newDirectoryStream(Paths.get(ruta_proy2), "*.js");
                
                String nombre_archivo1 = file_p1.getFileName().toString(); 
                File archivo = new File (file_p1.toString());
                FileReader fr = new FileReader (archivo);
                Archivo nuevo_archivo1 = null;
                Archivo nuevo_archivo2 = null;
                //Vamos a comparar el archivo del proyecto1 con los archivos de la carpeta2 para saber si se llaman igual 
                for(Path file_p2 : stream_p2){
                    String nombre_archivo2 = file_p2.getFileName().toString();
                    File archivo2 = new File (file_p2.toString());
                    FileReader fr2 = new FileReader (archivo2);
                    //Si se llaman igual se comienza el proceso para analizar copias
                    if(nombre_archivo1.equals(nombre_archivo2)){
                        System.out.println("Los nombres son iguales, vamos a comparar --> " + file_p1.getFileName());
                        //--> 1ero vamos a analizar el archivo1 del proyecto 1
                        try{
                            
                            System.out.println("----------- " + nombre_archivo1 + " en PROYECTO 1 ----------- ");
                            Nodo raiz = null;
                            //Mandamos a analizar el archivo del proyecto 1 
                            Sintactico parse = new Sintactico(new Analizador_Lexico(new BufferedReader(fr)));
                            parse.parse();

                            raiz = parse.getRaiz();
                            if(raiz == null){
                                System.out.println("No se genero bien el arbol");
                            }else{
                                
                                nuevo_archivo1 = new Archivo(nombre_archivo1, new LinkedList<>(), new LinkedList<>(), new LinkedList<>());
                                //--> vamos a guardar las variables encontradas en el archivo
                                analizar_entrada(raiz,nuevo_archivo1.variables ); 
                                //-->agregamos los comentarios encontrados (la lista se lleno en el archivo A_Lexico_FCA.jflex)
                                for(String comment : lista_comentarios){
                                    nuevo_archivo1.comentarios.add(comment);
                                }
                                //-->agregamos los errores encontrados (la lista se lleno en los archivos A_Lexico_FCA.jflex y A_sintacticos_FCA.cup)
                                for(Errores error : lista_errores){
                                    //--> guardamos los errore indicando el nombre del archivo
                                    Errores nuevo_error = new Errores(error.tipo, error.valor, nuevo_archivo1.nombre_archivo, error.fila, error.columna);
                                    nuevo_archivo1.lista_errores.add(nuevo_error);
                                }
                                //Arbol arbol = new Arbol(raiz);
                                //arbol.GraficarSintactico();
                                
                                //-->guardamos el archivo en una lista
                                this.datos_archivos.add(nuevo_archivo1);
                                //-->limpiamos variables
                                lista_errores.clear();
                                lista_comentarios.clear();
                                
                            }
                        }catch(Exception ex){
                            System.out.println("Error en analizar el archivo del proyecto.");
                            System.out.println("Causa: "+ex.getCause());
                        }
                        //--> 2do vamos a analizar el archivo2
                        try{
                            
                            System.out.println("----------- " + nombre_archivo2 + " en PROYECTO 2----------- ");
                            Nodo raiz = null;
                            //Mandamos a analizar el archivo del proyecto 2
                            Sintactico parse = new Sintactico(new Analizador_Lexico(new BufferedReader(fr2)));
                            parse.parse();

                            raiz = parse.getRaiz();
                            if(raiz == null){
                                System.out.println("No se genero bien el arbol");
                            }else{
                                
                                nuevo_archivo2 = new Archivo(nombre_archivo2, new LinkedList<>(), new LinkedList<>(),new LinkedList<>());
                                //--> vamos a guardar las variables encontradas en el archivo
                                analizar_entrada(raiz, nuevo_archivo2.variables); 
                                //-->agregamos los comentarios encontrados (la lista se lleno en el archivo A_Lexico_FCA.jflex)
                                for(String comment : lista_comentarios){
                                    nuevo_archivo2.comentarios.add(comment);
                                }
                                //-->agregamos los errores encontrados (la lista se lleno en los archivos A_Lexico_FCA.jflex y A_sintacticos_FCA.cup)
                                for(Errores error : lista_errores){
                                    //--> guardamos los errore indicando el nombre del archivo
                                    Errores nuevo_error = new Errores(error.tipo, error.valor, nuevo_archivo2.nombre_archivo, error.fila, error.columna);
                                    nuevo_archivo2.lista_errores.add(nuevo_error);
                                }
                                //Arbol arbol = new Arbol(raiz);
                                //arbol.GraficarSintactico();
                                //-->guardamos el archivo en una lista
                                this.datos_archivos.add(nuevo_archivo2);
                                //-->limpiamos variables
                                lista_errores.clear();
                                lista_comentarios.clear();
                                
                            }
                        }catch(Exception ex){
                            System.out.println("Error en analizar el archivo del proyecto.");
                            System.out.println("Causa: "+ex.getCause());
                        }
                        
                        //--> detectamos copias entre estos dos archivos 
                        if(nuevo_archivo1 != null && nuevo_archivo2 != null){
                            variables_repetidas(nuevo_archivo1, nuevo_archivo2);
                            comentarios_repetidos(nuevo_archivo1, nuevo_archivo2);
                        }
                    }
                }
            }
        } catch (IOException | DirectoryIteratorException ex) {
		    System.err.println(ex);
		}
    }
    
    /**
     * Metodo para verificar las variables repetidas en ambos archivos
     * @param archivo1 recibe el archivo del proyecto 1 con toda su informacion
     * @param archivo2 recibe el archivo del proyecto 2 con toda su informacion
     */
    public void variables_repetidas(Archivo archivo1, Archivo archivo2){
        //dar el punteo. 
        for(String id_variable_arch1 : archivo1.variables){
            for(String id_variable_arch2 : archivo2.variables){
                if(id_variable_arch1.equals(id_variable_arch2)){
                    jTextArea2.append("Variable repetida \"" + id_variable_arch1 +"\" en archivos " + archivo1.nombre_archivo + "\n");
                    this.cont_variables_repetidas++;
                }
            }
        }
    }
    
    /**
     * Metodo para verificar los comentarios repetidos en ambos archivos
     * @param archivo1 recibe el archivo del proyecto 1 con toda su informacion
     * @param archivo2 recibe el archivo del proyecto 2 con toda su informacion
     */
    public void comentarios_repetidos(Archivo archivo1, Archivo archivo2){
        for(String comment : archivo1.comentarios){
            for(String comment2 : archivo2.comentarios){
                if(comment.equalsIgnoreCase(comment2)){
                    jTextArea2.append("Comentario repetido \"" + comment +"\" en archivos " + archivo2.nombre_archivo + "\n");
                    this.cont_comment_repetido++;
                }
            }
        }
    }
    
    /**
     * Metodo para generar el reporte de errores
     */
    public void ReporteErrores(){
        
        LinkedList<Errores> Reporte_errores = new LinkedList<>();
        
        for(Archivo archivo : datos_archivos){
            Reporte_errores.addAll(archivo.lista_errores);
        }
        
        FileWriter fichero = null;
        PrintWriter pw = null;
                try {
                    fichero = new FileWriter("D:\\ReporteErrores.html");
                    pw = new PrintWriter(fichero); 
                String Html = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//ES\">\n\t"
               + "<HTML>\n\t"
               + "<HEAD>\n\t"
               + "<TITLE>REPORTE DE ERRORES</TITLE>\n\t"
               + "<style>\n\t"
               + "body {\n\t"
               + "background:#AAAA;\n\t"
               +/* el fondo de todo el cuerpo*/ "padding: 20px;\n\t"
               + /*el espacio entre el borde y su contenido*/ "}\n\t"
               + "h2 {\n\t"
               + "color: #5D6D7E;\n\t"
               + "font-family: Calibri;\n\t"
               + /*tipo de fuente*/ "}\n\t"
               + ".articulo {\n\t"
               + "font-size: 14px;\n\t"
               + "font-family: Calibri;\n\t"
               + "background: #7FB3D5;\n\t"
               + "border: 6px solid #2471A3;\n\t" //borde cuadro arriba
               + "color: #AAAAAFF;\n\t"
               + "padding: 13px;\n\t"
               + "}\n\t"
               + ".tabla {\n\t"
               + "font-size: 14px;\n\t"
               + "font-family: Century Gothic;\n\t"
               + "background: #AAAAA;\n\t"
               + "border: 6px solid #5D6D7E;\n\t" //borde cuadro abajo
               + "color: #000000;\n\t"
               + "padding: 13px;\n\t"
               + "}\n\t"
               + ".fin {\n\t"
               + "font-size: 14px;\n\t"
               + "font-family: Eras Light ITC;\n\t"
               + "background: #7FB3D5;\n\t"
               + "border: 6px solid #F74316;\n\t"
               + "color: #000000;\n\t" +//2939B5
               "padding: 13px;\n\t"
               + "}\n\t"
               + "</style>\n\t"
               + "</HEAD>\n\t"
               + "<BODY>\n\t"
               + "<div class=\"articulo\"><H3>Universidad de San Carlos de Guatemala<BR>Facultad de Ingenieria<BR>Escuela de Ciencias y Sistemas<BR>Reporte de Errores</H3><CENTER><H2>Organizacion de Lenguajes y Compiladores 1<BR>PROYECTO 1 [FIUSAC Copy Analyzer]<BR>REPORTE DE ERRORES</H2></CENTER></div>\n"
               + "<div class=\"tabla\"><UL>\n" +//No. Errores: 
               "<table style= border=3>\n\t"
               + "<tr align=\"center\" bottom=\"middle\">\n\t"
               + "<td>\n\t"
               + "<table border=2>\n\t"
               + "<tr align=\"center\" bottom=\"middle\">\n\t"
               + "<td><b>Tipo</b></td>\n\t"
               + "<td><b>Descripcion</b></td>\n\t"
               + "<td><b>Fila</b></td>\n\t"
               +  "<td><b>Columna</b></td>\n\t"
               +  "<td><b>Archivo</b></td>\n\t"
               + "</tr>\n\t";
               
                for(Errores error : Reporte_errores){
                    Html += "<tr align=\"center\" bottom=\"middle\">\n\t"
                    + "<td>" + error.tipo + "</td>"
                    + "<td>" + error.valor + "</td>"
                    + "<td>" + error.fila  + "</td>"
                    +  "<td>" + error.columna + "</td>"
                    +  "<td>" + error.archivo + "</td>"
                    + "</tr>\n\t";
                }  
                Html += "</tr></table></tr></table></UL></div>\n\t"
                +"</BODY>\n\t"
                + "</HTML>";
                pw.print(Html);
                    
                } catch (Exception e) {
                }finally{
                    if(null!=fichero){
                        try {
                            fichero.close();
                        } catch (IOException ex) {
                            Logger.getLogger(Editor.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                }
                try {
            Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + "Reportes\\"+"ReporteErrores.html");
            //System.out.println("Final");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        jTextArea1 = new javax.swing.JTextArea();
        jButton1 = new javax.swing.JButton();
        jScrollPane2 = new javax.swing.JScrollPane();
        jTextArea2 = new javax.swing.JTextArea();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jTextArea1.setColumns(20);
        jTextArea1.setFont(new java.awt.Font("Monospaced", 0, 24)); // NOI18N
        jTextArea1.setRows(5);
        jTextArea1.setText("GenerarReporteEstadistico{\n Compare(\"D:\\\\Entrada\\\\proyecto1\",\"D:\\\\Entrada\\\\proyecto2\");\n\n GraficaBarras{\n\tTitulo: \"reporte1\";\n\tEjex: [ \"Prob1\" , \"Prob2\"];\n\tValores: [ 0.8, 1.2 ];\n\tTitulox: \"Atributos\";\n\tTituloy: \"Probabilidades\";\n }\n}");
        jScrollPane1.setViewportView(jTextArea1);

        jButton1.setText("Analizar");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        jTextArea2.setColumns(20);
        jTextArea2.setFont(new java.awt.Font("Monospaced", 0, 18)); // NOI18N
        jTextArea2.setRows(5);
        jScrollPane2.setViewportView(jTextArea2);

        jLabel1.setFont(new java.awt.Font("Tahoma", 1, 18)); // NOI18N
        jLabel1.setText("Consola:");

        jLabel2.setFont(new java.awt.Font("Tahoma", 1, 18)); // NOI18N
        jLabel2.setText("Entrada:");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(layout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel1)
                            .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 914, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                        .addGap(82, 82, 82)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel2)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 92, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 914, javax.swing.GroupLayout.PREFERRED_SIZE)))))
                .addContainerGap(112, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(46, 46, 46)
                .addComponent(jLabel2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 328, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 41, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(jLabel1)
                        .addGap(8, 8, 8)))
                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 160, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(24, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        Nodo raiz = null;
        
        try {   
            //se ejecuta el lexico y sintactico para analizar el archivo FCA 
            Sintactico_FCA sintactico_fca =new Sintactico_FCA(new Analizador_Lexico_FCA(new BufferedReader( new StringReader(jTextArea1.getText()))));
            sintactico_fca.parse();
            instrucciones = sintactico_fca.instrucciones;
            
            //Recorre las instrucciones encontradas en el archivo FCA
            for(Object ins : instrucciones){
                if(ins instanceof Comparar){
                    Comparar comp = (Comparar)ins;
                    archivos_carpetas(comp.getRuta1(), comp.getRuta2());
                    this.ReporteErrores();
                }else if(ins instanceof GBarras){
                    GBarras grafica_barras = (GBarras)ins;
                    grafica_barras.valores();
                    grafica_barras.generar_graficaBarras();
                }
            }
            
            /*
            --> Utilizado en el ejemplo de clase 4.
            Sintactico sintactico =new Sintactico(new Analizador_Lexico(new BufferedReader( new StringReader(jTextArea1.getText()))));
            sintactico.parse();

            raiz = sintactico.getRaiz();
            */
        
        } catch (Exception ex) {
                Logger.getLogger(Editor.class.getName()).log(Level.SEVERE, null, ex);
        }
        /*
        --> Utilizado en el ejemplo de clase 4.
        if(raiz == null){
            System.out.println("No se genero bien el arbol");
        }else{
            jTextArea2.setText("");
            analizar_entrada(raiz);
            imprimir_variables();  
            
            Arbol arbol = new Arbol(raiz);
            arbol.GraficarSintactico();
        }
        */
        
        
        
        
    }//GEN-LAST:event_jButton1ActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Editor().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton jButton1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JTextArea jTextArea1;
    private javax.swing.JTextArea jTextArea2;
    // End of variables declaration//GEN-END:variables
}

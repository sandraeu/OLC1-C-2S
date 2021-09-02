/*--------------------------------------------------
 ------------  1ra Area: Codigo de Usuario ---------
 ---------------------------------------------------*/

//------> Paquetes,importaciones
package Analizadores;
import java_cup.runtime.*;
import javax.swing.JOptionPane;

/*----------------------------------------------------------
  ------------  2da Area: Opciones y Declaraciones ---------
  ----------------------------------------------------------*/
%%
%{
    //----> Codigo de usuario en sintaxis java
%}

//-------> Directivas
%public 
%class Analizador_Lexico_FCA
%cupsym Simbolos_FCA
%cup
%char
%column
%full
%ignorecase
%line
%unicode

//------> Expresiones Regulares

cadena              = [\"][^\"\n]+[\"]
digito              = [0-9]+
decimal             = [0-9]+("."[  |0-9]+) 
letra               = [a-zA-ZÑñ]+
id                  = {letra}({letra}|{digito}|"_")*

LineTerminator = \r|\n|\r\n
InputCharacter = [^\r\n]

comentariosimple    = "##" {InputCharacter}* {LineTerminator}?

//------> Estados

%%

/*------------------------------------------------
  ------------  3ra Area: Reglas Lexicas ---------
  ------------------------------------------------*/

//-----> Simbolos

","         { System.out.println("Reconocio "+yytext()+" coma"); return new Symbol(Simbolos_FCA.coma, yycolumn, yyline, yytext()); }
"{"         { System.out.println("Reconocio "+yytext()+" llava"); return new Symbol(Simbolos_FCA.llava, yycolumn, yyline, yytext()); }
"}"         { System.out.println("Reconocio "+yytext()+" llavc"); return new Symbol(Simbolos_FCA.llavc, yycolumn, yyline, yytext()); }
"("         { System.out.println("Reconocio "+yytext()+" para"); return new Symbol(Simbolos_FCA.para, yycolumn, yyline, yytext()); }
")"         { System.out.println("Reconocio "+yytext()+" parc"); return new Symbol(Simbolos_FCA.parc, yycolumn, yyline, yytext()); }
";"         { System.out.println("Reconocio "+yytext()+" pyc"); return new Symbol(Simbolos_FCA.pyc, yycolumn, yyline, yytext()); }
":"         { System.out.println("Reconocio "+yytext()+" dospnts"); return new Symbol(Simbolos_FCA.dospnts, yycolumn, yyline, yytext()); }
"["         { System.out.println("Reconocio "+yytext()+" cora"); return new Symbol(Simbolos_FCA.cora, yycolumn, yyline, yytext()); }
"]"         { System.out.println("Reconocio "+yytext()+" corc"); return new Symbol(Simbolos_FCA.corc, yycolumn, yyline, yytext()); }
"$"         { System.out.println("Reconocio "+yytext()+" dolar"); return new Symbol(Simbolos_FCA.dolar, yycolumn, yyline, yytext()); }
"="         { System.out.println("Reconocio "+yytext()+" igual"); return new Symbol(Simbolos_FCA.igual, yycolumn, yyline, yytext()); }


//-----> Palabras reservadas
"GenerarReporteEstadistico"         { System.out.println("Reconocio "+yytext()+" gre"); return new Symbol(Simbolos_FCA.gre, yycolumn, yyline, yytext()); }
"Compare"         { System.out.println("Reconocio "+yytext()+" comp"); return new Symbol(Simbolos_FCA.comp, yycolumn, yyline, yytext()); }
"GraficaBarras"   { System.out.println("Reconocio "+yytext()+" gbarras"); return new Symbol(Simbolos_FCA.gbarras, yycolumn, yyline, yytext()); }
"titulo"            { System.out.println("Reconocio "+yytext()+" titulo"); return new Symbol(Simbolos_FCA.titulo, yycolumn, yyline, yytext()); }
"ejex"          { System.out.println("Reconocio "+yytext()+" ejex"); return new Symbol(Simbolos_FCA.ejex, yycolumn, yyline, yytext()); }
"valores"       { System.out.println("Reconocio "+yytext()+" valores"); return new Symbol(Simbolos_FCA.valores, yycolumn, yyline, yytext()); }
"titulox"       { System.out.println("Reconocio "+yytext()+" titulox"); return new Symbol(Simbolos_FCA.titulox, yycolumn, yyline, yytext()); }
"tituloy"       { System.out.println("Reconocio "+yytext()+" tituloy"); return new Symbol(Simbolos_FCA.tituloy, yycolumn, yyline, yytext()); }
"PuntajeEspecifico"       { System.out.println("Reconocio "+yytext()+" pntesp"); return new Symbol(Simbolos_FCA.pntesp, yycolumn, yyline, yytext()); }
"PuntajeGeneral"       { System.out.println("Reconocio "+yytext()+" pntgen"); return new Symbol(Simbolos_FCA.pntgen, yycolumn, yyline, yytext()); }
"string"       { System.out.println("Reconocio "+yytext()+" cadstring"); return new Symbol(Simbolos_FCA.cadstring, yycolumn, yyline, yytext()); }
"double"       { System.out.println("Reconocio "+yytext()+" doble"); return new Symbol(Simbolos_FCA.doble, yycolumn, yyline, yytext()); }
"definirGlobales"       { System.out.println("Reconocio "+yytext()+" defglobal"); return new Symbol(Simbolos_FCA.defglobal, yycolumn, yyline, yytext()); }



//-------> Simbolos ER
{cadena}    { System.out.println("Reconocio "+yytext()+" cadena"); return new Symbol(Simbolos_FCA.cadena, yycolumn, yyline, yytext()); }
{digito}    { System.out.println("Reconocio "+yytext()+" digito"); return new Symbol(Simbolos_FCA.digito, yycolumn, yyline, yytext()); }
{decimal}    { System.out.println("Reconocio "+yytext()+" decimal"); return new Symbol(Simbolos_FCA.decimal, yycolumn, yyline, yytext()); }
{id}    { System.out.println("Reconocio "+yytext()+" id"); return new Symbol(Simbolos_FCA.id, yycolumn, yyline, yytext()); }


//------> Espacios
{comentariosimple}      {System.out.println("Comentario: "+yytext()); }
[ \t\r\n\f]             {/* Espacios en blanco, se ignoran */}

//------> Errores Lexicos
.                       { System.out.println("Error Lexico"+yytext()+" Linea "+yyline+" Columna "+yycolumn);}



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

//-----> Palabras reservadas
"GenerarReporteEstadistico"         { System.out.println("Reconocio "+yytext()+" gre"); return new Symbol(Simbolos_FCA.gre, yycolumn, yyline, yytext()); }
"Compare"         { System.out.println("Reconocio "+yytext()+" comp"); return new Symbol(Simbolos_FCA.comp, yycolumn, yyline, yytext()); }
 

//-------> Simbolos ER
{cadena}    { System.out.println("Reconocio "+yytext()+" cadena"); return new Symbol(Simbolos_FCA.cadena, yycolumn, yyline, yytext()); }



//------> Espacios
{comentariosimple}      {System.out.println("Comentario: "+yytext()); }
[ \t\r\n\f]             {/* Espacios en blanco, se ignoran */}

//------> Errores Lexicos
.                       { System.out.println("Error Lexico"+yytext()+" Linea "+yyline+" Columna "+yycolumn);}



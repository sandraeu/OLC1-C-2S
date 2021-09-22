
/* Ejemplo clase 8 */

/* Definicion lexica */
%lex
%options case-insensitive 

//Expresiones regulares
num [0-9]+

%%

/* Comentarios */
"//".*              {/*Ignoramos los comentarios simples*/}   id++

/* Simbolos del programa */
"*"                  { console.log("Reconocio : " + yytext);  return 'MULTI' } 
"/"                  { console.log("Reconocio : " + yytext);  return 'DIV' } 
"-"                  { console.log("Reconocio : " + yytext);  return 'MENOS' } 
"++"                  { console.log("Reconocio : " + yytext);  return 'INCRE' } 
"+"                  { console.log("Reconocio : " + yytext);  return 'MAS' } 
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' } 
"!"                  { console.log("Reconocio : " + yytext);  return 'NOT' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' } 
"("                  { console.log("Reconocio : " + yytext);  return 'PARA' } 
")"                  { console.log("Reconocio : " + yytext);  return 'PARC' } 
"["                  { console.log("Reconocio : " + yytext);  return 'CORA' } 
"]"                  { console.log("Reconocio : " + yytext);  return 'CORC' } 
";"                  { console.log("Reconocio : " + yytext);  return 'PYC' } 
"PI"                 { console.log("Reconocio : " + yytext);  return 'PI' } 
"E"                  { console.log("Reconocio : " + yytext);  return 'E' } 

/*Palabras reservadas*/
"evaluar"                  { console.log("Reconocio : " + yytext);  return 'EVALUAR' } 

//SIMBOLOS ER

[0-9]+("."[0-9]+)?\b  { console.log("Reconocio : " + yytext);  return 'DECIMAL' } 
{num}                 { console.log("Reconocio : " + yytext);  return 'ENTERO' } 

/*Espacios*/
[\s\r\n\t]             {/* Espacios se ignoran */}


<<EOF>>               return 'EOF'
.                     return 'ERROR'

/lex

// area de imports
%{
    const evaluar = require('../Interprete/Evaluar');
%}

/* operator associations and precedence */

%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%left 'POT'
%right 'NOT'
%right 'MOD'
%left UMINUS

%start inicio

%% /* language grammar */

inicio : instrucciones EOF  { $$ = $1; return $$ };

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   { $$ = new Array(); $$.push($1); }
            ;

instruccion : EVALUAR CORA e CORC PYC   { $$ =  new evaluar.default($3); }
            ;

e
    : e MAS e
        {$$ = $1 + $3;}
    | e MENOS e
        {$$ = $1-$3;}
    | e MULTI e
        {$$ = $1*$3;}
    | e DIV e
        {$$ = $1/$3;}
    | e POT e
        {$$ = Math.pow($1, $3);}
    | e NOT 
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e MOD
        {$$ = $1/100;}
    | MENOS e %prec UMINUS  
        {$$ = -$2;}
    | PARA e PARC 
        {$$ = $2;}
    | DECIMAL
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;



/* Ejemplo para la gramatica del interprete */

/* Definicion lexica */
%lex
%options case-insensitive 

//Expresiones regulares
num [0-9]+
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*

//--> Cadena
escapechar      [\'\"\\ntr]
escape          \\{escapechar}
aceptacion      [^\"\\] 
cadena          (\"({escape} | {aceptacion})*\")

//--> Caracter 
escapechar2      [\'\"\\ntr]
escape2          \\{escapechar2}
aceptacion2      [^\'\\] 
caracter         (\'({escape2} | {aceptacion2})\')

%%

/* Comentarios */
"//".*              {/*Ignoramos los comentarios simples*/}   id++
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/} 


/* Simbolos del programa */

"--"                  { console.log("Reconocio : " + yytext);  return 'DECRE' } 
"++"                  { console.log("Reconocio : " + yytext);  return 'INCRE' } 
"=="                  { console.log("Reconocio : " + yytext);  return 'IGUALIGUAL' } 
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' } 
"!"                  { console.log("Reconocio : " + yytext);  return 'NOT' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' } 
"("                  { console.log("Reconocio : " + yytext);  return 'PARA' } 
")"                  { console.log("Reconocio : " + yytext);  return 'PARC' } 
"["                  { console.log("Reconocio : " + yytext);  return 'CORA' } 
"]"                  { console.log("Reconocio : " + yytext);  return 'CORC' } 
";"                  { console.log("Reconocio : " + yytext);  return 'PYC' } 
"="                  { console.log("Reconocio : " + yytext);  return 'IGUAL' } 
","                  { console.log("Reconocio : " + yytext);  return 'COMA' } 
"{"                  { console.log("Reconocio : "+ yytext); return 'LLAVA'}
"}"                  { console.log("Reconocio : "+ yytext); return 'LLAVC'}
"?"                  { console.log("Reconocio : "+ yytext); return 'INTERROGACION'}
":"                  { console.log("Reconocio : "+ yytext); return 'DSPNTS'}

/* OPERADORES ARITMETICOS */
"+"                  { console.log("Reconocio : " + yytext);  return 'MAS' } 
"*"                  { console.log("Reconocio : " + yytext);  return 'MULTI' } 
"/"                  { console.log("Reconocio : " + yytext);  return 'DIV' } 
"-"                  { console.log("Reconocio : " + yytext);  return 'MENOS' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' }
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' } 

/* OPERADORES RELACIONALES */
">="                  { console.log("Reconocio : " + yytext);  return 'MAYORIGUAL' } 
">"                  { console.log("Reconocio : " + yytext);  return 'MAYORQUE' }
"<="                  { console.log("Reconocio : " + yytext);  return 'MENORIGUAL' } 
"<"                  { console.log("Reconocio : " + yytext);  return 'MENORQUE' } 
"!="                  { console.log("Reconocio : " + yytext);  return 'DIFERENTE' }

/* OPERADORES LOGICOS */
"&&"                  { console.log("Reconocio : " + yytext);  return 'AND' } 
"||"                  { console.log("Reconocio : " + yytext);  return 'OR' } 
"!"                  { console.log("Reconocio : " + yytext);  return 'NOT' }

/*Palabras reservadas*/
"evaluar"                  { console.log("Reconocio : " + yytext);  return 'EVALUAR' } 
"true"                  { console.log("Reconocio : " + yytext);  return 'TRUE' } 
"false"                  { console.log("Reconocio : " + yytext);  return 'FALSE' } 

"int"                  { console.log("Reconocio : " + yytext);  return 'INT' } 
"double"                  { console.log("Reconocio : " + yytext);  return 'DOUBLE' } 
"string"                  { console.log("Reconocio : " + yytext);  return 'STRING' } 
"char"                  { console.log("Reconocio : " + yytext);  return 'CHAR' } 
"boolean"                  { console.log("Reconocio : " + yytext);  return 'BOOLEAN' }

"writeline"                  { console.log("Reconocio : " + yytext);  return 'WRITELINE' }

"if"               { console.log("Reconocio : "+ yytext); return 'IF'}
"while"            { console.log("Reconocio : "+ yytext); return 'WHILE'}
"else"             { console.log("Reconocio : "+ yytext); return 'ELSE'}
"break"            { console.log("Reconocio : "+ yytext); return 'BREAK'}

"for"            { console.log("Reconocio : "+ yytext); return 'FOR'}
"switch"            { console.log("Reconocio : "+ yytext); return 'SWITCH'}
"case"            { console.log("Reconocio : "+ yytext); return 'CASE'}
"tostring"            { console.log("Reconocio : "+ yytext); return 'TOSTRING'}
"toupper"            { console.log("Reconocio : "+ yytext); return 'TOUPPER'}
"default"            { console.log("Reconocio : "+ yytext); return 'DEFAULT'}

"continue"            { console.log("Reconocio : "+ yytext); return 'CONTINUE'}

"start"            { console.log("Reconocio : "+ yytext); return 'START'}
"with"            { console.log("Reconocio : "+ yytext); return 'WITH'}
"void"            { console.log("Reconocio : "+ yytext); return 'VOID'}

"return"            { console.log("Reconocio : "+ yytext); return 'RETURN'}
"typeof"            { console.log("Reconocio : "+ yytext); return 'TYPEOF'}


//SIMBOLOS ER

[0-9]+("."[0-9]+)\b  { console.log("Reconocio : " + yytext);  return 'DECIMAL' } 
{num}                 { console.log("Reconocio : " + yytext);  return 'ENTERO' } 
{id}                 { console.log("Reconocio : " + yytext);  return 'ID' } 
{cadena}                 { console.log("Reconocio : " + yytext);  return 'CADENA' } 
{caracter}                 { console.log("Reconocio : " + yytext);  return 'CARACTER' } 


/*Espacios*/
[\s\r\n\t]             {/* Espacios se ignoran */}


<<EOF>>               return 'EOF'
.                     { console.log("Error Lexico "+yytext
                        +" linea "+yylineno
                        +" columna "+(yylloc.last_column+1));

                        new errores.default('Lexico', 'El caracter ' + yytext 
                                + ' no forma parte del lenguaje', 
                                yylineno+1, 
                                yylloc.last_column+1); 
                                      
                        }

/lex

// area de imports
%{
    const evaluar = require('../Interprete/Evaluar');
    const aritmetica = require('../Interprete/Expresiones/Operaciones/Aritmetica');
    const primitivo = require('../Interprete/Expresiones/Primitivo');

    const writeline = require('../Interprete/Instrucciones/WriteLine')
    const declaracion = require('../Interprete/Instrucciones/Declaracion')
    const ast = require('../Interprete/Ast/Ast')
    const tipo = require('../Interprete/TablaSimbolos/Tipo')
    const identificador = require('../Interprete/Expresiones/Identificador')

    const relacional = require('../Interprete/Expresiones/Operaciones/Relacional');
    const logica = require('../Interprete/Expresiones/Operaciones/Logica');

    const asignacion = require('../Interprete/Instrucciones/Asignacion');
    const Ifs = require('../Interprete/Instrucciones/SentenciasControl/Ifs');
    const While = require('../Interprete/Instrucciones/SentenciasCiclica/While');
    const ternario = require('../Interprete/Expresiones/Ternario');
    const detener = require('../Interprete/Instrucciones/SentenciasTransferencia/Break');

    const Switch = require('../Interprete/Instrucciones/SentenciasControl/Switch');
    const caso = require('../Interprete/Instrucciones/SentenciasControl/Caso'); 
    const For = require('../Interprete/Instrucciones/SentenciasCiclica/For');

    const continuar = require('../Interprete/Instrucciones/SentenciasTransferencia/Continue');

     const funcion = require('../Interprete/Instrucciones/Funcion');
     const llamada = require('../Interprete/Instrucciones/Llamada');
     const startwith = require('../Interprete/Instrucciones/StartWith');
      const simbolo = require('../Interprete/TablaSimbolos/Simbolo')
      const retorno = require('../Interprete/Instrucciones/SentenciasTransferencia/Return');

      const tipoof = require('../Interprete/Expresiones/Nativas/Typeof');

       const errores = require('../Interprete/Ast/Errores')
%}

/* PRECEDENCIA */
%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%left 'POT' 
%right 'MOD'
%right UMINUS


%start inicio

%% /* language grammar */

inicio : instrucciones EOF  { $$ = new ast.default($1); return $$ };

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   { $$ = new Array(); $$.push($1); }
            ;

instruccion : declaracion   { $$ =  $1; }
            | writeline     { $$ = $1; }
            | asignacion    { $$ = $1; }
            | sent_if       { $$ = $1; }
            | sent_while    { $$ = $1; } 
            | BREAK PYC     { $$ = new detener.default(); }
            | sent_switch   { $$ = $1; } 
            | sent_for       { $$ = $1; } 
            |  ID DECRE PYC  { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
            | ID INCRE  PYC { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
            | CONTINUE PYC  { $$ = new continuar.default(); }
            | funciones     { $$ = $1; } 
            | llamada PYC   { $$ = $1; } 
            | RETURN PYC        { $$ = new retorno.default(null); } 
            | RETURN e PYC      { $$ = new retorno.default($2); } 
            | error         { console.log("Error Sintactico" + yytext 
                                    + "linea: " + this._$.first_line 
                                    + "columna: " + this._$.first_column); 
                        
                                new errores.default("Sintactico", "No se esperaba el caracter "+ yytext , 
                                                this._$.first_line ,this._$.first_column);            
                            }
            ;

declaracion : tipo lista_ids IGUAL e PYC  { $$ = new declaracion.default($1, $2, $4,  @1.first_line, @1.last_column);}  
            | tipo lista_ids PYC         { $$ = new declaracion.default($1, $2, null,  @1.first_line, @1.last_column);}
            ;

tipo : INT     {$$ = new tipo.default("ENTERO"); }
    | DOUBLE    {$$ = new tipo.default("DOBLE"); }
    | STRING    {$$ = new tipo.default("CADENA"); }
    | CHAR      {$$ = new tipo.default("CARACTER"); }
    | BOOLEAN   {$$ = new tipo.default("BOOLEANO"); }  
    ;

lista_ids : lista_ids COMA ID   { $$ = $1; $$.push($3); }
        | ID                    { $$ = new Array(); $$.push($1); }
        ;

writeline : WRITELINE PARA e PARC PYC { $$ = new writeline.default($3, @1.first_line, @1.last_column); }
        ;

asignacion : ID IGUAL e PYC   { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
            ;

sent_if : IF PARA e PARC LLAVA instrucciones LLAVC { $$ = new Ifs.default($3, $6, [], @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC { $$ = new Ifs.default($3, $6, $10, @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE sent_if { $$ = new Ifs.default($3, $6, [$9], @1.first_line, @1.last_column); }
        ;

sent_while : WHILE PARA e PARC LLAVA instrucciones LLAVC { $$ = new While.default($3, $6, @1.first_line, @1.last_column);  }
            ;

sent_for : FOR PARA dec_asig_for PYC e PYC actualizacion_for PARC LLAVA instrucciones LLAVC { $$ = new For.default($3, $5, $7, $10, @1.first_line, @1.last_column); }
        ;
// for(i = 0 ; ...)
dec_asig_for : tipo ID IGUAL e  { $$ = new declaracion.default($1, $2, $4,  @1.first_line, @1.last_column);} 
            | ID IGUAL e        { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
            ;
//x = 0
// i --
// i++ 
// x++ 
// print(x) -> 1
// i = i + 1 
actualizacion_for : ID DECRE { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                | ID INCRE   { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                | ID IGUAL e { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
                ;

sent_switch : SWITCH PARA e PARC LLAVA caselist LLAVC           { $$ = new Switch.default($3, $6, null, @1.first_line, @1.last_column); }
            | SWITCH PARA e PARC LLAVA caselist default LLAVC   { $$ = new Switch.default($3, $6, $7, @1.first_line, @1.last_column); }
            | SWITCH PARA e PARC LLAVA default LLAVC            { $$ = new Switch.default($3, [], $6, @1.first_line, @1.last_column); }
            ;

caselist : caselist caso         { $$ = $1; $$.push($2); }
        | caso                   { $$ = new Array(); $$.push($1); }
        ;

caso : CASE e DSPNTS instrucciones  { $$ = new caso.default($2, $4, @1.first_line, @1.last_column); }
    ;

default : DEFAULT DSPNTS instrucciones { $$ = new caso.default(null, $3, @1.first_line, @1.last_column);}
        ;

funciones : tipo ID PARA lista_params PARC LLAVA instrucciones LLAVC { $$ = new funcion.default(2, $1, $2, $4, false, $7,  @1.first_line, @1.last_column); }
        | tipo ID PARA  PARC LLAVA instrucciones LLAVC               { $$ = new funcion.default(2, $1, $2, [], false, $6,  @1.first_line, @1.last_column); }
        | VOID ID PARA lista_params PARC LLAVA instrucciones LLAVC   { $$ = new funcion.default(3, $1, $2, $4, true, $7,  @1.first_line, @1.last_column); }
        | VOID ID PARA  PARC LLAVA instrucciones LLAVC               { $$ = new funcion.default(3, $1, $2, [], true, $6,  @1.first_line, @1.last_column); }
        ;

lista_params : lista_params COMA tipo ID          { $$ = $1; $$.push(new simbolo.default(6, $3, $4, null)); }
             | tipo ID                           { $$ = new Array(); $$.push(new simbolo.default(6, $1, $2, null)); }
             ;

llamada : ID PARA lista_vals PARC {$$ = new llamada.default($1, $3,@1.first_line, @1.last_column ); }
        | ID PARA  PARC           {$$ = new llamada.default($1, [] ,@1.first_line, @1.last_column ); }
        ; 

lista_vals : lista_vals COMA e          { $$ = $1; $$.push($3); }
        | e                             { $$ = new Array(); $$.push($1); }
        ; 

startwith :  START WITH  llamada PYC    { $$ = new startwith.default($3,@1.first_line, @1.last_column );}
        | START WITH llamada PYC  
        ;

e : e MAS e         { $$ = new aritmetica.default($1, '+', $3, @1.first_line, @1.last_column,false); }
    | e MENOS e      { $$ = new aritmetica.default($1, '-', $3, @1.first_line, @1.last_column,false); }
    | e MULTI e      { $$ = new aritmetica.default($1, '*', $3, @1.first_line, @1.last_column,false); }
    | e DIV e        { $$ = new aritmetica.default($1, '/', $3, @1.first_line, @1.last_column,false); }
    | e POT e        { $$ = new aritmetica.default($1, '^', $3, @1.first_line, @1.last_column,false); }
    | e MOD e        { $$ = new aritmetica.default($1, '%', $3, @1.first_line, @1.last_column,false); }
    | e MAYORIGUAL e  { $$ = new relacional.default($1, '>=', $3, @1.first_line, @1.last_column,false); }
    | e MAYORQUE e   { $$ = new relacional.default($1, '>', $3, @1.first_line, @1.last_column,false); }
    | e MENORIGUAL e { $$ = new relacional.default($1, '<=', $3, @1.first_line, @1.last_column,false); }
    | e MENORQUE e  { $$ = new relacional.default($1, '<', $3, @1.first_line, @1.last_column,false); }
    | e IGUALIGUAL e { $$ = new relacional.default($1, '==', $3, @1.first_line, @1.last_column,false); }
    | e DIFERENTE e  { $$ = new relacional.default($1, '!=', $3, @1.first_line, @1.last_column,false); }
    | e AND e       { $$ = new logica.default($1, '&&', $3, @1.first_line, @1.last_column,false); }
    | e OR e       { $$ = new logica.default($1, '||', $3, @1.first_line, @1.last_column,false); }
    | NOT e          { $$ = new logica.default($2, '!', null, @1.first_line, @1.last_column,true); }
    | MENOS e %prec UMINUS    { $$ = new aritmetica.default($2, 'UNARIO', null, @1.first_line, @1.last_column,true); }
    | PARA e PARC       { $$ = $2; }
    | DECIMAL           { $$ = new primitivo.default(Number($1), 'DOBLE', @1.first_line, @1.last_column); }
    | ENTERO            { $$ = new primitivo.default(Number($1), 'ENTERO', @1.first_line, @1.last_column); }
    | ID                { $$ = new identificador.default($1, @1.first_line, @1.last_column); }
    | CADENA            { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CADENA', @1.first_line, @1.last_column); }
    | CARACTER          { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CARACTER', @1.first_line, @1.last_column); }
    | TRUE              { $$ = new primitivo.default(true, 'BOOLEANO', @1.first_line, @1.last_column); }
    | FALSE             { $$ = new primitivo.default(false, 'BOOLEANO', @1.first_line, @1.last_column); }
    | e INTERROGACION e DSPNTS e { $$ = new ternario.default($1, $3, $5, @1.first_line, @1.last_column); }
    | ID INCRE          { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
    | ID DECRE          { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
    | llamada           { $$ = $1; } 
    | TYPEOF PARA e PARC {$$ = new tipoof.default($3, @1.first_line, @1.last_column ); }
    ;


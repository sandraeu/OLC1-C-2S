# Ejemplo practico
------
Para el siguiente archivo de entrada 

```
GenerarReporteEstadistico {
Compare("C:\\Entrada\\proyecto1","C:\\Entrada\\proyecto2");
}

```
Realizar:
+ Un analizador léxico y sintáctico que reconozca el archivo de entrada.
+ Comparar dos carpetas con archivos de javascript que reconozcan una lista de variables (como el ejemplo realizado en clase anterior). Se deben de comparar únicamente los archivos de los proyectos con el mismo nombre. 
+ Mostrar en consola las variables y comentarios repetidos en los proyectos.
+ Reportar los errores léxicos y sintácticos de los proyectos.

Salida esperada:

```
Variable repetida "carro" en archivos archivo2vars.js
Variable repetida "validacion" en archivos archivo2vars.js
Variable repetida "punteo2" en archivos archivo2vars.js
Comentario repetido "//este es un comentario" en archivos archivo2vars.js
Variable repetida "variable" en archivos variables.js
Variable repetida "compi1" en archivos variables.js

```

> Desarrollado en NetBeans 8.2
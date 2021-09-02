# Ejemplo práctico
------
Para el siguiente archivo de entrada 

```
GenerarReporteEstadistico{ 

    DefinirGlobales{
        string reporte1 = "Probabilidades esperadas para Variables archivo archivo2vars.js";
        double pe1 = 0; 
    } 

     GraficaBarras{
        Titulo: reporte1;
        Ejex: [ "punteo" ];
        Valores: [ pe1 ];
        Titulox: "Nombre de las variables";
        Tituloy: "Puntaje";
    }
}


```
Realizar:
+ Agregar a la gramática FCA producciones que reconozcan el archivo de entrada.
+ Guardar las variables globales y acceder a sus valores.


> Desarrollado en NetBeans 8.2
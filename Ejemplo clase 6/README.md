# Ejemplo practico
------
Para el siguiente archivo de entrada 

```
GenerarReporteEstadistico{
    GraficaBarras{
        Titulo: "Reporte1";
        Ejex: [ "Prob1" , "Prob2"];
        Valores: [ 0.8, 1.2 ];
        Titulox: "Atributos";
        Tituloy: "Probabilidades";
    }
}


```
Realizar:
+ Agregar a la gramática FCA producciones que reconozcan el archivo de entrada.
+ Generar una gráfica de barras con los atributos mencionados en el archivo de entrada.

Salida esperada:

![image](https://user-images.githubusercontent.com/45029403/130735664-904bf774-ab9c-4885-9e25-1fb1beca93c4.png)


> Desarrollado en NetBeans 8.2

> Se utilizo la libreria [JFreeChart](https://www.tutorialspoint.com/jfreechart/jfreechart_bar_chart.htm)
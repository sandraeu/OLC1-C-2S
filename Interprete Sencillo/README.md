# Interprete Sencillo 

### Herramientas 
- [NodeJs](https://nodejs.org/en/)
- [Jison](http://zaa.ch/jison/docs/)
- [CodeMirror](https://codemirror.net/)
---------

## Cliente
### Instalacion

Instalamos el editor de texto  
```
npm install codemirror
```

### Funcionalidades
- Área de texto para escribir el código de entrada. 
- Ejecución de código.
- Consola de salida.
- Cargar archivo de entrada. 
- Comunicación con API para obtener la salida del programa. 

---------

## Servidor 
### Instalacion

Instalamos todas las dependencias necesarias 
```
npm install 
```

Iniciamos el servidor el cual estara corriendo en el puerto 3000 del localhost.

```
npm start
``` 

---------

Actualmente tiene las siguientes funcionalidades, las cuales unicamente estan de referencia para saber como implementar, aún faltan agregar más validaciones.

#### Instrucciones
- Declaración de variables
- Asignación de variables
- Sentencia de control if 
- Sentencia ciclica while
- Funcion WriteLine
- Sentencia de transferencia Break

#### Expresiones
- Tipos primitivos (Entero, doble, caracter, cadena, booleano)
- Operaciones aritmeticas (suma) 
- Operaciones relacionales (menorque, igualque)
- Operaciones logicas (and, or, not)
- Ternario
- Identificador

#### Otras 
- Manejo de tabla de simbolos 
- Ast 
- Comentarios
- Manejo de errores semanticos 


> Para probar podemos utilizar el Cliente que se encuentra en este repo. 


# Interprete Sencillo 

### Herramientas 
- [NodeJs](https://nodejs.org/en/)
- [Jison](http://zaa.ch/jison/docs/)

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

Para probar podemos utilizar [postman](https://www.postman.com/) u otra herramienta para el testing de API REST.

```
Método: POST
Ruta: http://localhost:3000/api/ejecutar
Body(json):  { "input": "Evaluar[((-(1+1+1+1+1-5-10)+(4*3-5^3))+8200*3/10)*3]; Evaluar[5+true]; Evaluar[7+'A']; Evaluar[0+\"hola\"]; Evaluar[true + false]; Evaluar[18-13];  Evaluar[8*9+7^5];" }

```

El cuál nos retornara como resultado 

```
{
    "resultado": "El valor de la expresion es : 7071 \nEl valor de la expresion es : 6 \nEl valor de la expresion es : 72 \nEl valor de la expresion es : 0hola \nEl valor de la expresion es : ERROR \nEl valor de la expresion es : 5 \nEl valor de la expresion es : 16879 \n"
}
```
var express = require('express');
var socket = require('socket.io');
var App = require('./App');

// se crea el servidor
var expressServer = express();

// Se indica que el contenido de la carpeta public 
// va a ser accesible por el mundo
expressServer.use(express.static('public'));

// Se inicia el servidor en el puerto 3000
var server = expressServer.listen(3000, function(){
    console.log('corriendo en puerto 3000');
})

// Se crea el servidor
var io = socket(server);

// se inicializa la aplicación
var app = new App(io);
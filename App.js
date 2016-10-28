/**
 * La aplicación
 * 
 * es5 - es2015
 */

function App(io) {

    this.io = io;

    // se inicializa el arreglo de 
    this.clients = [];

    // se configuran los eventos que va a recibir o enviar la aplicación
    this.configureEvents();
}

App.prototype.configureEvents = function () {
    var klass = this;

    this.io.sockets.on('connection', function (socket) {
        // Cada vez que alguien nuevo se conecta
        klass.onNewClient(socket);

        // Los eventos del juego
        klass.onGameEvents(socket);

        // Cuando alguien se desconecta
        socket.on('disconnect', () => {
            klass.onClientDisconnection(socket);
        })
    });
}

App.prototype.onNewClient = function (socket) {
    console.log('new client', socket.id)

    // emit -> al cliente dueño del socket
    // socket.broadcast.emit -> le manda un dato a todos los otros
    socket.emit('hello', {
        id: socket.id
    });

    socket.broadcast.emit('newclient', {
        id: socket.id
    })
}

App.prototype.onClientDisconnection = function (socket) {
    console.log('goodbye from', socket.id)
}

App.prototype.onGameEvents = function (socket) {

    /**
     * {
     *  x: 
     *  y:
     * }
     */
    socket.on('userEvent', function (data) {
        socket.broadcast.emit(data.event, data);
    })
}


// Se exporta la clase como módulo
module.exports = App;
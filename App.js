/**
 * La aplicación
 */
class App {

    constructor(io){
        this.io = io;

        // se inicializa el arreglo de 
        this.clients = [];

        // se configuran los eventos que va a recibir o enviar la aplicación
        this.configureEvents();
    }

    configureEvents(){
        this.io.sockets.on('connection', (socket) => {
            // Cada vez que alguien nuevo se conecta
            this.onNewClient(socket);

            // Los eventos del juego
            this.onGameEvents(socket);

            // Cuando alguien se desconecta
            socket.on('disconnect', ()=>{
                this.onClientDisconnection(socket);
            })
        });
    }

    onNewClient(socket){
        console.log('new client', socket.id)

        socket.emit('hello', {
            id: socket.id
        });
    }

    onClientDisconnection(socket){
        console.log('goodbye from', socket.id)
    }

    onGameEvents(socket){

    }

}


// Se exporta la clase como módulo
module.exports = App;
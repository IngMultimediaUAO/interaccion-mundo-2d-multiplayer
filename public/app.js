var socket;

// Se ejecuta al inicio
function setup(){
    createCanvas(windowWidth,windowHeight);
    background(0);

    socket = io();

    socket.on('hello', function(data){
        console.log(data);
    });
}

// Se ejecuta cada frame
function draw(){

}
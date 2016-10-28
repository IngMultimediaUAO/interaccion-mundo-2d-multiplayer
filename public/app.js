var socket;
var me;
var c;
var others = [];

// Se ejecuta al inicio
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    socket = io();

    c = {
        r: random(255),
        g: random(255),
        b: random(255)
    };

    socket.on('hello', function (data) {
        me = data.id;
    });

    socket.on('paint', function (data) {
        fill(color(data.c.r, data.c.g, data.c.b));
        ellipse(data.x, data.y, 20);
    })

    socket.on('newclient', function (data) {
        console.log('nuevo cliente detectado', data.id);
        others.push(data.id);
    })
}

// Se ejecuta cada frame
function draw() {

}

// cada vez que se presiona el mouse y se arrastra
function mouseDragged() {
    fill(color(c.r, c.g, c.b)); // white
    ellipse(mouseX, mouseY, 20);


    socket.emit('userEvent', {
        x: mouseX,
        y: mouseY,
        c: c,
        event: 'paint'
    });

}
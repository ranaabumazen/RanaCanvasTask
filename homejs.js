
var canvas, ctx, flag = false,
    X1 = 0,//previous value of x
    X2 = 0,//current value of x
    Y1 = 0,//previous value of y
    Y2 = 0,//current value of y
    dot_flag = false;


var loginform;
var txtMsg;
var socketStatus;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        calculatexy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        calculatexy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        calculatexy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        calculatexy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
        case "pink":
            x = "pink";
            break;
        case "gray":
            x = "gray";
            break;
        case "lightgray":
            x = "lightgray";
            break;      
    }
        if (x == "white") y = 14;
         else y = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(X1, Y1);
    ctx.lineTo(X2, Y2);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}



function calculatexy(res, e) {
    if (res == 'down') {
        X1 = X2;
        Y1 = Y2;
        X2 = e.clientX - canvas.offsetLeft;
        Y2 = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(X2, Y2, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            X1 = X2;
            Y1 = Y2;
            X2 = e.clientX - canvas.offsetLeft;
            Y2 = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}


window.onload = function () {
    // get the references of the page elements.
    loginform = document.getElementById('Loginform');
    txtMsg = document.getElementById('username');
   



    const socket = new WebSocket('ws://echo.websocket.org');

    // Connection opened

    socket.addEventListener('open', function (event) {
        // socket.send('aya');
    });

    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
    socket.onerror = function (error) {
        console.log('WebSocket error: ' + error);
    };


    //function myfun() {
    //e.preventDefault();


    socket.onmessage = function (event) {
        var msg = event.data;
       
    };

    loginform.onsubmit = function (e) {
        e.preventDefault();
        
        // Recovering the message of the textarea.
        var msg = txtMsg.value;

        // Sending the msg via WebSocket.
        socket.send(msg);

      
        txtMsg.value = '';  // Cleaning up the field after sending.
        console.log(msg);
        document.getElementById('firstDiv').style.display = "none";
        document.getElementById('secondDiv').style.display = "block";
        document.getElementById('canvtitle').innerHTML += "<label>" + " " + msg + "</label>";
        document.getElementById('peersareaUser').innerHTML+=msg;
        init();


    };
};



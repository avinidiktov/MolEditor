var myCanvas = document.getElementById('canvas');
var ctx = myCanvas.getContext('2d');

var canvasWidth = 800;
var canvasHeight = 600;

var gridElem = [];

function drawGrid(){

    ctx.beginPath();

    for (var i = 40; i < canvasWidth; i+=40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasHeight);
    }

    for (var j = 40; j < canvasHeight; j+=40) {
        ctx.moveTo(0, j);
        ctx.lineTo(canvasWidth, j);
    }
    ctx.closePath();
    ctx.stroke();
}


function dividedCanvasOnGrid(){

    for (var i = 40; i < canvasWidth; i+=40) { // width
        for (var j = 40; j < canvasHeight; j+=40) {//height
            el = new Object();
            el.horiz = i;
            el.vert = j;
            gridElem.push(el);
        }
    }
}

function detectPosition(pointX, pointY){
    dividedCanvasOnGrid();

    var a = gridElem;

    alert(gridElem[100].horiz);
}



drawGrid();
detectPosition(0,0);

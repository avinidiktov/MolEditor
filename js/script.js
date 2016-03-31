var myCanvas = document.getElementById('canvas');
var ctx = myCanvas.getContext('2d');

var canvasWidth = 800;
var canvasHeight = 600;


var xPos = 0, yPos = 0;


var gridElem = [];

myCanvas.addEventListener("click",click);
function click(event){
    if (event.type == "click") {
        xPos = event.clientX;
        yPos = event.clientY - 56;

        console.log(xPos,yPos);
        detectPosition(xPos, yPos);

    }


}


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


function paintRect(x, y){

    console.log(x * 40, y * 40);

    ctx.fillRect(x*40,y*40, x+40, y+40);

}

function dividedCanvasOnGrid(){

    for (var i = 0; i < canvasHeight; i+=40) { //height 600
        for (var j = 0; j < canvasWidth; j+=40) {// width 800
            el = {};
            el.horiz = j;
            el.vert = i;
            gridElem.push(el);
        }
    }
}

function detectPosition(x, y){
    var moduloX = Math.floor(x / 40);
    var moduloY = Math.floor(y / 40);

    console.log(moduloX);
    console.log(moduloY);


    paintRect(moduloX, moduloY);
    //alert(gridElem.length);
}



drawGrid();
dividedCanvasOnGrid();

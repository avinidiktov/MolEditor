var atoms = document.getElementsByClassName('element-tool'); // from right panel
var periodictable = document.getElementsByClassName('pt-element'); // from periodictable modal

var store = ""; // store name of selected element


for (var i = 0; i < periodictable.length; i++) {
    periodictable[i].addEventListener('click', function(){
        store = this.getElementsByTagName('h4')[0].innerText;
        modal.style.display = "none";
        console.log(store);
    });
}

for (var i = 0; i < atoms.length; i++) {
    if (i != atoms.length-1) { // atoms.length-1  -  call periodic table
        atoms[i].addEventListener('click', function(){
            store = this.innerText;
            //this.setAttribute('class', "element-tool-selected");
            console.log(store);
        });
    }

}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var WIDTH;
var HEIGHT;
var interval = 80;

var xPos = 0, yPos = 0;

var field; // elements on grid
var elements = [];

// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

function Element() {
    this.name = ""; // name H,C ....
    this.bonds = 0; // number of bonds

    //size element on grid
    this.w = 1;
    this.h = 1;
    this.fill = '#000000';
}

//Initialize a new Element, add it
function addNewElement(n, b, w, h, fill) {
    var element = new Element();
    element.name = n;
    element.bonds = b;
    element.w = w;
    element.h = h;
    element.fill = fill; // for each groups elements
    field[h][w] = element;
    console.log(field[h][w]);
}


function matrixArray(columns, rows){ // matrix for grid
    var arr = new Array(rows);
    for(var i=0; i<arr.length; i++){
        arr[i] = new Array(columns);
    }
    return arr;
}



function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;





}

field = matrixArray(canvas.height/interval, canvas.height/interval);

function initField (){
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            field[i][j] = new Element();
        }
    }
}
initField();

canvas.addEventListener("click",click);
function click(event){
    if (event.type == "click") {
        xPos = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        yPos = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

        xPos -= canvas.offsetLeft;
        yPos -= canvas.offsetTop;
        console.log(xPos,yPos);
        detectPosition(xPos, yPos);

    }

}


function drawGrid(){

    ctx.beginPath();

    for (var i = 0; i <= WIDTH; i += interval) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, HEIGHT);
    }

    for (var j = 0; j <= HEIGHT; j += interval) {
        ctx.moveTo(0, j);
        ctx.lineTo(WIDTH, j);
    }
    ctx.closePath();
    ctx.stroke();
}

function detectPosition(x, y){
    var moduloX = Math.floor(x / interval);
    var moduloY = Math.floor(y / interval);

    console.log(moduloX);
    console.log(moduloY);
    console.log(store);

    paintSymbols(store, moduloX, moduloY);
    //paintRect(moduloX, moduloY);
    //alert(gridElem.length);
}

function paintRect(x, y){
    console.log(x * interval, y * interval);
    ctx.beginPath();
    ctx.fillRect(x*interval,y*interval, interval, interval);

}

function paintSymbols(symbol, x, y){
    var marginTop = 15;
    var marginLeft = 10;
    ctx.textBaseline = "top";
    ctx.font = "50px Arial";
    ctx.fillText(symbol, x*interval+marginLeft,y*interval+marginTop);
    addNewElement(symbol, 0, x, y, '#000000');
    //store = "";
}
init();
drawGrid();

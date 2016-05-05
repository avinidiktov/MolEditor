var atoms = document.getElementsByClassName('element-tool'); // from right panel
var periodictable = document.getElementsByClassName('pt-element'); // from periodictable modal

var store = ""; // store name of selected element


for (var i = 0; i < periodictable.length; i++) {
    periodictable[i].addEventListener('click', function () {
        store = this.getElementsByTagName('h4')[0].innerText;
        modal.style.display = "none";
        console.log(store);
    });
}

for (var i = 0; i < atoms.length; i++) {
    if (i != atoms.length - 1) { // atoms.length-1  -  call periodic table
        atoms[i].addEventListener('click', function () {
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

// it's bonds for test, "Br" and "I" is not fully
var covalentBonds = new Map([["H",1],["F",1],["Li",1],["Na",1],["K",1],
                    ["O",2],["Ca",2],["Mg",2],
                    ["B",3],["Al",3],
                    ["C",4],["Si",4],
                    ["N",5],["P",5],["Br",5],
                    ["S",6],
                    ["F",7],["Cl",7],["I",7]]);

function Element() {
    this.name = ""; // name H,C ....
    this.bonds = 0; // number of bonds

    //size element on grid
    this.w = 0;
    this.h = 0;
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

function matrixArray(columns, rows) {
    var arr = new Array(rows);
    for (var i = 0; i < arr.length; i++) {
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

field = matrixArray(canvas.height / interval, canvas.height / interval);

function initField() {
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            field[i][j] = new Element();
        }
    }
}


canvas.addEventListener("click", click);
function click(event) {
    if (event.type == "click") {
        xPos = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        yPos = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

        xPos -= canvas.offsetLeft;
        yPos -= canvas.offsetTop;
        console.log(xPos, yPos);
        detectPosition(xPos, yPos);

    }

}

function drawGrid() {

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

function detectPosition(x, y) {
    var moduloX = Math.floor(x / interval);
    var moduloY = Math.floor(y / interval);

    console.log(moduloX);
    console.log(moduloY);
    console.log(store);


    var bonds = covalentBonds.get(store);
    addNewElement(store, bonds, moduloX, moduloY, '#000000');
    drawCanvas();

}

function drawElements() {
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            var marginTop = 15;
            var marginLeft = 10;
            ctx.textBaseline = "top";
            ctx.font = "50px Arial";
            ctx.fillText(field[i][j].name, field[i][j].w * interval + marginLeft, field[i][j].h * interval + marginTop);
        }
    }
}

function drawCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear canvas
    drawGrid();
    drawElements();
    drawBonds();
}






function drawBonds(){

}

function validBonds(y, x, bonds){

}

function paintRect(x, y) {
    console.log(x * interval, y * interval);
    ctx.beginPath();
    ctx.fillRect(x * interval, y * interval, interval, interval);

}





init();
initField();
drawGrid();



/*test
function drawCH4() {
    addNewElement("O", 0, 3, 3, '#000000');
    addNewElement("H", 0, 2, 3, '#000000');
    addNewElement("H", 0, 4, 3, '#000000');
    //addNewElement("H", 0, 3, 2, '#000000');
    //addNewElement("H", 0, 3, 4, '#000000');

    drawElements();


    ctx.beginPath();
    ctx.moveTo(field[3][4].w * interval - 10, field[3][4].h * interval + interval / 2);
    ctx.lineTo(field[3][4].w * interval + 10, field[3][4].h * interval + interval / 2);
    ctx.lineWidth = 3;
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(field[3][3].w * interval - 10, field[3][3].h * interval + interval / 2);
    ctx.lineTo(field[3][3].w * interval + 10, field[3][3].h * interval + interval / 2);
    ctx.lineWidth = 3;
    ctx.stroke();

    /*
    ctx.beginPath();
    ctx.moveTo(field[3][3].w*interval+interval/2,field[3][3].h*interval+10);
    ctx.lineTo(field[3][3].w*interval+interval/2,field[3][3].h*interval-10);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(field[4][3].w*interval+interval/2,field[4][3].h*interval+10);
    ctx.lineTo(field[4][3].w*interval+interval/2,field[4][3].h*interval-10);
    ctx.lineWidth = 3;
    ctx.stroke();

}

drawCH4();
*/

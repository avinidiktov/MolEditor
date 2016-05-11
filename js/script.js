var atoms = document.getElementsByClassName('element-tool'); // from right panel
var periodictable = document.getElementsByClassName('pt-element'); // from periodictable modal


function State(){
    this.name ="";
    this.countClick = 0;
    this.first = 0;
    this.second = 0;

    this.Clear = function(){
        this.name = "";
        this.countClick = 0;
        this.first = 0;
        this.second = 0;
    };
    //state params
}


var state = new State();



var store = ""; // store name of selected element


for (var i = 0; i < periodictable.length; i++) {
    periodictable[i].addEventListener('click', function () {
        store = this.getElementsByTagName('h4')[0].innerText;
        modal.style.display = "none";
        state.name = "atom";
        console.log(store);
    });
}

for (var i = 0; i < atoms.length; i++) {
    if (i != atoms.length - 1) { // atoms.length-1  -  call periodic table
        atoms[i].addEventListener('click', function () {
            store = this.innerText;
            state.name = "atom";
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
var padding = interval/5;

var positionOnGrid = 0;

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

    //position element on grid
    this.w = 0;
    this.h = 0;
    //this.fill = '#000000';
}

//Initialize a new Element, add it
function addNewElement(n, b, w, h, fill) {
    var element = new Element();
    element.name = n;
    element.bonds = b;
    element.w = w;
    element.h = h;
    element.fill = fill; // for each groups elements
    field[w][h] = element;
    console.log(field[w][h]);
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



function initField() {
    field = matrixArray(canvas.width / interval, canvas.height / interval);
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            field[i][j] = new Element();
        }
    }
}



function getMousePos(evt, canvas){
    return {
        x: evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft,
        y: evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop
    };
}

canvas.addEventListener("click", click);

function click(event) {
    if (event.type == "click") {

        var mousePos = getMousePos(event, canvas);
        var positionOnGrid = detectPosition(mousePos);

        switch (state.name) {
            case 'atom':
                var bonds = covalentBonds.get(store);
                addNewElement(store, bonds, positionOnGrid.x, positionOnGrid.y, '#000000');
                drawCanvas();
                break;
            case 'bond':
                state.countClick +=1;
                if (state.countClick === 1) {
                    state.first = positionOnGrid;
                } else {
                    state.second = positionOnGrid;
                    if (state.first === state.second) {
                        state.Clear();
                        break;
                    }
                    addNewBond(state.first.x,state.first.y, state.second.x, state.second.y);
                    state.Clear();
                }

                break;
            default:
                break;

        }

    }

}

canvas.addEventListener("mousemove",mousemove);

function mousemove(event){
    if (event.type == "mousemove") {

        var mousePos = getMousePos(event, canvas);


        positionOnGrid = detectPosition(mousePos);
        drawCanvas();

    }
}

canvas.addEventListener("wheel", onWheel);


function zoomField(delta, newField){
    console.log(newField.length);
    if (delta < 0) {
        for(var i = 0; i <field.length; i++){
            for(var j =0; j<field[i].length; j++){
                field[i][j] = newField[i][j];
            }
        }
    }

    if (delta>0) {
        for( var k = 0; k <newField.length; k++){
            for(l =0; l<newField[k].length; l++){
                field[k][l] = newField[k][l];
            }
        }
    }


}


function onWheel(event){
    if (event.type == "wheel") {

        var delta = event.deltaY;

        if ((delta <0 && interval === 56) || (delta >0 && interval === 140)) {
            interval = 80;
        }
        else {
            if (delta < 0) { // zoom +
                interval = 140;
            }
            if (delta > 0) { // zoom -
                interval = 56;
            }
        }
        var newField = field;
        initField();
        zoomField(delta, newField);
        drawCanvas();



        //console.log(event.deltaY);
        //console.log(interval);

    }
}




function drawCirlce(centerX, centerY, style){
    var radius = interval/8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 0;
    ctx.fillStyle = style;
    ctx.globalAlpha = 0.5;
    ctx.fill();
}

function backLightCircles(pos){
    //console.log(pos.x);
    //console.log(pos.y);
    if (field[pos.x][pos.y].name) {

        var x = pos.x*interval;
        var y= pos.y*interval;

        drawCirlce(x+ padding, y+ interval/2, '#0D47A1');
        drawCirlce(x+ interval/2, y+ padding);
        drawCirlce(x+ interval - padding, y+ interval/2, '#0D47A1');
        drawCirlce(x+ interval/2, y+ interval - padding, '#0D47A1');

    }
}


function drawGrid() {

    ctx.beginPath();
    ctx.lineWidth = 1;
    for (var i = 0; i <= WIDTH; i += interval) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, HEIGHT);
    }

    for (var j = 0; j <= HEIGHT; j += interval) {
        ctx.moveTo(0, j);
        ctx.lineTo(WIDTH, j);
    }
    ctx.globalAlpha = 1;
    ctx.closePath();
    ctx.stroke();
}

function detectPosition(mousePos) {
    var moduloX = Math.floor(mousePos.x / interval);
    var moduloY = Math.floor(mousePos.y / interval);

    return {
        x: moduloX,
        y: moduloY
    };
}


function drawElements() {
    for (var i = 0; i < WIDTH/interval; i++) {
        for (var j = 0; j < HEIGHT/interval; j++) {
            var marginTop = 20;
            var marginLeft = 20;
            ctx.textBaseline = "top";
            ctx.font = "40px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(field[i][j].name, field[i][j].w * interval + marginLeft, field[i][j].h * interval + marginTop);
            ctx.globalAlpha = 1;

        }
    }
}

function drawCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear canvas
    drawGrid();
    drawElements();
    drawBonds();
    backLightCircles(positionOnGrid);

}

/*

function paintRect(x, y) {
    console.log(x * interval, y * interval);
    ctx.beginPath();
    ctx.fillRect(x * interval, y * interval, interval, interval);

}
*/


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

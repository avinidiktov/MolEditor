/*modal
http://www.w3schools.com/howto/howto_css_modals.asp
*/
var modal = document.getElementById('modal-periodictable');
var showPerTable = document.getElementById("button-periodictable");

var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
showPerTable.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function() {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

var atoms = document.getElementsByClassName('element-tool'); // from right panel
var periodictable = document.getElementsByClassName('pt-element'); // from periodictable modal

for (var i = 0; i < periodictable.length; i++) {
    periodictable[i].addEventListener('click', function(){
        console.log(this.getElementsByTagName('h4')[0].innerText);
    });
}

for (var i = 0; i < atoms.length; i++) {
    /*
    atom[i].addEventListener('click', (function(i){
        return function(){
            var name = this.innerText;
            console.log(name);
        };
    })(i), false);
    */
    atoms[i].addEventListener('click', function(){
        console.log(this.innerText);
    });
}







var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var WIDTH;
var HEIGHT;
var interval = 80;

var xPos = 0, yPos = 0;

var elementsOnGrid = [];
var elements = [];

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

    elements.push(element);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

}

canvas.addEventListener("click",click);
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

    for (var i = interval; i <= WIDTH; i += interval) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, HEIGHT);
    }

    for (var j = interval; j <= HEIGHT; j += interval) {
        ctx.moveTo(0, j);
        ctx.lineTo(WIDTH, j);
    }
    ctx.closePath();
    ctx.stroke();
}


function paintRect(x, y){

    console.log(x * interval, y * interval);
    ctx.beginPath();
    ctx.fillRect(x*interval,y*interval, interval, interval);

}

function dividedCanvasOnGrid(){

    for (var i = interval; i < HEIGHT; i += interval) { //height 600
        for (var j = interval; j < WIDTH; j += interval) {// width 800
            el = {};
            el.horiz = j;
            el.vert = i;

            elementsOnGrid.push(el);
        }
    }
}

function detectPosition(x, y){
    var moduloX = Math.floor(x / interval);
    var moduloY = Math.floor(y / interval);

    console.log(moduloX);
    console.log(moduloY);


    paintRect(moduloX, moduloY);
    //alert(gridElem.length);
}
init();
drawGrid();
dividedCanvasOnGrid();

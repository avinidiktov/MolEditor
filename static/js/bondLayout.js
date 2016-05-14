var Bonds = [];
var typeBond = "";


function Bond (){
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.type = ""; // single, double or triple
    this.backlightPadding = 5;
    //this.Element1 = new Element();
    //this.Element2 = new Element();
}


//var toolButton = document.getElementsByClassName('tool-button');
var singleBond = document.getElementById('single-bond');
var doubleBond = document.getElementById('double-bond');
var tripleBond = document.getElementById('triple-bond');

/*
for (var i = 0; i < toolButton.length; i++) {
    toolButton[i].addEventListener('click', clickOnToolButton);
}

function clickOnToolButton(){
    console.log(x);
}
*/
singleBond.addEventListener('click', clickOnBond);
doubleBond.addEventListener('click', clickOnBond);
tripleBond.addEventListener('click', clickOnBond);

function clickOnBond(){
    state.name = "bond";
    typeBond = this.title;
}

function addNewBond(x1, y1, x2, y2){
    var bond = new Bond();
    bond.x1 = x1;
    bond.y1 = y1;
    bond.x2 = x2;
    bond.y2 = y2;
    bond.type = typeBond; // test

    if (!detectedCollisionBonds(bond) && detectedElements(x1, y1, x2, y2)) {
        //add detected covalent bonds

        Bonds.push(bond);
    }



}

function detectedElements(x1, y1, x2, y2) {
    function detectedNeigbor(x1, y1, x2, y2) {
        if ((x1 === x2+1 && y1 === y2) || (x1 === x2 && y1 === y2 +1) || (x1 === x2-1 && y1 === y2) ||
         (x1 === x2 && y1 === y2 -1)) { // left top right bottom
            return true;
        }
        return false;
    }

    if (field[x1][y1].name && field[x2][y2].name && detectedNeigbor(x1, y1, x2, y2)) {
        return true;
    }
    return false;
}

function detectedCollisionBonds(bond){
    function collision(pointX1, pointX2, pointY1, pointY2) {
        if (pointX1 === pointX2 && pointY1 === pointY2) {
            return true;
        }
        return false;
    }


    for (var i = 0; i < Bonds.length; i++) {
        if ((collision(Bonds[i].x1, bond.x1, Bonds[i].y1, bond.y1) &&
         collision(Bonds[i].x2, bond.x2, Bonds[i].y2, bond.y2)) ||
         ( collision(Bonds[i].x1, bond.x2, Bonds[i].y1, bond.y2) &&
         collision(Bonds[i].x2, bond.x1, Bonds[i].y2, bond.y1))  ) {

            Bonds[i] = bond;
            return true;
        }

    }
    return false;
}

var orientation = true; // true - horizontal or false - vertical (for course padding x or y )


function drawBonds(){
    if (Bonds.length !== 0) {
        for (var i = 0; i < Bonds.length; i++) {

            var i1 = Bonds[i].x1, i2 = Bonds[i].x2, j1 = Bonds[i].y1, j2 = Bonds[i].y2;
            if (field[i1][j1].name && field[i2][j2].name) {
                drawSingleOrDoubleOrTripleBond(Bonds[i]);
            }
            else {
                Bonds.splice(i,1);
            }
        }
    }
}

function drawSingleOrDoubleOrTripleBond(bond) {
    function selectedTypeDrawLine() {
        switch (bond.type) {
            case "Single bond":
                drawSingleLine(this.x1, this.y1, this.x2, this.y2);
                break;
            case "Double bond":
                drawDoubleLine(this.x1, this.y1, this.x2, this.y2);
                break;
            case "Triple bond":
                drawTripleLine(this.x1, this.y1, this.x2, this.y2);
                break;
            default:
                break;
        }
    }



    if (bond.x1 > bond.x2) { // it's left bond
        x1 = bond.x1 * interval + padding;
        y1 = bond.y1 * interval + interval / 2;

        x2 = bond.x2 * interval + interval - padding;
        y2 = y1;
        orientation = false;
        selectedTypeDrawLine();
        return;
    }

    if (bond.x1 < bond.x2) { // it's right bond
        x1 = bond.x1 * interval + interval - padding;
        y1 = bond.y1 * interval + interval / 2;

        x2 = bond.x2 * interval + padding;
        y2 = y1;

        orientation = false;
        selectedTypeDrawLine();

        return;
    }

    if (bond.y1 > bond.y2) { // it's top bond
        x1 = bond.x1 * interval + interval / 2;
        y1 = bond.y1 * interval + padding;

        x2 = x1;
        y2 = bond.y2 * interval + interval - padding;
        orientation = true;
        selectedTypeDrawLine();
        return;
    }

    if (bond.y1 < bond.y2) { // it's bottom bond
        x1 = bond.x1 * interval + interval / 2;
        y1 = bond.y1 * interval + interval - padding;

        x2 = x1;
        y2 = bond.y2 * interval + padding;
        orientation = true;
        selectedTypeDrawLine();
        return;
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.globalAlpha = 1;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();


    drawCirlce(x1, y1, '#F44336');
    drawCirlce(x2, y2, '#F44336');
}


function drawSingleLine(x1, y1, x2, y2){
    drawLine(x1, y1, x2, y2);


}



function drawDoubleLine(x1, y1, x2, y2) {
    var gap = interval / 10;
    if (!orientation) {
        drawLine(x1, y1, x2, y2);
        drawLine(x1, y1 + gap, x2, y2 + gap);
    }
    else {
        drawLine(x1, y1, x2, y2);
        drawLine(x1 + gap, y1, x2 + gap, y2);
    }


}

function drawTripleLine(x1, y1, x2, y2) {
    var gap = interval / 10;
    if (!orientation) {
        drawLine(x1, y1 - gap, x2, y2 - gap);
        drawLine(x1, y1, x2, y2);
        drawLine(x1, y1 + gap, x2, y2 + gap);


    }
    else {
        drawLine(x1 - gap, y1, x2 - gap, y2);
        drawLine(x1, y1, x2, y2);
        drawLine(x1 + gap, y1, x2 + gap, y2);

    }

}

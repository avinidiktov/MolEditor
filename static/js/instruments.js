/* clear all */
var clear = document.getElementById('clear');

clear.addEventListener('click', clearAll);

function clearAll() {
    initField();
    Bonds.splice(0, Bonds.length);
    drawCanvas();

}

/*Erase
selected item
undo
redo
import from json*/


/*Export in json*/
var save = document.getElementById('file-export');

save.addEventListener('click', saveJson);

function saveJson() {
    function savedObject() {
        this.f =null;
        this.b = [];
    }
    function addNewSavedObject(f, b){
        var object = new savedObject();
        object.f = f;
        object.b = b;
        return object;
    }

    var json = JSON.stringify(addNewSavedObject(field, Bonds), null, '\t');
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.style = "display: none";
    a.download    = "field.json";
    a.href        = url;
    a.textContent = "Download .json";
    a.click();
    window.URL.revokeObjectURL(url); //??


}

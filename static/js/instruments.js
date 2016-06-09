/* clear all */
var clear = document.getElementById('clear');

clear.addEventListener('click', function () {
    initField();
    Bonds.splice(0, Bonds.length);
    drawCanvas();
    counterElements = 0;

});



/*Erase
selected item
undo
redo*/



var json;
function JSONObject() {
    this.f =null;
    this.b = [];
    this.i = 0;
    this.fs = 0;
}



/*Export in json*/

var save = document.getElementById('file-export');

save.addEventListener('click', function () {
    function addNewJSONObject(f, b, i, fs){
        var object = new JSONObject();
        object.f = f;
        object.b = b;
        object.i = i;
        object.fs = fs;
        return object;
    }
    json = JSON.stringify(addNewJSONObject(field, Bonds, interval, fontSize), null, '\t');
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.style = "display: none";
    a.download = "field.json";
    a.href = url;
    a.textContent = "Download .json";
    a.click();
    window.URL.revokeObjectURL(url); //Call this method when you've finished using a object URL

});



/*Import from json*/
var modalForm = document.getElementById('modal-upload-form');
var showForm = document.getElementById('file-import');
var close = document.getElementsByClassName('close')[1];



showForm.addEventListener('click', function(event) {
    modalForm.style.display = "block";
});


close.onclick = function() {
    modalForm.style.display = "none";
};

var form = document.querySelector('form');

form.addEventListener('submit', function(event){
    event.preventDefault();

    var reader = new FileReader();
    var file = event.target.file.files[0];

    json = new JSONObject();
    if (file) {
        reader.onload = (function (theFile) {
            return function (e) {
                json = JSON.parse(e.target.result);
                interval = json.i;
                initField();
                fontSize = json.fs;
                field = json.f;
                Bonds = json.b;
                console.log(json);
            };
        })(file);
        reader.readAsText(file);
    }


    close.click();


    /* for send file to server
    event.preventDefault();
    fetch('/json', {
      method: 'POST',
      body: new FormData(form)
    });
    */

});

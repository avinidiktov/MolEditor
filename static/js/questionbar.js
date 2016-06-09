var next = document.getElementById('next-button');
var back = document.getElementById('back-button');
var checkAnswer = document.getElementById('check-answer');


var taskTitle = document.getElementById('task');
console.log(taskTitle);


var taskIndex = 0;

function getTitleTask() {
    var title = "";

    fetch('/tasks/'+taskIndex)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        //get name of task
        console.log('parsed json', json);
        title = json.task;
        console.log(title);
        taskTitle.innerHTML = "<h1>"+title+"</h1>";

    }).catch(function(ex) {
        console.log('parsing failed', ex);
    });
}

next.addEventListener('click', function () {
    taskIndex = 1; //for test
    getTitleTask();
});

back.addEventListener('click', function () {
    taskIndex = 0; //for test
    getTitleTask();
});


checkAnswer.addEventListener('click', function () {
    switch (taskIndex) {
        case 0:
            testValue = convertToSMILES();
            if (testValue) {
                fetch("/checked/"+testValue)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log('parsed json', json);
                    isFinded = json.isFinded;
                    console.log(isFinded);
                    if (isFinded === "true") {
                        alert("Правильно!");
                    }
                    else {
                        alert("Не правильно!");
                    }


                }).catch(function(ex) {
                    console.log('parsing failed', ex);
                });
            }
            else {
                alert("Поле пустое!");
            }
            break;
        case 1:
            testValue = convertToSMILES();
            if (testValue) {
                fetch("/checked/"+testValue)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log('parsed json', json);
                    isFinded = json.isFinded;
                    console.log(isFinded);
                    if (isFinded === "true") {
                        alert("Правильно!");
                    }
                    else {
                        alert("Не правильно!");
                    }


                }).catch(function(ex) {
                    console.log('parsing failed', ex);
                });
            }
            else {
                alert("Поле пустое!");
            }
            break;
        default:
            break;

    }
});

var SMILES = "";


var counter = 0;




function convertToSMILES() {
    function inSquareBrackets(str) {
        return "[" + str + "]";
    }

    function inRoundBrackets(str) {
        return "(" + str + ")";
    }


    function checkBonds(element) { // traversal of tree from "element"
        for (var k = 0; k < Bonds.length; k++) {
            if ((Bonds[k].x1 === element.w && Bonds[k].y1 === element.h) ||
                (Bonds[k].x2 === element.w && Bonds[k].y2 === element.h) && !Bonds[k].isChecked) {
                Bonds[k].isChecked = true;

                var i = 0, j = 0;
                if (Bonds[k].type ===2) {
                    SMILES += "=";
                }
                else {
                    if (Bonds[k].type === 3) {
                        SMILES += "#";
                    }
                }


                if (Bonds[k].x1 === element.w && Bonds[k].y1 === element.h) {
                    i = Bonds[k].x2;
                    j = Bonds[k].y2;
                }
                else {
                    i = Bonds[k].x1;
                    j = Bonds[k].y1;
                }

                if (field[i][j].name != "H") {
                    SMILES += inSquareBrackets(field[i][j].name);
                    checkBonds(field[i][j]);
                    counter++;
                    console.log(counter);
                }


            }
        }

    }

    SMILES = "";

    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j].name && field[i][j].name != 'H') {
                SMILES += inSquareBrackets(field[i][j].name);

                console.log(counter);
                checkBonds(field[i][j]);
                console.log(SMILES);
                return SMILES;
            }
        }
    }

}

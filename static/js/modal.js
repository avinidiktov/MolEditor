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
    if (event.target == modalForm) {
        modalForm.style.display = "none";
    }
    
};

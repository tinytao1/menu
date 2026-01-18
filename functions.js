// console.log('okay here');

function resetWithConfirmation() {
  if (confirm("Click OK to erase this form and start over.\nClick Cancel (or press Esc) to cancel this action.")) {
    // Proceed with the action, e.g., redirect to a deletion script
    // myFormEl.reset();
  } else {
    // Do nothing or provide feedback that the action was cancelled
    alert("Action cancelled.");
  }
}


function toggleDoubleOrderWithArray()
  { for (let i = 0; i < allDoubleOrderCheckboxes.length; i++) 
          {allDoubleOrderCheckboxes[i].classList.toggle("double-order");
          }
  }

function toggleDisplayValueOfDoubleOrderButton() {
  let doubleButtonEl = document.getElementById('doubleButton');
  if (doubleButtonEl.value == '2X Order') {doubleButtonEl.value = `  \u27F2 1X  `} // string literal keeps button approx same size
  else {doubleButtonEl.value="2X Order"}  //  Unicode escape sequence \u27F2 or \u21A9
}

function doubleOrderClick() {
  toggleDoubleOrderWithArray();
  toggleDisplayValueOfDoubleOrderButton();
}

function uncheckAll() {
  for (const id of allCheckboxes) {
  id.checked = false;
  }
}
function myReload () { location.reload(); }  // reloads the current page from chache

function myAlert5() {alert(5);}

/* TESTS
  // Extremely Painful Test History for:  toggleDoubleOrderWithArray()
  // function toggleDoubleOrderWithArray() {
  //testArray[i].classList.toggle("double-order");
  //testArray[i].checked=true;
  // console.log(testArray[i]);
  //for (let i = 0; i < testArray.length; i++) {
  //console.log(testArray[i]); // }
  //element.r1cb1.checked=true;
  //console.log(67);
  //element.elId.classList.toggle("double-order");
  //document.getElementById('elId')style.visibility=hidden; //("double-order");
  //elid = 
  //element.elid.classList.toggle("double-order");
  //console.log(element);
function toggleDoubleOrder() {  //  Feature: needs to collect selected state and maintain it btw toggling
  element.r1cb4.classList.toggle("double-order");
  element.r1cb5.classList.toggle("double-order");
  element.r1cb6.classList.toggle("double-order");
  element.r2cb4.classList.toggle("double-order");
  element.r2cb5.classList.toggle("double-order");
  element.r2cb6.classList.toggle("double-order");
}
function toggleDoubleOrder2 () {  //  Function is Not Working at this time :(
  for (const id of allDoubleOrderCheckboxes) {
  element.id.classList.toggle("double-order");
}}  

*/


function uncheckAll() {
  for (const id of allCheckboxes) {
  id.checked = false;
}}
//  function uncheckAll (checkboxId) { checkboxId.checked = true; }

function toggleDoubleSingleButton() {
  let doubleButtonEl = document.getElementById('doubleButton');
  if (doubleButtonEl.value == '2X order') {doubleButtonEl.value="return to 1X order"}
  else {doubleButtonEl.value="2X order"}
}

function myReload () { location.reload(); }  // reloads the current page from chache

function myAlert5() {alert(5);}

function toggleDoubleOrder() {
  element.r1cb4.classList.toggle("double-order");
  element.r1cb5.classList.toggle("double-order");
  element.r1cb6.classList.toggle("double-order");
  element.r2cb4.classList.toggle("double-order");
  element.r2cb5.classList.toggle("double-order");
  element.r2cb6.classList.toggle("double-order");
}
// SECTION 1 FUNCTIONS.JS file

function displayCountPrototype() {
  this.displayEl.innerHTML = Number(this.count) ;
  //this.displayEl.innerHTML = this.count; //document.getElementById("d1").innerHTML = 7;////alert(s1.name) //890);
}

function displaySectionCount() {
  this.title.innerHTML = this.name + " count: " + this.count;
}

function disableAllButtons() {
  item1.buttonEl.disabled = true;
  item2.buttonEl.disabled = true;
  item3.buttonEl.disabled = true;
  item4.buttonEl.disabled = true;
  //disabled = true;
  //disabled = true;
  //disabled = true;
  //disabled = true;
}  // enableAllButtons close


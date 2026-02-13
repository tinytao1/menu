 NOTES.JS file


//s1.item1.displayCount();
//document.write(s1.item1.count);
//s1.item1.displayCount(s1); // Display item1 count on page
function displayCountPrototype(section) {
  section.item1.displayEl.innerHTML = section.item1.count;
  //this.displayEl.innerHTML = this.count; //document.getElementById("d1").innerHTML = 7;////alert(s1.name) //890);
}
//  s1.item1.displayCount(s1); // Display item1 count on page
//  disableAllButtons();
//  s1.item1.buttonEl.disabled = true;
//  s1.enableAllButtons();

function enableAllButtons() {
  [s1.item1, s1.item2, s1.item3, s1.item4, s1.item5, s1.item6, s1.item7, s1.item8]
    .forEach(item => item.buttonEl.disabled = true);
}

  enableAllButtons : function() {
  
  [this.item1.buttonEl, this.item2.buttonEl, this.item3.buttonEl, this.item4.buttonEl, this.item5.buttonEl, this.item6.buttonEl, this.item7.buttonEl, this.item8.buttonEl ]
  
  .forEach(item => disabled = true);
  
  },
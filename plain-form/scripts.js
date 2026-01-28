'use strict'

const s1 = {
  limit: 2,
  count: null,
  selectedItems: [],
  // OR include all to start, then remove each as they are selected.
  nonSelectedItems: [],
  
  item1: {
    name: "Tilapia",
    count: null,
    otherItemButtonEls: [document.getElementById('s1-item2'),], 
    // s1.item1.el.   is a button
    buttonEl: document.getElementById('s1-item1'),
    // s1.item1.displayCount.   is a span
    displayCountEl: document.getElementById('s1-item1-display-count'),
    // s1.item1.add1();
    add1: function() {
                if (s1.count == s1.limit) {
                  s1.count = s1.count - this.count;
                  this.count = 0;
                  this.hideCount();
                  // enable non-selected items
                  document.getElementById('s1-item2').disabled=false;
                } else {
                ++this.count;
                ++s1.count;
                this.showCount();
                if (s1.count == s1.limit) {
                  // disable non-selected items
                  document.getElementById('s1-item2').disabled=true;
                  }
                }
              },
    // s1.item1.hideCount()
    hideCount: function() {
                this.displayCountEl.style.visibility='hidden';
              },
    // s1.item1.showCount()          
    showCount: function() {
                this.displayCountEl.innerHTML = this.count;
                this.displayCountEl.style.visibility='visible';
              },
    },
  };

s1.item1.buttonEl.
  addEventListener('click', function() { 
                              s1.item1.add1(); // hideTheCountDisplay();
                              console.log( s1.item1.name + " count is: " + s1.item1.count ); // alert( s1.item1.count); 
                              console.log( "Section 1 count: " + s1.count);
                              }
                  );

document.getElementById('hide').
  addEventListener('click', function() { 
                              s1.item1.hideCount() // hideTheCountDisplay();
                              }
                            );

document.getElementById('show').
  addEventListener('click', function() { 
                              s1.item1.showCount(); //showTheCountDisplay();
                              }
                            );
                            
function hideTheCountDisplay() {
s1.item1.displayCount.style.display='none';
}
function showTheCountDisplay() {
s1.item1.displayCount.style.display='inline';
}

// s1.item1.el.textContent=5; /* textContent to change the visible label, not value which is primarily for database submission value */
// document.getElementById('s1-item1').textContent=6;




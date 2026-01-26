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
    selected: false,
    select: function() {
      this.selected = true;
      this.add1();
    },
    deselect: function() {
      this.selected = false;
    }, 
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
                  this.deselect();
                  enableNonselectedItemButtons();
                } else {
                ++this.count;
                ++s1.count;
                this.showCount();
                if (s1.count == s1.limit) {
                  disableNonselectedItemButtons();
                  }
                }
              },
    // s1.item1.hideCount()
    hideCount: function() {
                this.displayCountEl.style.display='none';
              },
    // s1.item1.showCount()          
    showCount: function() {
                this.displayCountEl.innerHTML = this.count;
                this.displayCountEl.style.display='inline';
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

function disableNonselectedItemButtons() {
  // replace this with a loop that disables items 
  // set to selected = false.
  document.getElementById('s1-item2').disabled=true;
}

function enableNonselectedItemButtons() {
  // replace this with a loop that enables items 
  // set to selected = false.
  document.getElementById('s1-item2').disabled=false;
}

document.getElementById('s1-item2').disabled=false;

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




const item1 = {  /////////////////////////////

  name : "Tilapia",
  selected : false,
  count : null,

  limit : null,
  button : document.getElementById("b1"),
  countEl : document.getElementById("d1"),

  select2 : function() {this.count++; this.countEl.innerHTML= Number(item1.count)},
  select() {
    
    item1.count++; //alert(2);
    item1.countEl.innerHTML = Number(item1.count);
  } ,  // method

} ; //  item1 close   

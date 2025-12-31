const doubleButton = document.getElementById('doubleButton');

const element = { 
    r1cb1: document.getElementById('r1cb1'),
    r1cb2: document.getElementById('r1cb2'),
    r1cb3: document.getElementById('r1cb3'),
    r1cb4: document.getElementById('r1cb4'),
    r1cb5: document.getElementById('r1cb5'),
    r1cb6: document.getElementById('r1cb6'),
    
    r2cb1: document.getElementById('r2cb1'),
    r2cb2: document.getElementById('r2cb2'),
    r2cb3: document.getElementById('r2cb3'),
    r2cb4: document.getElementById('r2cb4'),
    r2cb5: document.getElementById('r2cb5'),
    r2cb6: document.getElementById('r2cb6'),
}
const allDoubleOrderCheckboxes = [
  r1cb4,r1cb5,r1cb6,r2cb4,r2cb5,r2cb6
];
const allCheckboxes = [
  r1cb1,r1cb2,r1cb3,r1cb4,r1cb5,r1cb6,
  r2cb1,r2cb2,r2cb3,r2cb4,r2cb5,r2cb6
  ];
const testArray = [
  r1cb1, r2cb2
]  

// DOM element references
// element.r1cb4.style.visibility = "hidden"
// document.getElementById('r1cb4').style.visibility = "hidden"
// TEST:  const r1cb1 = document.getElementById('r1cb1');
//todos

//compute every time an operator button is clicked too, showing calculations along the way. 
//edge cases: trim NaN values on the sides of final string before compututing
//once a decimal point is pressed deactivate it // or get rid of double decimal points via regex?
//there's a wierd bug when pressing decimal point first 

const numButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const screen = document.getElementById('screen');
const allClear = document.getElementById('all-clear');
const clearEntry = document.getElementById('clear-entry');

let entry = [];
let toCompute = [];
screen.value = 0;

function placeEntry(el) {
    entry.push(el.textContent);
    screen.value = entry.join('')
}

function pushtoCompute() {
    const concatenated = entry.join(''); //////////
    toCompute.push(concatenated)
    entry = [];
}

function sanitizeString(str) {
    const dirtyMult = new RegExp(/x/g)
    const sanitizedMult = '*'
    const dirtyDiv = new RegExp(/÷/g)
    const sanitizedDiv = '/';

    return str.replace(dirtyMult, sanitizedMult).replace(dirtyDiv, sanitizedDiv)
}

function compute(str) {
    screen.value = eval(str)
}


numButtons.forEach(button => button.addEventListener('click', () => {
    placeEntry(button)
}))

// bug must be coming from here? 
operatorButtons.forEach(button => button.addEventListener('click', () => {
    pushtoCompute()
    toCompute.push(button.textContent); //pushes textContent of operator button
    
}))

equals.addEventListener('click', () => {
    toCompute.pop(); // pops the equals sign
    const dirtyStr = toCompute.join('');
    const cleanString = sanitizeString(dirtyStr);
    compute(cleanString);
})

allClear.addEventListener('click', () => {
    toCompute = [];
    entry = [];
    screen.value = 0;
})

clearEntry.addEventListener('click', () => {
    entry = [];
    screen.value = 0;
})
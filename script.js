function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function multiply(a ,b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(num1, action, num2){
    switch (action) {
        case "+":
            return add(num1, num2);
        case "-":
            return sub(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.log("INVALID!");
            break;
    }
}

let operand1, operand2, operator, result;

let display = document.querySelector('#display');
let displayValue = '';

// let num0 = document.querySelector('#num0');
// let num1 = document.querySelector('#num1');
// let num2 = document.querySelector('#num2');
// let num3 = document.querySelector('#num3');
// let num4 = document.querySelector('#num4');
// let num5 = document.querySelector('#num5');
// let num6 = document.querySelector('#num6');
// let num7 = document.querySelector('#num7');
// let num8 = document.querySelector('#num8');
// let num9 = document.querySelector('#num9');


// console.log(Array.from(document.querySelectorAll('.operator')));

Array.from(document.querySelectorAll('.number')).forEach(item => {
    item.addEventListener('click', () => {
        displayValue += String(item.id[3]);
        display.textContent = displayValue;
        console.log(displayValue);
    })
});

Array.from(document.querySelectorAll('.operator')).forEach(item => {
    item.addEventListener('click', () => {
        switch (item.id) {
            case "add":
                displayValue += "+";
                break;
            case "sub":
                displayValue += "-";
                break;
            case "multiply":
                displayValue += "*";
                break;
            case "divide":
                displayValue += "/";
                break;
            default:
                break;
        }
        display.textContent = displayValue;
        console.log(displayValue);
    })
});

document.querySelector('#clear').addEventListener('click', () => {
    let arr = displayValue.split("");
    arr.splice(arr.length-1, 1);
    displayValue = arr.join('');
    display.textContent = displayValue;
    console.log(displayValue);
});

// When the user presses the operator again, call the operate function
// split the displayValue w.r.t the operator and the 0th is operand1 and 1st is operand2
// Check the operator with .includes and then split with switch

// When the user presses the operator again, pop the displayValue and store it to append it later
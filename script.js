function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a ,b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, action, num2){
    switch (action) {
        case "+":
            return add(num1, num2);
        case "-":
            return sub(num1, num2);
        case "X":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            break;
    }
}

Array.from(document.querySelectorAll('.number')).forEach(item => {
    item.addEventListener('click', () => {
        displayValue += String(item.id[3]);
        display.textContent = displayValue;
    })
});

Array.from(document.querySelectorAll('.operator')).forEach(item => {
    item.addEventListener('click', () => {
        if(displayValue.includes('ERROR!') || displayValue.includes('LOL'))
            allClear();
        if(alreadyHasOperator)
            equalsTo();
        switch (item.id) {
            case "add":
                displayValue += "+";
                break;
            case "sub":
                displayValue += "-";
                break;
            case "multiply":
                displayValue += "X";
                break;
            case "divide":
                displayValue += "/";
                break;
            default:
                break;
        }
        alreadyHasOperator = true;
        display.textContent = displayValue;
    })
});

document.querySelector('#decimal').addEventListener('click', () => {
    if(!alreadyHasOperator){
        if(!decimalFlag.first){
            decimalFlag.first = true;
            displayValue += '.';
        }
    }
    else {
        if(!decimalFlag.second){
            decimalFlag.second = true;
            displayValue += '.';
        }
    }
    display.textContent = displayValue;
});

document.querySelector('#equal').addEventListener('click', () => {
    if(alreadyHasOperator)
        equalsTo();
});

document.querySelector('#clear').addEventListener('click', () => {
    if(displayValue.includes('ERROR!') || displayValue.includes('LOL'))
        allClear();
    let temp = displayValue.slice(-1);
    if(temp == '+' || temp == '-' || temp == 'X' || temp == '/')
        alreadyHasOperator = false;

    if(temp == '.'){
        if(!alreadyHasOperator)
            decimalFlag.first = false;
        else
            decimalFlag.second = false;
    }

    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
});

document.querySelector('#allClear').addEventListener('click', allClear);

function allClear() {
    alreadyHasOperator = false;
    displayValue = '';
    decimalFlag.first = false;
    decimalFlag.second = false;
    display.textContent = "HRIDAY";
}

function calcOperands() {
    let operands = [];
    if(displayValue.includes("+")){
        operands = displayValue.split("+");
        operator = "+";
    }
    else if(displayValue.includes("X")){
        operands = displayValue.split("X");
        operator = "X";
    }
    else if(displayValue.includes("/")){
        operands = displayValue.split("/");
        operator = "/";
    }
    else if(displayValue.includes("-")){
        
        operands = displayValue.split("-");
        operator = "-";
        if(displayValue[0] == '-'){
            if(operands.length == 3){
                operand1 = operands[1] * -1;
                operand2 = operands[2];
                return;
            }
        }
    }
    [operand1, operand2] = operands;
}

function equalsTo() {
    calcOperands();
    if(operand1 == 'NaN' || operand1 == 'ERROR!' || operand1 == undefined || operand2 == undefined){
        displayValue = 'ERROR!';
        display.textContent = displayValue;
        return;
    }

    decimalFlag.second = false;
    if(operator == "/" && +operand2 == 0){
        displayValue = "LOL";
        display.textContent = displayValue;
    }
    else{
        result = operate(+operand1, operator, +operand2);
        if(!Number.isInteger(result))
            result = parseFloat(result.toFixed(8));
        else
            decimalFlag.first = false;
        alreadyHasOperator = false;
        displayValue = result.toString();
        display.textContent = displayValue;
    }
}

const display = document.querySelector('#display');
let operand1 = 0, operand2 = 0, operator = "+", result = 0, alreadyHasOperator = false, displayValue = '';
let decimalFlag = {
    first: false,
    second: false
};
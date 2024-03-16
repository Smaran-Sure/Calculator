let prevNum = null;
let currentNum = "0";
let operator = null;
let decimalClicked = false;
let result;
const outputSection = document.querySelector("#output");
const allNumbers = document.querySelectorAll(".btnNum");
const allOperators = document.querySelectorAll(".operator");
const decimalBtn = document.querySelector("#decimal");
const equalBtn = document.querySelector("#equalOperator");
const negativeInvert = document.querySelector("#invert");
const percentBtn = document.querySelector("#percent");
const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#delete");
updateDisplay();

function numberClick(num) {
    if (currentNum == "0" || currentNum == "-0") {
        currentNum = "";
    }
    currentNum += num;
    updateDisplay();
}
allNumbers.forEach((number) => {
    number.addEventListener("click", function(e) {
        num = e.target.textContent;
        numberClick(num);
    });
});

negativeInvert.addEventListener("click", () => {
    currentNum = (parseFloat(currentNum) * -1).toString();
    updateDisplay();
});

percentBtn.addEventListener("click",() => {
    currentNum = (parseFloat(currentNum)/100).toString();
    updateDisplay();

})

function clear() {
    prevNum = null;
    currentNum = "0";
    operator = null;
    decimalClicked = false;
    updateDisplay();
}

function handleDelete() {
    currentNum = currentNum.split("").slice(0,-1).join("");
    if (currentNum == "") {
        currentNum = "0";
    } 
    updateDisplay();
}
delBtn.addEventListener("click",handleDelete)

function handleDecimalClick() {
    if (!decimalClicked) {
        currentNum += ".";
        decimalClicked = true;
        updateDisplay();
    }
}
decimalBtn.addEventListener("click", handleDecimalClick);
clearBtn.addEventListener("click",clear);

function makeOperation(symbol) {
    if (prevNum !== null) {
        operate(prevNum,currentNum);
    }
    operator = symbol;
    prevNum = parseFloat(currentNum);
    currentNum = "0";
    decimalClicked = false;
}

allOperators.forEach((operator) => {
    operator.addEventListener("click", function(e) {
        symbol = e.target.textContent;
        makeOperation(symbol);
    });
});

equalBtn.addEventListener("click", () => {
    if (prevNum != null) {
        operate(prevNum,currentNum);
    }
    else {
        updateDisplay();
    }
});

function add(a,b) {
    return (a+b);
}
function subtract(a,b) {
    return (a-b);
}
function multiply(a,b) {
    return (a*b);
}
function divide(a,b) {
    return (a/b);
}

function operate(a,b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator == "+") {
        result = add(a,b);
    }
    if (operator == "-") {
        result = subtract(a,b);
    }
    if (operator == "×") {
        result = multiply(a,b);
    }
    if (operator == "/") {
        result = divide(a,b);
    }
    if (result.toString().includes(".")) {
        currentNum = result.toFixed(2).toString();
    }
    else {
        currentNum = result.toString();
    }
    prevNum = null;
    operator = null;
    updateDisplay();
}

function updateDisplay() {
    outputSection.textContent = Math.round(currentNum * 100) / 100;;
}

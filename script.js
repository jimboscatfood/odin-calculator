//4 basic arthiemtical functions
function add(num1, num2) {
    
    return +num1 + +num2;
}

function subtract(num1, num2) {
    
    return +num1 - +num2;
}

function multiply(num1, num2) {
    
    return +num1 * +num2;
}

function divide(num1, num2) {
    
    return +num1/+num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            results = add(num1, num2);
            break;
        case '-':
            results = subtract(num1, num2);
            break;
        case '*':
            results = multiply(num1, num2);
            break;
        case '/':
            results = divide(num1, num2);
            break;
    }
    display.textContent = `${results}`;
}

//Store and initialise the display value for next step
let results = 0;
let prevNum;
let operator;
let presentNum;


//Populate the display when you click the number buttons
const display = document.querySelector(".display");
const numKeys = document.querySelectorAll(".numKey");
const operators = document.querySelectorAll(".operator");
display.textContent = `${results}`;

//Listen for number keys
numKeys.forEach((button) => {
    button.addEventListener("click", function() {
        const keyInput = button.textContent;
        if (display.textContent === '0') {
            display.textContent = `${keyInput}`;
        }
        else if (display.textContent === `${prevNum}`) {
            display.textContent = `${keyInput}`;
        }
        else {
            display.textContent += `${keyInput}`;
        }
        presentNum = display.textContent;
    });
});

//Listen for operator
operators.forEach((button) => {
    button.addEventListener("click", () => {
        //Only lock in the value of the firstNum when an operator is clicked
        prevNum = display.textContent;
        //Change value of operator based on button clicked
        switch (button.id) {
            case ("divide"):
                operator = '/';
                break;
            case ("multiply"):
                operator = '*';
                break;
            case ("subtract"):
                operator = '-';
                break;
            case ("add"):
                operator = '+';
                break;
        }
    });
});

//Listen for Equal button
const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    operate(operator, prevNum, presentNum);
});


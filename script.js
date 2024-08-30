//4 basic arithmetic functions
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
let results;
let prevNum;
let operator;
let presentNum;


//Populate the display when you click the number buttons
const display = document.querySelector(".display");
const numKeys = document.querySelectorAll(".numKey");
const operators = document.querySelectorAll(".operator");
//Default display
display.textContent = '0';

//Listen for number keys
numKeys.forEach((button) => {
    button.addEventListener("click", function() {
        const keyInput = button.textContent;
        prevButton = button.className;
        if (display.textContent === '0' || prevButton === 'operator') {
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

//Declare global variable to track the class of last button clicked
let prevButton = undefined;

//Listen for operator
operators.forEach((button) => {
    button.addEventListener("click", () => {
        //Check if previous button clicked is an operator
        //If yes then just change the operator variable and leave the prevNum and presentNum variables the same
        if (prevButton === 'operator') {
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
            prevButton = button.className;
        }
        
        else {
            prevButton = button.className;
            //Add a statement to handle more than 2/ a pair of numbers
            if (prevNum !== undefined && presentNum !== undefined && operator!== undefined) {
                operate(operator, prevNum, presentNum);
            }
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
        }
    });
});

//Listen for Equal button
const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    operate(operator, prevNum, presentNum);
});

//Listen for function buttons
const functions = document.querySelectorAll(".function");
functions.forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.id) {
            case ("clear"):
                results = undefined;
                prevNum = undefined;
                operator = undefined;
                presentNum = undefined;
                display.textContent = '0';
                break;            
        }
    })
})


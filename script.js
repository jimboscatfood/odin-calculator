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
    //Display error message if user tries to divide by 0
    if (operator == '/' && num2 == '0') {
        display.textContent = "You can't divide by 0 bro"
    }
    else {
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
        //Round display results to 7 decimal places
        display.textContent = `${Math.round(results * 10000000)/10000000}`
        //Update prevNum
        prevNum = presentNum;
        //Update presentNum to number currently being displayed after operate function is called
        presentNum = +(display.textContent);
    }
}

//Create function to reset variables and display for the clear button
function clear() {
    results = undefined;
    prevNum = undefined;
    presentNum = undefined;
    operator = undefined;
    display.textContent = '0';
    prevButton = undefined;
}

//Populate the display when you click the number buttons
const display = document.querySelector(".display");
const numKeys = document.querySelectorAll(".numKey");
const operators = document.querySelectorAll(".operator");
//Default display
display.textContent = '0';

//Store and initialise the display value for next step
let results;
let prevNum;
let operator;
//Initialise presentNum to be what is being display on screen intially i.e., 0
let presentNum = +(display.textContent);

//Make reference to decimal point button
const decimal = document.querySelector("#decimal");

decimal.addEventListener("click", function() {
    //If the display includes decimal point
    if (display.textContent.includes('.')) {
        //Check if the last button is an operator
        if (prevButton === 'operator') {
            //If it is an operator, display 0 before the decimal point
            display.textContent = '0' + `${decimal.textContent}`;
        }
        else if (prevButton === 'equal') {
            display.textContent = '0' + `${decimal.textContent}`;
            //Reset the stored values in global variables
            operator = undefined;
            prevNum = undefined;
            presentNum = 0;
        }
    }
    //If the display doesn't have decimal point
    else {
        //Also check if the last button is an operator
        if (prevButton === 'operator') {
            //If it is an operator, display 0 before the decimal point
            display.textContent = '0' + `${decimal.textContent}`;
        }
        //If the decimal point button is pressed after equal button is pressed, the storage should reset
        else if (prevButton === 'equal') {
            display.textContent = '0' + `${decimal.textContent}`;
            //Reset the stored values in global variables
            operator = undefined;
            prevNum = undefined;
            presentNum = 0;
        }
            //Else just add the decimal point to the display
        else {
            display.textContent += `${decimal.textContent}`;
        }
        
    }
});

//Listen for number keys
numKeys.forEach((button) => {
    button.addEventListener("click", function() {
        const keyInput = button.textContent;
        
        if (display.textContent === '0' || prevButton === 'operator' && !display.textContent.includes('.')) {
            display.textContent = `${keyInput}`;
        }
        else if (display.textContent === `${prevNum}`) {
            display.textContent = `${keyInput}`;
        }
        else {
            display.textContent += `${keyInput}`;
        }
        presentNum = +(display.textContent);
        prevButton = button.className;
    });
});

//Declare global variable to track the class of last button clicked
let prevButton = undefined;

//Create function for changing value operator variable
function changeOperator(buttonID) {
    switch (buttonID) {
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

//Listen for operator
//Cases when operator will be pressed
//1. Selecting another operator when user already clicked on one
//2. After a result is displayed after user clicked on equal button
//3. Any other conditions
operators.forEach((button) => {
    button.addEventListener("click", () => {
        //Case 1
        //Check if previous button clicked is an operator 
        //If yes then just change the operator variable and do nothing else
        if (prevButton === 'operator') {
            changeOperator(button.id);
        }

        //Case 2
        else if (prevButton === 'equal') {
            //Store the displayed results to prevNum
            prevNum = +(display.textContent);
            //Change operator value stored for the next operation
            changeOperator(button.id);
        }
        
        else {
            //Add a statement to handle more than 2/ a pair of numbers
            if (prevNum !== undefined && presentNum !== undefined && operator!== undefined) {
                operate(operator, prevNum, presentNum);
            }
            //Only assign value for prevNum when an operator is clicked
            prevNum = +(display.textContent);
            //Change value of operator based on button clicked
            changeOperator(button.id);
        }
        prevButton = button.className;    
    });
});

//Listen for Equal button
const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    //Check if anything has been entered, if not then display 0
    prevNum == undefined || prevButton === 'equal'?
    display.textContent = `${presentNum}`:operate(operator, prevNum, presentNum);
    prevButton = "equal";
});

//Listen for function buttons
const functions = document.querySelectorAll(".function");
functions.forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.id) {
            case ("clear"):
                clear();
                break;
            //Switch signs
            case ("signs"):
                display.textContent = `${- +(display.textContent)}`;
                presentNum = +(display.textContent);
                break;
            case ("percent"):
                display.textContent = `${Math.round(+(display.textContent)/100*10000000)/10000000}`;
                presentNum = +(display.textContent);
        }         
    })
})


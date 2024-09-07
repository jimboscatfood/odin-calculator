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
//Declare global variable to track the class of last button clicked
let prevButton = undefined;

//Make reference to decimal point button
const decimal = document.querySelector("#decimal");

//Function for adding decimal point
function addDecimal() {
    //Check if the last button is an operator
    if (prevButton === 'operator') {
        //If it is an operator, display 0 before the decimal point
        display.textContent = '0' + `.`;
        presentNum = 0;
    }
    else if (prevButton === 'equal') {
        display.textContent = '0' + `.`;
        //Reset the stored values in global variables
        operator = undefined;
        prevNum = undefined;
        presentNum = 0;
    }
    //Else check if the display includes decimal point
    else if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
    prevButton = 'decimal';
}

//Event listener for mouse clicking demical button
decimal.addEventListener("click", () => {
    addDecimal();
});

//Create function for adding numbers
//The userInput can either be from button or keyboard
function addNumbers(userInput) {
    const num = +(userInput);
    if (display.textContent === '0' || prevButton === 'operator' && !display.textContent.includes('.')) {
        display.textContent = `${num}`;
    }
    //Add a condition to reset and display number after the equal button
    else if (prevButton === 'equal') {
        clear();
        display.textContent = `${num}`;
    }
    else if (display.textContent === `${prevNum}`) {
        display.textContent = `${num}`;
    }
    else {
        display.textContent += `${num}`;
    }
    presentNum = +(display.textContent);
    //After clicking the number button, record the prevButton pressed
    prevButton = 'number';
}

//Event listener for mouse clicking number button 
numKeys.forEach((button) => {
    button.addEventListener("click", () => {
        addNumbers(button.textContent)
    });
});

//Listen for number keys from pressing keyboard
document.addEventListener("keypress", function(event) {
    //Set up condition to only allow for numbers to be added to display
    //IF it is a number, THEN use the similar logic as mouseclicking the numKeys
    if (!isNaN(parseInt(event.key))) {
        addNumbers(event.key);
    }
    //ELSE IF the event key is a decimal point, THEN add decimal use the same logic as mouseclicking the decimal
    else if (event.key === '.') {
        addDecimal();
    }        
    //ELSE IF it is an operator,...
    else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        chooseOperator(event.key);
    }
    //ELSE IF it is equal button
    else if (event.key === '=' || event.key === 'Enter') {
        equalAction();        
    }
    
});

//Create function for changing value operator variable
function changeOperator(buttonValue) {
    switch (buttonValue) {
        case ("/"):
            operator = '/';
            break;
        case ("*"):
            operator = '*';
            break;
        case ("-"):
            operator = '-';
            break;
        case ("+"):
            operator = '+';
            break;
    }
}

//Create function for selecting or changing operator
//userInput can either be buttons or keyboard
function chooseOperator(userInput) {
    //Create a variable to store the initial userInput
    const op = userInput;
    //Cases when operator will be pressed
    //1. Selecting another operator when user already clicked on one
    //2. After a result is displayed after user clicked on equal button
    //3. Any other conditions

    //Case 1
    //Check if previous button clicked is an operator 
    //If yes then just change the operator variable and do nothing else
    if (prevButton === 'operator') {
        changeOperator(op);
    }
    //Case 2
    else if (prevButton === 'equal') {
        //Store the displayed results to prevNum
        prevNum = +(display.textContent);
        //Change operator value stored for the next operation
        changeOperator(op);
    }
    else {
        //Add a statement to handle more than 2/ a pair of numbers
        if (prevNum !== undefined && presentNum !== undefined && operator!== undefined) {
            operate(operator, prevNum, presentNum);
        }
        //Only assign value for prevNum when an operator is clicked
        prevNum = +(display.textContent);
        //Change value of operator based on button clicked
        changeOperator(op);
    }
    prevButton = 'operator';
} 

//Listen for operator
operators.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperator(button.value);
    });
});

//Create function for dealing with the equal button
function equalAction() {
    //Check if anything has been entered, if not then display 0
    prevNum == undefined || prevButton === 'equal'?
    display.textContent = `${presentNum}`:operate(operator, prevNum, presentNum);
    prevButton = "equal";
}

//Listen for Equal button
const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    equalAction();
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
                break;
            case ("delete"):
                display.textContent = display.textContent.slice(0,-1);
                presentNum = +(display.textContent);
                break;
        }         
    });
});


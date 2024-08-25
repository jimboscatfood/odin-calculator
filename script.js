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
            add();
        case '-':
            subtract();
        case '*':
            multiply();
        case '/':
            divide();
    }
}

//Populate the display when you click the number buttons
const display = document.querySelector(".display");
const numKeys = document.querySelectorAll(".numKey");

numKeys.forEach((button) => {
    button.addEventListener("click", () => {
        const keyInput = button.textContent;
        display.textContent += `${keyInput}`;
        console.log(keyInput);
    });
});

//Store the display value for next step
let firstNum;
let operator;
let secondNum;
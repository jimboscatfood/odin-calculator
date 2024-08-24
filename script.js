//4 basic arthiemtical functions
function add(numOne, numTwo) {
    const num1 = +numOne;
    const num2 = +numTwo;
    const operator = '+';
    return num1 + num2;
}

function subtract(numOne, numTwo) {
    const num1 = +numOne;
    const num2 = +numTwo;
    const operator = '-';
    return num1 - num2;
}

function multiply(numOne, numTwo) {
    const num1 = +numOne;
    const num2 = +numTwo;
    const operator = '*';
    return num1 * num2;
}

function divide(numOne, numTwo) {
    const num1 = +numOne;
    const num2 = +numTwo;
    const operator = '/';
    return num1/num2;
}

function operate(operator, numOne, numTwo) {
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

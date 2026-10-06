let operator;
let firstNumber;
let secondNumber;
let currentNumber = '';
let justCalculated = false

const buttons = document.querySelectorAll('.button');
const clear = document.querySelector('.clear')
const display = document.querySelector('.display')

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    return x / y
}

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}

clear.addEventListener('click', () => {
    display.textContent = ''
    firstNumber = ''
    secondNumber = ''
    currentNumber = ''
    operator = ''
    justCalculated = false
})

buttons.forEach((button) => {
    let userPick = button.textContent
    button.addEventListener('click', () => {

        if (isFinite(Number(userPick)) || userPick === '.') {
            if (currentNumber.includes('.') && userPick === '.') {

            } else {
                justCalculated ? currentNumber = userPick : currentNumber += userPick
                justCalculated = false
            }
        }

        display.textContent = currentNumber

        if (
            userPick === '+' ||
            userPick === '-' ||
            userPick === '*' ||
            userPick === '/'

        ) {
            if (!operator && currentNumber) {
                firstNumber = currentNumber
            } else if (operator && currentNumber) {
                secondNumber = currentNumber
                firstNumber = operate(operator, Number(firstNumber), Number(secondNumber))
                if (!Number.isFinite(firstNumber)) {
                    display.textContent = "Cannot divide by zero";
                    return
                }
                display.textContent = firstNumber.toFixed(2)
            } else if (!currentNumber && firstNumber) {
                display.textContent = firstNumber
            }

            operator = userPick
            currentNumber = ''
        }
        
        if (userPick === '=' && operator && currentNumber) {
            secondNumber = currentNumber
            let result = operate(operator, Number(firstNumber), Number(secondNumber))
            if (!Number.isFinite(result)) {
                display.textContent = "Cannot divide by zero";
                return
            }
            const rounded = result.toFixed(2)
            currentNumber = Number(rounded)
            display.textContent = rounded
            operator = ''
            justCalculated = true
        }
    })
})


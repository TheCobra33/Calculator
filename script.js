//calling all buttons form div
const calculator = document.getElementById('calculator');
const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');


// call each number buttons to react by click event
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});

// call each operation buttons to react by click event
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText); 
        updateDisplay();
    });
});

// call AC, DEl , = and . buttons to react by click event
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsButton.addEventListener('click', compute);
dotButton.addEventListener('click', appendDot);

function clear () { 
    //function to clear calculator calculations on the  display
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() { 
    //function to delete last number on calculator display
    currentOperand = currentOperand.toString().slice(0,-1);
    updateDisplay();
}

function compute() { 
    //function to compute the calculation 
}

function appendDot() { 
    //function to insert decimal number  
    if (currentOperand.includes('.')) return
    // prevent multiple decimals
    if (currentOperand === '') currentOperand = '0';
    //if empty, starts with 0.
    currentOperand += '.'; //taking currentOperand, including . 
    //then assignin new currentOperand
    updateDisplay();
}

//appending buttons values on the display

let currentOperand = ''; 
// variable store current displayed number
let previousOperand = '';
//variable store previous displayed number
let operation = null;
//variable store current mathematical operation ( + - * /)

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    // Prevent multiple decimal points
    if (currentOperand.includes('.')) {
        const [integerPart, decimalPart] = currentOperand.split('.');
        if (decimalPart.length >= 1 && number !== '.') return;
        // Prevent more than one digit after the decimal point
    }
    if (currentOperand.length >= 5 && !currentOperand.includes('.')) return;
    // Prevent more than 5 digits for non-decimal numbers

    currentOperand += number.toString();
    updateDisplay();
}

//choosen currentOperand to move to the previousOperand
function chooseOperation(selectedOperation) {
    if (currentOperand ==='') return;
    if (previousOperand !=='') {
        //checks if previous operand is eqgual 
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    //asings currentOperand in to the previousOperand
    currentOperand = '';
    //clear currentOperand for the next input
}


//compute function performs on the currentOperand selection 
function compute() {
    let computation;
    //store result of a calculation
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
//changing string value to number values that JS can read it.
//(parseFloat)
    if (isNaN(prev) || isNaN(current)) return;
    //checks if prev and current is NotANumber
    switch(operation) { 
//control statement that allows to execute diffrent variable 
//expression   
        case '+':
            computation = prev + current;
            break; //tells JS to exit swich stetement
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
        //cheking all maching operand values
    }
    currentOperand = computation; //shows the result on displey
    operation = undefined;//resets the operations
    previousOperand = '';//clears the previousOperand
    updateDisplay(); //refresh display
}

function updateDisplay() {
//updates display for chosen operand goes before previvous operand
    document.getElementById('current-operand').innerText = 
    currentOperand;
    document.getElementById('previous-operand').innerText = 
    previousOperand + ' ' + (operation || '');
}
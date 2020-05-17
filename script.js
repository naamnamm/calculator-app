const log = console.log;
const display = document.querySelector('.display-screen');
let calculation = [];

const calculator = {
  displayValue: '0',
  firstOperand: null,
  isNumberComplete: false,
  mathOperator: null,
  previousKey: null, //maybe need to change this to action
  storedValue: null
};



//---------------------------------------------------------------------------------

const numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(button => button.addEventListener('click', getNumber));

function getNumber(e) {
  //debugger;

  //starting
  if (calculator.isNumberComplete === false) {

    if (calculator.displayValue === '0') {
      calculator.displayValue = e.target.value;
    } else {
      calculator.displayValue += e.target.value;
    }

  }

  if (calculator.isNumberComplete === true) {
    //save first number from the display to an object
    //debugger;
    calculator.firstOperand = display.textContent

    //replace display with new num 
    display.textContent = e.target.value;
    //update display value - calculator object 
    calculator.displayValue = display.textContent;

  }
  calculator.isNumberComplete = false;
  calculator.previousKey = 'number';

  log(calculator);
  updateDisplayScreen(calculator.displayValue);

}
//-------------------------------------------------------

function updateDisplayScreen(displayValue) {
  display.textContent = displayValue;
}


//---------------------------------------------------------------------------------

const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

function getMathOperator(e) {
  // this makes number complete
  calculator.isNumberComplete = true;

  if (calculator.firstOperand && calculator.mathOperator && calculator.displayValue) {
    calculator.storedValue = calculator.displayValue;
    let result = performOperation(Number(calculator.firstOperand), Number(calculator.displayValue), calculator.mathOperator);
    calculator.displayValue = result;
    updateDisplayScreen(calculator.displayValue)
    calculator.mathOperator = e.target.value;
  } else {
    calculator.mathOperator = e.target.value;

  }

  displayCalculation()

  calculator.previousKey = 'mathOperator';
  log(calculator);

}
//---------------------------------------------------------------------------------

let displayMath = document.querySelector('.display-calculation')

function displayCalculation() {

  if (calculator.previousKey === 'calculation-key') {
    calculation.push(calculator.storedValue);
    calculation.push('=');

    //set previous key to null
    calculator.previousKey = '';
    let display = calculation.join(' ');
    displayMath.textContent = display;
    log(calculation)
    // clear calculation array
    calculation = [];
    return;
  }

  //this is to prevent pushing mathOperator to an array twice
  if (calculator.previousKey === 'mathOperator') {
    calculation.pop()
    calculation.push(calculator.mathOperator)
    log(calculation);
    let display = calculation.join(' ');
    displayMath.textContent = display;
    return;
  }

  if (calculator.storedValue) {
    calculation.push(calculator.storedValue, calculator.mathOperator);
    let display = calculation.join(' ');
    displayMath.textContent = display;
    log(calculation);
    return;
  }

  if (calculator.isNumberComplete === true && calculator.mathOperator) {
    calculation.push(calculator.displayValue, calculator.mathOperator);
    let display = calculation.join(' ');
    displayMath.textContent = display;
    log(calculation);
  }

  calculationKey.storedValue = null;

}

// if (calculator.previousKey === 'clear-all') {
//   calculation = [];
// }
//if num complete = true
//push display to be first number


//------------------------------------------------------------------

const calculationKey = document.getElementById('calculation-key')
calculationKey.addEventListener('click', calculate);

function calculate(e) {
  //debugger;
  let firstNum = Number(calculator.firstOperand);
  let secondNum = Number(calculator.displayValue);
  let mathOperator = calculator.mathOperator;
  let result = performOperation(firstNum, secondNum, mathOperator)

  if (!(calculator.firstOperand && calculator.mathOperator)) {
    return;
  }

  calculator.storedValue = calculator.displayValue;
  calculator.displayValue = result.toString();
  calculator.firstOperand = '';
  calculator.mathOperator = '';
  calculator.previousKey = 'calculation-key';

  updateDisplayScreen(calculator.displayValue);
  displayCalculation();
  log(calculator);
}

function performOperation(firstNum, secondNum, mathOperator) {

  switch (mathOperator) {
    case '+':
      return firstNum += secondNum

    case '-':
      return firstNum -= secondNum

    case '*':
      return firstNum *= secondNum

    case '/':
      return firstNum /= secondNum
  }
}

//-------------------------------------------------------------
const delBtn = document.getElementById('delete');

delBtn.addEventListener('click', e => {
  calculator.displayValue = calculator.displayValue.slice(0, -1)

  if (calculator.isNumberComplete === true) {
    return;
  }

  //if str.length = 0 - update display to be 0
  if (calculator.displayValue.length === 0) {
    calculator.displayValue = '0';
  }

  log(calculator);
  updateDisplayScreen(calculator.displayValue);

});

//-----------------------------------------------------

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', e => {
  calculator.displayValue = '0';
  updateDisplayScreen(calculator.displayValue);
});

//--------------------------------------------------------

const clearAllBtn = document.getElementById("clear-all");

clearAllBtn.addEventListener("click", (e) => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.mathOperator = null;
  calculator.isNumberComplete = false;
  calculator.previousKey = "clear-all";

  updateDisplayScreen(calculator.displayValue);

  calculation = [];
  displayCalculation();
});

//-------------------------------------------------------
const decimalBtn = document.getElementById('decimal-key');
decimalBtn.addEventListener('click', makeDecimalPoint)

function makeDecimalPoint(e) {
  if (calculator.isNumberComplete === false) {
    //continuing number
    if (calculator.displayValue.indexOf(e.target.value) >= 0) {
      return;
    }

    //fresh start with first Number - start with either 0 or Number
    if (calculator.displayValue === '0') {
      calculator.displayValue = '0' + e.target.value;
    } else {
      calculator.displayValue += e.target.value;
    }
  }

  //after hit operand > get second Number
  if (calculator.isNumberComplete === true) {
    //save first number from the display to an object
    calculator.firstOperand = display.textContent

    //replace display with new num 
    calculator.displayValue = '0' + e.target.value;
  }

  calculator.isNumberComplete = false;

  updateDisplayScreen(calculator.displayValue);
}
const log = console.log;
const display = document.querySelector('.display-screen');
let calculation = [];

const calculator = {
  displayValue: '0',
  firstOperand: null,
  isNumberComplete: false,
  mathOperator: null,
  previousKey: null,
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
    calculator.firstOperand = display.textContent

    //replace display with new num 
    display.textContent = e.target.value;
    //update display value - calculator object 
    calculator.displayValue = display.textContent;

  }

  calculator.isNumberComplete = false;
  calculator.previousKey = null;

  log(calculator);
  updateDisplayScreen();
}
//-------------------------------------------------------

function updateDisplayScreen() {
  display.textContent = calculator.displayValue;

}

//---------------------------------------------------------------------------------

const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

function getMathOperator(e) {
  // this make number complete
  calculator.isNumberComplete = true;

  if (calculator.firstOperand && calculator.mathOperator && calculator.displayValue) {
    calculate();
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
  //debugger;

  //this is to prevent pushing mathOperator to an array twice
  if (calculator.previousKey === 'mathOperator') {
    calculation.pop()
    calculation.push(calculator.mathOperator)
    log(calculation);

    let display = calculation.join(' ');
    displayMath.textContent = display;
    return;
  }

  if (calculator.isNumberComplete === true && calculator.mathOperator) {
    calculation.push(calculator.displayValue, calculator.mathOperator)
  }

  let display = calculation.join(' ');
  displayMath.textContent = display;
  log(calculation);
}

//------------------------------------------------------------------

const calculationKey = document.getElementById('calculation-key')
calculationKey.addEventListener('click', calculate);


function calculate(e) {
  //debugger;
  // case 1 - this is '=' operator
  let firstNum = Number(calculator.firstOperand);
  let secondNum = Number(display.textContent);
  let mathOperator = calculator.mathOperator;
  let result = '';

  if (!(calculator.firstOperand && calculator.mathOperator)) {
    return;
  }
  //debugger;

  switch (mathOperator) {
    case '+':
      result = firstNum += secondNum
      break;

    case '-':
      result = firstNum -= secondNum
      break;

    case '*':
      result = firstNum *= secondNum
      break;

    case '/':
      result = firstNum /= secondNum
      break;
  }

  calculator.displayValue = result.toString();
  calculator.firstOperand = '';
  calculator.mathOperator = '';

  updateDisplayScreen();

  log(calculator);
}

//-------------------------------------------------------------
const delBtn = document.getElementById('delete');

delBtn.addEventListener('click', e => {
  calculator.displayValue = calculator.displayValue.slice(0, -1)

  //if str.length = 0 - update display to be 0
  if (calculator.displayValue.length === 0) {
    calculator.displayValue = '0';
  }

  log(calculator);
  updateDisplayScreen();

});

//-----------------------------------------------------

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', e => {
  calculator.displayValue = '0';
  updateDisplayScreen();
});

//--------------------------------------------------------

const clearAllBtn = document.getElementById("clear-all");

clearAllBtn.addEventListener("click", (e) => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.mathOperator = null;
  calculator.isNumberComplete = false;
  calculator.previousKey = "clear-all";

  updateDisplayScreen();

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

  updateDisplayScreen();
}
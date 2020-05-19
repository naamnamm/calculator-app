const log = console.log;
let calculation = [];

const calculator = {
  displayValue: '0',
  firstOperand: null,
  isNumberComplete: false,
  mathOperator: null,
  storedValue: null,
  state: null,
  previousKey: null,
  isOperatorReady: false
};




const numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(button => button.addEventListener('click', getNumber));

function getNumber(e) {
  //debugger;
  if (calculator.isNumberComplete === false) {
    if (calculator.displayValue === '0') {
      calculator.displayValue = e.target.value;
    } else {
      calculator.displayValue += e.target.value;
    }
  }

  if (calculator.isNumberComplete === true) {
    calculator.firstOperand = calculator.displayValue
    calculator.displayValue = e.target.value;
  }

  calculator.isNumberComplete = false;
  calculator.previousKey = 'number';
  calculator.isOperatorReady = false;

  log(calculator);
  updateDisplayScreen(calculator.displayValue);

  if (calculator.state === 'restart') {
    displayCalculation(calculator.state);
  }
}
//-------------------------------------------------------

function updateDisplayScreen(displayValue) {
  const display = document.querySelector('.display-screen');
  display.textContent = displayValue;
}
//---------------------------------------------------------------------------------

const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

function getMathOperator(e) {
  // this makes number complete
  calculator.isNumberComplete = true;
  //debugger;

  if (calculator.isOperatorReady === true) {
    if (calculator.firstOperand && calculator.mathOperator && calculator.displayValue) {
      calculator.mathOperator = e.target.value;

      calculator.state = 'continuousCalculation';
      displayCalculation(calculator.state)
    } else {
      calculator.mathOperator = e.target.value;
      calculator.state = 'initialDisplay';
      displayCalculation(calculator.state)
    }
  }

  if (calculator.isOperatorReady === false) {
    if (calculator.firstOperand && calculator.mathOperator && calculator.displayValue) {
      calculator.storedValue = calculator.displayValue;

      let result = performOperation(Number(calculator.firstOperand), Number(calculator.displayValue), calculator.mathOperator);
      calculator.displayValue = result.toString();
      updateDisplayScreen(calculator.displayValue);

      calculator.mathOperator = e.target.value;

      calculator.state = 'continuousCalculation';
      displayCalculation(calculator.state)

    } else {
      calculator.mathOperator = e.target.value;
      calculator.state = 'initialDisplay';
      displayCalculation(calculator.state)
    }
  }

  calculator.previousKey = 'mathOperator';
  calculator.isOperatorReady = true;
  log(calculator)

}
//---------------------------------------------------------------------------------

let displayMath = document.querySelector('.display-calculation')

function displayCalculation(calculatorState) {
  //debugger;
  //this is to prevent pushing mathOperator to an array twice
  if (calculator.previousKey === 'mathOperator') {
    calculation.pop()
    calculation.push(calculator.mathOperator)
    displayMath.textContent = calculation.join(' ');
    return;
  }

  if (calculatorState === 'restart' || calculatorState === 'clear-all') {
    calculation = [];
  }

  if (calculatorState === 'initialDisplay') {
    calculation = [];
    calculation.push(calculator.displayValue, calculator.mathOperator);
  }

  if (calculatorState === 'continuousCalculation') {
    calculation.push(calculator.storedValue, calculator.mathOperator);
  }

  if (calculatorState === 'finalCalculation') {
    calculation.push(calculator.storedValue, '=');
  }

  displayMath.textContent = calculation.join(' ');
  log(calculation)

  calculationKey.storedValue = null;
  calculator.state = null;

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
  }

  calculator.storedValue = calculator.displayValue;
  calculator.displayValue = result.toString();
  calculator.firstOperand = '';
  calculator.mathOperator = '';
  calculator.state = 'finalCalculation'
  calculator.isNumberComplete = true;

  updateDisplayScreen(calculator.displayValue);
  displayCalculation(calculator.state);
  log(calculator);

  calculator.state = 'restart';
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

const clearBtn = document.getElementById('CE');
clearBtn.addEventListener('click', e => {
  calculator.displayValue = '0';

  updateDisplayScreen(calculator.displayValue);

  if (calculator.state === 'restart') {
    displayCalculation(calculator.state);
  }

});



//--------------------------------------------------------

//CE & E works the same when state = restart
//otherwise C > clear all everytime
//CE > just make display value to be 0

const clearAllBtn = document.getElementById("C");

clearAllBtn.addEventListener("click", (e) => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.mathOperator = null;
  calculator.isNumberComplete = false;
  calculator.state = 'clear-all';

  //this make display value 0 anyway
  updateDisplayScreen(calculator.displayValue);
  //if state is restart > clear all
  displayCalculation(calculator.state);
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
    calculator.firstOperand = calculator.displayValue

    //replace display with new num 
    calculator.displayValue = '0' + e.target.value;
  }

  calculator.isNumberComplete = false;

  updateDisplayScreen(calculator.displayValue);

  if (calculator.state === 'restart') {
    displayCalculation(calculator.state);
  }
}

//------------------------------
const plusMinusKeyEl = document.getElementById('plus-minus');
plusMinusKeyEl.addEventListener('click', plusMinusNumber);

function plusMinusNumber(e) {

  //debugger;
  if (calculator.displayValue > 0) {
    calculator.displayValue = (-Math.abs(calculator.displayValue)).toString();
  } else {
    calculator.displayValue = Math.abs(calculator.displayValue).toString();
  }

  updateDisplayScreen(calculator.displayValue);

  if (calculator.state === 'restart') {
    displayCalculation(calculator.state);
  }

}


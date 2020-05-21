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

const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

const decimalBtn = document.getElementById('decimal-key');
decimalBtn.addEventListener('click', makeDecimalPoint)

const plusMinusKeyEl = document.getElementById('plus-minus');
plusMinusKeyEl.addEventListener('click', plusMinusNumber);

const calculationKey = document.getElementById('calculation-key')
calculationKey.addEventListener('click', calculate);

const delBtn = document.getElementById('delete');
delBtn.addEventListener('click', e => {
  calculator.displayValue = calculator.displayValue.slice(0, -1)

  if (calculator.isNumberComplete === true) {
    return;
  }

  if (calculator.displayValue.length === 0) {
    calculator.displayValue = '0';
  }

  updateDisplayScreen(calculator.displayValue);

});

const clearBtn = document.getElementById('CE');
clearBtn.addEventListener('click', e => {
  calculator.displayValue = '0';

  updateDisplayScreen(calculator.displayValue);

  if (calculator.state === 'restart') {
    displayCalculation(calculator.state);
  }

});

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

function getNumber(e) {
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

  updateDisplayScreen(calculator.displayValue);

  if (calculator.state === 'restart') {
    displayCalculation(calculator.state);
  }
}


function updateDisplayScreen(displayValue) {
  const display = document.querySelector('.display-screen');
  display.textContent = displayValue;
}


function getMathOperator(e) {
  calculator.isNumberComplete = true;

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

      let result = roundNumber(performOperation(Number(calculator.firstOperand), Number(calculator.displayValue), calculator.mathOperator).toString());
      calculator.displayValue = result;
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
}


function displayCalculation(calculatorState) {
  let displayMath = document.querySelector('.display-calculation')

  if (calculatorState === 'restart' || calculatorState === 'clear-all') {
    calculation = [];
  }

  if (calculatorState === 'initialDisplay') {
    calculation = []
    if (calculator.previousKey === 'mathOperator') {
      calculation = []
      calculation.push(calculator.displayValue, calculator.mathOperator)
    } else {
      calculation.push(calculator.displayValue, calculator.mathOperator);
    }
  }

  if (calculatorState === 'continuousCalculation') {
    if (calculator.previousKey === 'mathOperator') {
      calculation.pop()
      calculation.push(calculator.mathOperator)
    } else {
      calculation.push(calculator.storedValue, calculator.mathOperator);
    }
  }

  if (calculatorState === 'finalCalculation') {
    calculation.push(calculator.storedValue, '=');
  }

  displayMath.textContent = calculation.join(' ');

  calculationKey.storedValue = null;
}


function roundNumber(num) {
  let decimalPlaces = num.length - num.indexOf(".") - 1;

  if (decimalPlaces > 5) {
    num = +(Math.round(num + "e+2") + "e-2");
  }

  return num.toString();
}


function calculate(e) {
  let firstNum = Number(calculator.firstOperand);
  let secondNum = Number(calculator.displayValue);
  let mathOperator = calculator.mathOperator;
  let result = roundNumber((performOperation(firstNum, secondNum, mathOperator)).toString());

  if (!(calculator.firstOperand && calculator.mathOperator)) {
  }

  calculator.storedValue = calculator.displayValue;
  calculator.displayValue = result;
  calculator.firstOperand = '';
  calculator.mathOperator = '';
  calculator.state = 'finalCalculation'
  calculator.isNumberComplete = true;

  updateDisplayScreen(calculator.displayValue);
  displayCalculation(calculator.state);

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


function makeDecimalPoint(e) {
  if (calculator.isNumberComplete === false) {
    if (calculator.displayValue.indexOf(e.target.value) >= 0) {
      return;
    }

    if (calculator.displayValue === '0') {
      calculator.displayValue = '0' + e.target.value;
    } else {
      calculator.displayValue += e.target.value;
    }
  }

  if (calculator.isNumberComplete === true) {
    calculator.firstOperand = calculator.displayValue;
    calculator.displayValue = '0' + e.target.value;
  }

  calculator.isNumberComplete = false;

  updateDisplayScreen(calculator.displayValue);

  if (calculator.state === 'restart') {
    displayCalculation(calculator.state);
  }
}


function plusMinusNumber(e) {
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


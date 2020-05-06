const log = console.log;
const display = document.querySelector('.display-screen');

const calculator = {
  displayValue: '0',
  firstOperand: null,
  isFirstNumComplete: false,
  mathOperator: null,
};

//---------------------------------------------------------------------------------

const numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(button => button.addEventListener('click', getNumber));

function getNumber(e) {
  //starting
  if (calculator.isFirstNumComplete === false) {

    if (calculator.displayValue === '0') {
      calculator.displayValue = e.target.value;
    } else {
      calculator.displayValue += e.target.value;
    }
    
  }

  if (calculator.isFirstNumComplete === true) {
    //save first number from the display to an object
    calculator.firstOperand = display.textContent
    
    //replace display with new num 
    display.textContent = e.target.value;
    //update display value - calculator object 
    calculator.displayValue = display.textContent;
    
  }

  calculator.isFirstNumComplete = false;

  updateDisplay()

  log(calculator);
}

//---------------------------------------------------------------------------------

function updateDisplay() {
  //const display = document.querySelector('.calculator-screen');
  //update text con
  display.textContent = calculator.displayValue;

}

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', e => display.textContent = '0');

//---------------------------------------------------------------------------------

const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

function getMathOperator(e) {
  // this make first number complete
  calculator.isFirstNumComplete = true;

  //update operator to an object
  calculator.mathOperator = e.target.value;
  
  log(calculator);
  // for continuing number - if hit math operator again - calculate total
  calculate();
  log(calculator);
}



//---------------------------------------------------------------------------------

const calculationKey = document.getElementById('calculation-key')
calculationKey.addEventListener('click', calculate)

function calculate() {
  let firstNum = Number(calculator.firstOperand);
  let secondNum = Number(display.textContent);
  let mathOperator = calculator.mathOperator;
  let result = '';

    switch(mathOperator) {
    case '+' :
      result = firstNum += secondNum
      break;

    case '-' :
      result = firstNum -= secondNum
      break;

    case '*' :
      result = firstNum *= secondNum
      break;

    case '/' :
      result = firstNum /= secondNum
      break;      
    }

    calculator.displayValue = result;
    calculator.firstOperand = '';
    calculator.isFirstNumComplete = true;

    updateDisplay();

    

    log(calculator);
}


//---------------------------------------------------------------------------------


const decimalBtn = document.getElementById('decimal-key');
decimalBtn.addEventListener('click', makeDecimalPoint)

function makeDecimalPoint(e) {
   //debugger;
    if (calculator.isFirstNumComplete === false) {
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
    if (calculator.isFirstNumComplete === true) {
      //save first number from the display to an object
      calculator.firstOperand = display.textContent

      //replace display with new num 
      calculator.displayValue = '0' + e.target.value;
    }

    calculator.isFirstNumComplete = false;

    updateDisplay();
}



//https://stackoverflow.com/questions/51923613/javascript-total-math-of-string-with-multiple-operators-for-js-calculator




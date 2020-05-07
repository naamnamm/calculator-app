const log = console.log;
const display = document.querySelector('.display-screen');
let calculation = [];

const calculator = {
  displayValue: '0',
  firstOperand: null,
  isNumberComplete: false,
  mathOperator: null,
  total: null,
  previousKey: null
};

//---------------------------------------------------------------------------------

const numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(button => button.addEventListener('click', getNumber));

function getNumber(e) {
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

  updateDisplay()
  
  log(calculator);
}

//---------------------------------------------------------------------------------

function updateDisplay() {
  //const display = document.querySelector('.calculator-screen');
  //update text con
  display.textContent = calculator.displayValue;

}

//---------------------------------------------------------------------------------

const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

function getMathOperator(e) {
  //this make first number complete
  calculator.isNumberComplete = true;

  //update operator to an object
  calculator.mathOperator = e.target.value;

  displayCalculation();

  //if firstoperand and mathOperator is not null
  if (calculator.firstOperand && calculator.mathOperator) {
    calculate();
  }


  log(calculator);

  //displayCalculation()

}



//---------------------------------------------------------------------------------

const calculationKey = document.getElementById('calculation-key')
calculationKey.addEventListener('click', calculate)

function calculate(e) {
  let firstNum = Number(calculator.firstOperand);
  let secondNum = Number(display.textContent);
  let mathOperator = calculator.mathOperator;
  let result = '';

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
  calculator.isNumberComplete = true;
  calculator.previousKey = e.target.id;
  log(calculator.previousKey);
  displayCalculation();

  calculator.displayValue = result.toString();
  calculator.firstOperand = '';
  

  updateDisplay();
  

  log(calculator);
}


//---------------------------------------------------------------------------------


const decimalBtn = document.getElementById('decimal-key');
decimalBtn.addEventListener('click', makeDecimalPoint)

function makeDecimalPoint(e) {
  //debugger;
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

  updateDisplay();
}
//-----------------------------------------------------------------

//***if = hit CE/C works the same
//***else it's different

//CE button
//if hit this - set display value to '0'
const clearBtn = document.getElementById('clear');

clearBtn.addEventListener('click', e => {
  calculator.displayValue = '0';
  updateDisplay();
  log(calculator)
});

//-----------------------------------------------------------------

//if hitted - set display to '0' and everything else to null

const clearAllBtn = document.getElementById('clear-all');

clearAllBtn.addEventListener('click', e => {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.mathOperator = null;
  updateDisplay();
  log(calculator)
});

//-----------------------------------------------------------------

//if hitted = the result should not be able to del
//Del btn
//if hitted - delete the last digit on the display

const delBtn = document.getElementById('delete');

delBtn.addEventListener('click', e => {
  //debugger;
  //grab calculator.display
  calculator.displayValue = calculator.displayValue.slice(0, -1)
  
  //if str.length = 0 - update display to be 0
  if(calculator.displayValue.length === 0) {
    calculator.displayValue = '0';
  }

  log(calculator);
  updateDisplay();
  
});
//https://stackoverflow.com/questions/51923613/javascript-total-math-of-string-with-multiple-operators-for-js-calculator



// //grab DOM
let displayMath = document.querySelector('.display-calculation')
// //displayMath.textContent = 0
// //log(displayMath);

function displayCalculation() {
  //debugger;
  //if num complete = true
  //push display to be first number
  if (calculator.isNumberComplete === true && calculator.previousKey === 'calculation-key') {
    calculation.push(calculator.displayValue);
    calculation.push('=');

    //set previous key to null
    calculator.previousKey = '';
    let display = calculation.join(' ');
    displayMath.textContent = display;
    log(calculation)

    //then clear all items in Array and push total to an array 
    //calculator = [total]
    
    return;
  }

  if (calculator.isNumberComplete === true) {
    calculation.push(calculator.displayValue);
    calculation.push(calculator.mathOperator);
  }
  
  let display = calculation.join(' ');
  displayMath.textContent = display;
  log(calculation);
  
} 

// function updateDisplay() {
//   displayMath.textContent = calculation[0];
// }

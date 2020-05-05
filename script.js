const log = console.log;
let isNumberComplete = false;
let mathOperator = '';
let output = '';
let calculator = document.querySelector('.calculator');
let displayCalculation = [];

let displayNum = document.getElementsByClassName('display-output')[0];

const numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(button => button.addEventListener('click', getNumber));

function getNumber(e) {
  //debugger;

  //start new Number
  if (isNumberComplete === false) {

    //textContent is either 0
    if (displayNum.textContent === '0') {
      displayNum.textContent = e.target.value; 
    } else {
      displayNum.textContent += e.target.value;
    };
    
    //Or 0.
    if (displayNum.textContent === '0.') {
      displayNum.textContent += e.target.value;
    };
  }

  //restart
  if (isNumberComplete === true) {
    //display second number
    displayNum.textContent = e.target.value;
  } 

  isNumberComplete = false;
}


const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

function getMathOperator(e) {
  
  isNumberComplete = true;

  mathOperator = e.target.value;

  //save first number to dataset
  calculator.dataset.n1 = displayNum.textContent;
  //push first number 
  displayCalculation.push(calculator.dataset.n1);
  //push operand to array
  displayCalculation.push(mathOperator);

  log(mathOperator);
  log(displayCalculation);
  log(displayCalculation.length);

  if (displayCalculation.length === 4) {
    // log(calculator.dataset.n1);
    // log(calculateOutput());
    calculator.dataset.n1 = calculateOutput();
    log(calculator.dataset.n1);
  }

}



const decimalBtn = document.getElementById('decimal-key');
decimalBtn.addEventListener('click', makeDecimalPoint)

function makeDecimalPoint(e) {
   
    if (isNumberComplete === false) {
      //fresh start with first Number - start with either 0 or Number
      if (displayNum.textContent.indexOf(e.target.value) >= 0) {
        return;
      }

      if (displayNum.textContent === '0') {
        displayNum.textContent = '0' + e.target.value;
      } else {
        displayNum.textContent += e.target.value;
      }
    }
    
    //after hit operand > get second Number
    if (isNumberComplete === true) {
      displayNum.textContent = '0' + e.target.value;
    }

    isNumberComplete = false;
}


const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', e => {
  let displayNum = document.getElementsByClassName('display-output')[0];
  displayNum.textContent = 0;
  }); 


const calculationKey = document.getElementById('calculation-key')
calculationKey.addEventListener('click', grabAllInputs)

function grabAllInputs() {
  let n1 = Number(calculator.dataset.n1);
  log(calculator.dataset.n1);

  let n2 = Number(displayNum.textContent);
  displayCalculation.push(n2);

  log(displayCalculation);
  log(displayCalculation.length);

  log(n1, n2);
  debugger;
  calculate(n1, n2);
    
}

function calculate(n1, n2, mathOperator) {
  let output = ''

  switch(mathOperator) {
    case '+' :
      output = n1 += n2
      displayNum.textContent = output;
      break;

    case '-' :
      output = n1 -= n2
      displayNum.textContent = output;
      break;

    case '*' :
      output = n1 *= n2
      displayNum.textContent = output;
      break;

    case '/' :
      output = n1 /= n2
      displayNum.textContent = output;
      break;      
    }
}




//https://stackoverflow.com/questions/51923613/javascript-total-math-of-string-with-multiple-operators-for-js-calculator




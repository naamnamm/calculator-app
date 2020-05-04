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

  if (isNumberComplete === false) {
    if (displayNum.textContent === '0') {
      displayNum.textContent = e.target.value; 
    } else {
      displayNum.textContent += e.target.value;
    }
  }

  if (isNumberComplete === true) {
    displayNum.textContent = e.target.value;
  } 

  isNumberComplete = false;
}



const operatorBtns = document.querySelectorAll('.operator-key');
operatorBtns.forEach(button => button.addEventListener('click', getMathOperator))

function getMathOperator(e) {
  calculator.dataset.firstnum = displayNum.textContent;
  displayCalculation.push(displayNum.textContent);
  log(calculator.dataset.firstnum);

  isNumberComplete = true;
  log(isNumberComplete);

  mathOperator = e.target.value;
  displayCalculation.push(mathOperator);
  log(mathOperator);
  log(displayCalculation);

}

const decimalBtn = document.getElementById('decimal-key');
decimalBtn.addEventListener('click', makeDecimalPoint)

function makeDecimalPoint(e) {
  if (displayNum.textContent.indexOf(e.target.value) >= 0) {
    return;
  } else {
    displayNum.textContent += e.target.value;
  }
}


const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', e => {
  let displayNum = document.getElementsByClassName('display-output')[0];
  displayNum.textContent = 0;
  }); 


const calculationKey = document.getElementById('calculation-key')
calculationKey.addEventListener('click', calculateOutput)

function calculateOutput() {
  log('output');

  let firstNum = Number(calculator.dataset.firstnum);
  let secondNum = Number(displayNum.textContent);
  displayCalculation.push(secondNum);
  log(displayCalculation);
  log(displayCalculation.length);

  log(firstNum, secondNum);

  if(displayCalculation.length === 3) {
    switch(mathOperator) {
    case '+' :
      output = firstNum += secondNum
      displayNum.textContent = output;
      
      break;

    case '-' :
      output = firstNum -= secondNum
      displayNum.textContent = output;
      break;

    case '*' :
      output = firstNum *= secondNum
      displayNum.textContent = output;
      break;

    case '/' :
      output = firstNum /= secondNum
      displayNum.textContent = output;
      break;      
    }
  }

}

//https://stackoverflow.com/questions/51923613/javascript-total-math-of-string-with-multiple-operators-for-js-calculator




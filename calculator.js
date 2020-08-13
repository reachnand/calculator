const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue; //updating value
  }
  
  updateDisplay();
 const keys = document.querySelector('.calculator-keys');
 keys.addEventListener('click', (event) => {
   // Access the clicked element
   const { target } = event; //=const target = event.target;
 
   // Checks if the clicked element is a button If not, exit from the function
   if (!target.matches('button')) {
     return;
   }
 
   if (target.classList.contains('operator')) {
       handleOperator(target.value);
       updateDisplay();    
     return;
   }
 
   if (target.classList.contains('decimal')) {
       inputDecimal(target.value);
       updateDisplay();    
     return;
   }
 
   if (target.classList.contains('all-clear')) {
       resetCalculator();
       updateDisplay();
    
     return;
   }
 
    inputDigit(target.value);
    updateDisplay();
 });
 
 function inputDigit(digit) {
     const { displayValue, waitingForSecondOperand } = calculator;

     if (waitingForSecondOperand === true) {
         calculator.displayValue = digit;
         calculator.waitingForSecondOperand = false;
     } else {
     //Overwrite `displayValue` if the current value is '0' otherwise append to it
     calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; //+ is for string concat and ? checks if the val is 0
     }
     console.log(calculator);
 }
 function inputDecimal(dot) {
     if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
    // If the `displayValue` property does not contain a decimal point, append the decimal point
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator
    // `parseFloat` converts the string contents of `displayValue` to a floating-point number
    const inputValue = parseFloat(displayValue);
  
    // verify that `firstOperand` is null and that the `inputValue` is not a `NaN` value
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
      }
    if (firstOperand === null && !isNaN(inputValue)) {
      // Update the firstOperand property
      calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
    
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
      }    
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
    return secondOperand;
  }
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  }
  

const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

const updateDisplay = () => {
  const display = document.querySelector(".calc-display");
  display.innerText = calculator.displayValue;
};

updateDisplay();

const btns = document.querySelector(".calc-btns");
btns.addEventListener("click", (event) => {
  const btn = event.target;
  if (btn === btns) {
    return;
  }
  if (btn.classList.contains("calc-btn-operator")) {
    handleOperator(btn.innerText);
    updateDisplay();
    return;
  }

  if (btn.classList.contains("calc-btn-decimal")) {
    handleDecimal(btn.innerText);
    updateDisplay();
    return;
  }

  if (btn.classList.contains("calc-btn-clear")) {
    handleClear(btn.innerText);
    updateDisplay();
    return;
  }

  if (btn.classList.contains("calc-btn-delete")) {
    handleDelete(btn.innerText);
    updateDisplay();
    return;
  }

  handleNumber(btn.innerText);
  updateDisplay();
});

// // Handle numbers

const handleNumber = (num) => {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = num;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      calculator.displayValue === "0" ? num : calculator.displayValue + num;
  }
};

const handleDecimal = (dot) => {
  if (calculator.waitingForSecondOperand === true) return;
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

// Reset calculator

const handleClear = (clear) => {
  resetCalculator();
  console.log(calculator);
};

const handleDelete = (del) => {
  calculator.displayValue =
    calculator.displayValue.length === 1
      ? "0"
      : calculator.displayValue.substr(0, calculator.displayValue.length - 1);
};

const handleOperator = (nextOperator) => {
  const { firstOperand, operator, displayValue } = calculator;
  const displayValueFloat = parseFloat(calculator.displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  if (firstOperand === null) {
    calculator.firstOperand = displayValueFloat;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    // const result = performCalculation[operator](firstOperand, displayValueFloat);
    const result = performCalculation(
      currentValue,
      operator,
      displayValueFloat
    );
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
};

const performCalculation = (firstOperand, operator, secondOperand) => {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "×":
      return firstOperand * secondOperand;
    case "÷":
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
};

const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
};

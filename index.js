import Calculate from "./calculate.js";
import historyPage, { getAllDataFromSessionStorage } from "./history.js";

document.addEventListener("DOMContentLoaded", function () {
  let main = document.getElementById("main");
  let theme = localStorage.getItem("theme");
  console.log(`theme class is : ${theme}`);
  main.className = theme ? theme : "theme_light";

  document.getElementById("theme").addEventListener("click", function () {
    let main = document.getElementById("main");
    let themeClass;
    if (main.classList.contains("theme_light")) {
      main.classList.replace("theme_light", "theme_dark"); // Dark mode
      themeClass = "theme_dark";
    } else {
      main.classList.replace("theme_dark", "theme_light"); // Light mode
      themeClass = "theme_light";
    }

    try {
      localStorage.setItem("theme", themeClass);
      console.log("theme class is : ", localStorage.getItem("theme"));
    } catch (err) {
      console.error(`Error in storing theme: ${err}`);
    }
  });

  const evaluate = new Calculate();
  historyPage();

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || "+-*/().".includes(key)) {
      evaluate.append(key);
    } else if (key.toLowerCase() === "p") {
      evaluate.append("π"); // Allow users to type "p" for π
    } else if (key === "Enter") {
      currentValue = evaluate.evaluate(currentValue);
      display.value = currentValue;
    } else if (key === "Backspace") {
      evaluate.delete();
    } else if (key === "Escape") {
      evaluate.clear();
    }
  });

  let toggleButtons = document.querySelector(".nd_main"); // toggle buttons
  toggleButtons.addEventListener("click", function () {
    let toggle = document.querySelectorAll(".nd_change");

    toggle.forEach((e) => {
      if (e.style.display === "none") {
        e.style.display = "block";
      } else {
        e.style.display = "none";
      }
    });

    let target = document.querySelectorAll(".nd");
    target.forEach((e) => {
      if (e.style.display === "block") {
        e.style.display = "none";
      } else {
        e.style.display = "block";
      }
    });
  });

  const display = document.getElementById("spanOutput");
  const buttons = document.getElementsByClassName("btn");

  let feFlag = 0;
  let ythroot = 0;
  let base = 0;
  let keyHistory;
  let valueHistory;

  let redian = document.getElementById("redian");
  let redFlage = 0;
  redian.addEventListener("click", function () {
    if (redFlage == 0) {
      redFlage = 1;
      redian.innerHTML = "Deg";
    } else {
      redFlage = 0;
      redian.innerHTML = "Red";
    }
  });

  let currentValue = "";

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", function () {
      const value = button.innerText.trim();
      if (currentValue[0] == "0") {
        currentValue = currentValue.replace(/^0+/, "");
        display.value = currentValue;
      }

      if (value == "CE") {
        currentValue = "";
        display.value = currentValue;
      } else if (value == ".") {
        if (currentValue.includes(".")) {
        } else {
          currentValue += value;
          display.value = currentValue;
        }
      } else if (value == "=") {
        keyHistory = currentValue;
        if (ythroot) {
          ythroot = 0;
          let exp = currentValue;
          let splitExp = exp.split("√");
          currentValue = Math.pow(splitExp[1], 1 / splitExp[0]);
          display.value = currentValue;
        }
        if (base) {
          base = 0;
          ythroot = 0;
          let exp = currentValue;
          let splitExp = exp.split("logBase");
          currentValue = Math.log(splitExp[0]) / Math.log(splitExp[1]);
          display.value = currentValue;
        }
        if (currentValue.includes("^")) {
          currentValue = evaluate.power(currentValue);
        } else {
          currentValue = evaluate.evaluate(currentValue);
          if (feFlag == 1) {
            currentValue = Number(currentValue).toExponential().toString();
            feFlag = 0;
          }
        }
        display.value = currentValue;
        valueHistory = currentValue;
        sessionStorage.setItem(keyHistory, valueHistory);
        getAllDataFromSessionStorage();
      } else if (value === "->dms") {
        currentValue = evaluate.degToDMS(parseFloat(currentValue));
        display.value = currentValue;
      } else if (value == "BackSpace") {
        currentValue = currentValue.slice(0, -1);
        display.value = currentValue;
      } else if (value == "n!") {
        keyHistory = currentValue + "!";
        currentValue = evaluate.factorial(parseInt(currentValue));
        display.value = currentValue;
        valueHistory = currentValue;
        sessionStorage.setItem(keyHistory, valueHistory);
        getAllDataFromSessionStorage();
      } else if (value == "DELETE") {
      } else if (value == "𝜫") {
        currentValue += Math.PI;
        display.value = currentValue;
      } else if (value == "exp") {
        currentValue += ".e+";
        display.value = currentValue;
      } else if (value == "e") {
        currentValue += Math.E;
        display.value = currentValue;
      } else if (value == "+/-") {
        currentValue = -parseFloat(currentValue);
        display.value = currentValue;
      } else if (value == "x²") {
        currentValue = Math.pow(parseFloat(currentValue), 2);
        display.value = currentValue;
      } else if (value == "2√x") {
        currentValue = evaluate.sqrt(currentValue);
        display.value = currentValue;
      } else if (value == "xʸ") {
        currentValue += "^";
        display.value = currentValue;
      } else if (value == "mod") {
        currentValue += "%";
        display.value = currentValue;
      } else if (value == "| x |") {
        keyHistory = "| " + currentValue + " |";
        currentValue = Math.abs(parseFloat(currentValue));
        display.value = currentValue;
        valueHistory = currentValue;
        sessionStorage.setItem(keyHistory, valueHistory);
        getAllDataFromSessionStorage();
      } else if (value == "1/x") {
        keyHistory = "1/" + currentValue;
        currentValue = Math.pow(parseFloat(currentValue), -1);
        display.value = currentValue;
        valueHistory = currentValue;
        sessionStorage.setItem(keyHistory, valueHistory);
        getAllDataFromSessionStorage();
      } else if (value == "10^x") {
        currentValue = Math.pow(10, currentValue);
        display.value = currentValue;
      } else if (value == "log") {
        currentValue = Math.log10(parseFloat(currentValue));
        display.value = currentValue;
      } else if (value == "ln") {
        currentValue = Math.log(parseFloat(currentValue));
        display.value = currentValue;
      } else if (value == "2nd") {
        currentValue = currentValue;
      } else if (value == "Trigonometry") {
        display.value = currentValue;
      } else if (value == "Trigonometry(Inverse)") {
        display.value = currentValue;
      } else if (value == "Hyp") {
        display.value = currentValue;
      } else if (value == "Hyp(Inverse)") {
        display.value = currentValue;
      } else if (value == "Function") {
        currentValue = currentValue;
      } else if (
        value == "| x |" ||
        value == "⌈x⌉" ||
        value == "⌊x⌋" ||
        value == "rand"
      ) {
        if (value == "| x |") {
          currentValue = Math.abs(currentValue);
          display.value = currentValue;
        } else if (value == "⌈x⌉") {
          currentValue = Math.ceil(currentValue);
          display.value = currentValue;
        } else if (value == "⌊x⌋") {
          currentValue = Math.floor(currentValue);
          display.value = currentValue;
        } else if (value == "rand") {
          currentValue = Math.random();
          display.value = currentValue;
        }
      } else if (value == "Red" || value == "Deg") {
      } else if (
        value == "sin" ||
        value == "cos" ||
        value == "tan" ||
        value == "sec" ||
        value == "csc" ||
        value == "cot"
      ) {
        keyHistory = value + currentValue;
        currentValue = evaluate.trigo(currentValue, redFlage, value);
        display.value = currentValue;
        valueHistory = currentValue;
        sessionStorage.setItem(keyHistory, valueHistory);
        getAllDataFromSessionStorage();
      } else if (
        value == "asin" ||
        value == "acos" ||
        value == "atan" ||
        value == "asec" ||
        value == "acsc" ||
        value == "acot"
      ) {
        keyHistory = value + currentValue;
    
        let inputVal = parseFloat(currentValue);

        switch (value) {
          case "asin":
            if (inputVal < -1 || inputVal > 1) {
              currentValue = "Invalid Input";
            } else {
              currentValue = Math.asin(inputVal);
            }
            break;

          case "acos":
            if (inputVal < -1 || inputVal > 1) {
              currentValue = "Invalid Input";
            } else {
              currentValue = Math.acos(inputVal);
            }
            break;

          case "atan":
            currentValue = Math.atan(inputVal);
            break;

          case "asec":
            if (Math.abs(inputVal) < 1) {
              currentValue = "Undefined";
            } else {
              currentValue = Math.acos(1 / inputVal);
            }
            break;

          case "acsc":
            if (Math.abs(inputVal) < 1) {
              currentValue = "Undefined";
            } else {
              currentValue = Math.asin(1 / inputVal);
            }
            break;

          case "acot":
            if (inputVal === 0) {
              currentValue = "Undefined";
            } else {
              currentValue = Math.atan(1 / inputVal);
            }
            break;
        }
        if (redFlage) {
          currentValue = currentValue * (180 / Math.PI);
        }
        display.value = currentValue;
        valueHistory = currentValue;
        sessionStorage.setItem(keyHistory, valueHistory);
        getAllDataFromSessionStorage();
      } else if (
        value == "sinh" ||
        value == "cosh" ||
        value == "tanh" ||
        value == "sech" ||
        value == "csch" ||
        value == "coth"
      ) {
        switch (value) {
          case "sinh":
            currentValue = Math.sinh(currentValue);
            break;
          case "cosh":
            currentValue = Math.cosh(currentValue);
            break;
          case "tanh":
            currentValue = Math.tanh(currentValue);
            break;
          case "sech":
            if (Math.cosh(currentValue) !== 0) {
              currentValue = 1 / Math.cosh(currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
          case "csch":
            if (Math.sinh(currentValue) !== 0) {
              currentValue = 1 / Math.sinh(currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
          case "coth":
            if (Math.tanh(currentValue) !== 0) {
              currentValue = 1 / Math.tanh(currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
        }
        display.value = currentValue;
      } else if (
        value == "arsinh" ||
        value == "arcosh" ||
        value == "artanh" ||
        value == "arsech" ||
        value == "arcsch" ||
        value == "arcoth"
      ) {
        switch (value) {
          case "arsinh":
            currentValue = Math.asinh(currentValue);
            break;
          case "arcosh":
            if (currentValue >= 1) {
              currentValue = Math.acosh(currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
          case "artanh":
            if (currentValue > -1 && currentValue < 1) {
              currentValue = Math.atanh(currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
          case "arsech":
            if (currentValue >= 0 && currentValue <= 1) {
              currentValue = Math.acosh(1 / currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
          case "arcsch":
            if (currentValue !== 0) {
              currentValue = Math.asinh(1 / currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
          case "arcoth":
            if (Math.abs(currentValue) > 1) {
              currentValue = Math.atanh(1 / currentValue);
            } else {
              currentValue = "Undefined";
            }
            break;
        }
        display.value = currentValue;
      } else if (
        value == "x^3" ||
        value == "3√x" ||
        value == "y√x" ||
        value == "2^x" ||
        value == "logᵧ(x)" ||
        value == "e^x"
      ) {
        switch (value) {
          case "x^3":
            currentValue = Math.pow(currentValue, 3);
            break;
          case "3√x":
            currentValue = Math.cbrt(currentValue);
            break;
          case "y√x":
            ythroot = 1;
            currentValue = eval(currentValue) + "√";
            break;
          case "2^x":
            currentValue = Math.pow(2, currentValue);
            break;
          case "logᵧ(x)":
            base = 1;
            currentValue = eval(currentValue) + "logBase";
            break;
          case "e^x":
            currentValue = Math.pow(Math.E, currentValue);
            break;
        }
        display.value = currentValue;
      } else if (currentValue == "Infinity") {
        currentValue = evaluate.canNotDivide(currentValue);
        display.value = currentValue;
      } else if (value == "F-E") {
        let num = parseFloat(currentValue);
        feFlag = 1;

        if (!isNaN(num)) {
          currentValue = num.toExponential(3);
          display.value = currentValue;
        } else {
          currentValue = "Error";
          display.value = currentValue;
        }
      } else {
        currentValue += value;
        display.value = currentValue;
      }
    });
  }
});

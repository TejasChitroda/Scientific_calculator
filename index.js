import Calculate from "./calculate.js";

document.addEventListener("DOMContentLoaded", function () {
  let main = document.getElementById("main");
  let theme = localStorage.getItem("theme");
  console.log(`theme class is : ${theme}`);
  main.className = theme ? theme : "theme_light";

  const evaluate = new Calculate();

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

  // this is for toggle logic

  let toggleButtons = document.querySelector(".nd_main"); // All toggle buttons
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

  let redian = document.getElementById("redian");
  let redFlage = 0;
  // Add event listener to toggle between radians and degrees
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
      const val = button.value;

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
        if (currentValue.includes("^")) {
          currentValue = evaluate.power(currentValue); // Compute power
        } else {
          currentValue = evaluate.evaluate(currentValue);
          if (feFlag == 1) {
            currentValue = Number(currentValue).toExponential().toString();
            feFlag = 0;
          } // Normal evaluation
        }
        display.value = currentValue;
      } else if (value == "BackSpace") {
        currentValue = currentValue.slice(0, -1);
        display.value = currentValue;
      } else if (value == "n!") {
        currentValue = evaluate.factorial(parseInt(currentValue));
        display.value = currentValue;
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
        currentValue = Math.abs(parseFloat(currentValue));
        display.value = currentValue;
      } else if (value == "1/x") {
        currentValue = Math.pow(parseFloat(currentValue), -1);
        display.value = currentValue;
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
        // Convert the current value to radians if needed (only once)
        if (redFlage) {
          currentValue = currentValue * (Math.PI / 180);
        }

        switch (value) {
          case "sin":
            currentValue = Math.sin(currentValue);
            break;
          case "cos":
            currentValue = Math.cos(currentValue);
            break;
          case "tan":
            currentValue = Math.tan(currentValue);
            break;
          case "sec":
            if (Math.cos(currentValue) !== 0) {
              currentValue = 1 / Math.cos(currentValue);
            } else {
              currentValue = "Undefined"; // sec(x) is undefined where cos(x) = 0
            }
            break;
          case "csc":
            if (Math.sin(currentValue) !== 0) {
              currentValue = 1 / Math.sin(currentValue);
            } else {
              currentValue = "Undefined"; // csc(x) is undefined where sin(x) = 0
            }
            break;
          case "cot":
            if (Math.tan(currentValue) !== 0) {
              currentValue = 1 / Math.tan(currentValue);
            } else {
              currentValue = "Undefined"; // cot(x) is undefined where tan(x) = 0
            }
            break;
        }

        display.value = currentValue;
      } else if (
        value == "asin" ||
        value == "acos" ||
        value == "atan" ||
        value == "asec" ||
        value == "acsc" ||
        value == "acot"
      ) {
        let inputVal = parseFloat(currentValue);

        switch (value) {
          case "asin":
            if (inputVal < -1 || inputVal > 1) {
              currentValue = "Invalid Input"; // Out of domain
            } else {
              currentValue = Math.asin(inputVal);
            }
            break;

          case "acos":
            if (inputVal < -1 || inputVal > 1) {
              currentValue = "Invalid Input"; // Out of domain
            } else {
              currentValue = Math.acos(inputVal);
            }
            break;

          case "atan":
            currentValue = Math.atan(inputVal);
            break;

          case "asec":
            if (Math.abs(inputVal) < 1) {
              currentValue = "Undefined"; // Out of domain
            } else {
              currentValue = Math.acos(1 / inputVal);
            }
            break;

          case "acsc":
            if (Math.abs(inputVal) < 1) {
              currentValue = "Undefined"; // Out of domain
            } else {
              currentValue = Math.asin(1 / inputVal);
            }
            break;

          case "acot":
            if (inputVal === 0) {
              currentValue = "Undefined"; // Out of domain
            } else {
              currentValue = Math.atan(1 / inputVal);
            }
            break;
        }

        // Convert result to degrees if necessary
        if (redFlage) {
          currentValue = currentValue * (180 / Math.PI);
        }

        display.value = currentValue;
      } else if (
        value == "sinh" ||
        value == "cosh" ||
        value == "tanh" ||
        value == "sech" ||
        value == "csch" ||
        value == "coth"
      ) {
        // Hyperbolic Trigonometric Functions
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
              currentValue = "Undefined"; // sech(x) is undefined where cosh(x) = 0
            }
            break;
          case "csch":
            if (Math.sinh(currentValue) !== 0) {
              currentValue = 1 / Math.sinh(currentValue);
            } else {
              currentValue = "Undefined"; // csch(x) is undefined where sinh(x) = 0
            }
            break;
          case "coth":
            if (Math.tanh(currentValue) !== 0) {
              currentValue = 1 / Math.tanh(currentValue);
            } else {
              currentValue = "Undefined"; // coth(x) is undefined where tanh(x) = 0
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
        // Inverse Hyperbolic Trigonometric Functions
        switch (value) {
          case "arsinh":
            currentValue = Math.asinh(currentValue);
            break;
          case "arcosh":
            // arcosh(x) is defined only for x >= 1
            if (currentValue >= 1) {
              currentValue = Math.acosh(currentValue);
            } else {
              currentValue = "Undefined"; // arcosh(x) is undefined for x < 1
            }
            break;
          case "artanh":
            // artanh(x) is defined only for -1 < x < 1
            if (currentValue > -1 && currentValue < 1) {
              currentValue = Math.atanh(currentValue);
            } else {
              currentValue = "Undefined"; // artanh(x) is undefined for |x| >= 1
            }
            break;
          case "arsech":
            // arsech(x) is defined for x >= 0 and x <= 1
            if (currentValue >= 0 && currentValue <= 1) {
              currentValue = Math.acosh(1 / currentValue);
            } else {
              currentValue = "Undefined"; // arsech(x) is undefined for x < 0 or x > 1
            }
            break;
          case "arcsch":
            // arcsch(x) is defined for all x != 0
            if (currentValue !== 0) {
              currentValue = Math.asinh(1 / currentValue);
            } else {
              currentValue = "Undefined"; // arcsch(x) is undefined for x = 0
            }
            break;
          case "arcoth":
            // arcoth(x) is defined for |x| > 1
            if (Math.abs(currentValue) > 1) {
              currentValue = Math.atanh(1 / currentValue);
            } else {
              currentValue = "Undefined"; // arcoth(x) is undefined for |x| <= 1
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
            currentValue = Math.pow(currentValue, 3); // x^3
            break;

          case "3√x":
            currentValue = Math.cbrt(currentValue); // Cube root of x
            break;

          case "y√x":
            // Handling y-th root of x. Expect input as y√x (e.g., 2√8)
            let values = currentValue.match(/^(\d+)√(\d+)$/); // Regex pattern to match "y√x" format
            if (values && values.length === 3) {
              let y = parseFloat(values[1]); // Base of the root (y)
              let x = parseFloat(values[2]); // Value inside the root (x)
              if (y > 0 && x >= 0) {
                currentValue = Math.pow(x, 1 / y); // y-th root of x
              } else {
                currentValue = "Invalid Input"; // Handle invalid input
              }
            } else {
              currentValue = "Invalid Format"; // Handle incorrect input format
            }
            break;

          case "2^x":
            currentValue = Math.pow(2, currentValue); // 2 raised to the power of x
            break;

          case "logᵧ(x)":
            // Expecting the input format like "log3(9)", where 3 is base and 9 is x
            let logValues = currentValue.match(/^log(\d+)\((\d+)\)$/); // Regex pattern to match log3(9)
            if (logValues && logValues.length === 3) {
              let y = parseFloat(logValues[1]); // Base of the logarithm
              let x = parseFloat(logValues[2]); // Number inside the logarithm
              if (y > 0 && y !== 1 && x > 0) {
                currentValue = Math.log(x) / Math.log(y); // log base y of x
              } else {
                currentValue = "Invalid Input"; // Handle invalid inputs
              }
            } else {
              currentValue = "Invalid Format"; // Handle incorrect input format
            }
            break;

          case "e^x":
            currentValue = Math.pow(Math.E, currentValue); // e raised to the power of x
            break;
        }

        display.value = currentValue;
      } else if (currentValue == "Infinity") {
        currentValue = evaluate.canNotDivide(currentValue);
        display.value = currentValue;
      } else if (value == "F-E") {
        // convert to float
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

function changeTheme() {
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
}

// class Calculate {
//     constructor() {
//         this.currentValue = '';
//         this.display = document.getElementById("spanOutput");
//     }

//     // evaluate(currentValue) {
//     //     try {
//     //         currentValue = currentValue.replace("log", "Math.log");
//     //         currentValue = currentValue.replace("π", Math.PI.toString());

//     //         const result = eval(currentValue);
//     //         if (isNaN(result) || result === undefined) {
//     //             return "Error";
//     //         }
//     //         return result.toString();
//     //     } catch (err) {
//     //         console.error("Evaluation error: ", err);
//     //         return "Error";
//     //     }
//     // }

//     canNotDivide(currentValue) {
//         let i = currentValue.includes('/0');
//         if (i) {
//             return 'Infinity';
//         } else {
//             return '';
//         }
//     }

//     factorial(n) {
//         if (n < 0) return "Error";
//         let result = 1;
//         for (let i = 1; i <= n; i++) {
//             result *= i;
//         }
//         return result.toString();
//     }

//     sqrt(currentValue) {
//         let num = parseFloat(currentValue);
//         return num >= 0 ? Math.sqrt(num).toString() : "Invalid Input";
//     }

//     power(currentValue) {
//         let values = currentValue.split("^");
//         if (values.length === 2) {
//             let base = parseFloat(values[0]);
//             let exponent = parseFloat(values[1]);
//             if (!isNaN(base) && !isNaN(exponent)) {
//                 return Math.pow(base, exponent).toString();
//             }
//         }
//         return "Invalid Format";
//     }

//     append(value) {
//         if (value === "π") {
//             this.currentValue += Math.PI.toString();
//         } else if (this.display.value === "0" && value !== ".") {
//             this.currentValue = value;
//         } else {
//             this.currentValue += value;
//         }
//         this.updateScreen();
//     }

//     updateScreen() {
//         this.display.value = this.currentValue;
//     }

// }

// Calculate.prototype.evaluate = function(currentValue) {
//     try {
//         currentValue = currentValue.replace("log", "Math.log");
//         currentValue = currentValue.replace("π", Math.PI.toString());

//         const result = eval(currentValue);
//         if (isNaN(result) || result === undefined) {
//             return "Error";
//         }
//         return result.toString();
//     } catch (err) {
//         console.error("Evaluation error: ", err);
//         return "Error";
//     }
// }

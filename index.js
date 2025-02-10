document.addEventListener("DOMContentLoaded", function () {
    let main = document.getElementById("main");
    let theme = localStorage.getItem("theme");
    console.log(`theme class is : ${theme}`);
    main.className = theme ? theme : "theme_light";

    const evaluate = new Calculate();


    document.addEventListener("keydown", event => {
        const key = event.key;
    
        if (!isNaN(key) || "+-*/().".includes(key)) {
            evaluate.append(key);
        }
        else if (key.toLowerCase() === "p") {
            evaluate.append("π"); // Allow users to type "p" for π
        }
        else if (key === "Enter") {
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
    toggleButtons.addEventListener('click', function () {
        let toggle = document.querySelectorAll(".nd_change");

        toggle.forEach((e) => {
            if (e.style.display === "none") {
                e.style.display = "block"
            } else {
                e.style.display = 'none'
            }
        })

        let target = document.querySelectorAll(".nd");
        target.forEach((e) => {
            if (e.style.display === "block") {
                e.style.display = "none"
            } else {
                e.style.display = 'block'
            }
        })

    })



    const display = document.getElementById("spanOutput");
    const buttons = document.getElementsByClassName("btn");

    let redian = document.getElementById('redian');
    let redFlage = 0;  // Initially, set the flag to 0 (radians)

    // Add event listener to toggle between radians and degrees
    redian.addEventListener('click', function () {
        if (redFlage == 0) {
            redFlage = 1;
            redian.innerHTML = "Deg"; // Display "Deg" when flag is 1
        } else {
            redFlage = 0;
            redian.innerHTML = "Red"; // Display "Red" when flag is 0
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
                if (currentValue.includes('.')) {

                } else {
                    currentValue += value;
                    display.value = currentValue;
                }
            }
            else if (value == "=") {
                if (currentValue.includes("^")) {
                    currentValue = evaluate.power(currentValue); // Compute power
                } else {
                    currentValue = evaluate.evaluate(currentValue); // Normal evaluation
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
                currentValue += "e+";
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
                currentValue += "^"; // Append "^" for exponentiation
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
                currentValue += "10^";
                display.value = currentValue;
            }
            else if (value == "log") {
                currentValue = Math.log10(parseFloat(currentValue));
                display.value = currentValue;
            }
            else if (value == "ln") {
                currentValue = Math.log(parseFloat(currentValue));
                display.value = currentValue;
            } else if (value == "2nd") {
                currentValue = currentValue;
            } else if (value == "Trigonometry") {

                display.value = currentValue;

            } else if (value == "Trigonometry(Inverse)") {
                display.value = currentValue;
            } else if (value == 'Hyp') {
                display.value = currentValue;
            } else if (value == "Hyp(Inverse)") {
                display.value = currentValue;
            }
            else if (value == "Function") {
                currentValue = currentValue;
            } else if (value == "| x |" || value == "⌈x⌉" || value == "⌊x⌋" || value == "rand") {
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

            }
            else if (value == 'sin' || value == 'cos' || value == 'tan' || value == 'sec' || value == 'csc' || value == 'cot') {
                // Convert the current value to radians if needed (only once)
                if (redFlage) {
                    currentValue = currentValue * (Math.PI / 180);
                }

                switch (value) {
                    case 'sin':
                        currentValue = Math.sin(currentValue);
                        break;
                    case 'cos':
                        currentValue = Math.cos(currentValue);
                        break;
                    case 'tan':
                        currentValue = Math.tan(currentValue);
                        break;
                    case 'sec':
                        // Avoid division by zero (if cos(x) = 0, sec(x) will be infinity)
                        if (Math.cos(currentValue) !== 0) {
                            currentValue = 1 / Math.cos(currentValue);
                        } else {
                            currentValue = "Undefined"; // sec(x) is undefined where cos(x) = 0
                        }
                        break;
                    case 'csc':
                        // Avoid division by zero (if sin(x) = 0, csc(x) will be infinity)
                        if (Math.sin(currentValue) !== 0) {
                            currentValue = 1 / Math.sin(currentValue);
                        } else {
                            currentValue = "Undefined"; // csc(x) is undefined where sin(x) = 0
                        }
                        break;
                    case 'cot':
                        // Avoid division by zero (if tan(x) = 0, cot(x) will be infinity)
                        if (Math.tan(currentValue) !== 0) {
                            currentValue = 1 / Math.tan(currentValue);
                        } else {
                            currentValue = "Undefined"; // cot(x) is undefined where tan(x) = 0
                        }
                        break;
                }

                display.value = currentValue;

            } else if (value == 'asin' || value == 'acos' || value == 'atan' || value == 'asec' || value == 'acsc' || value == 'acot') {
                // Convert the current value to radians if needed (only once)
                if (redFlage) {
                    currentValue = currentValue * (Math.PI / 180);
                }
            
                switch (value) {
                    case 'asin':
                        // asin(x) returns the angle whose sine is x, result is in radians
                        currentValue = Math.asin(currentValue);
                        break;
                    case 'acos':
                        // acos(x) returns the angle whose cosine is x, result is in radians
                        currentValue = Math.acos(currentValue);
                        break;
                    case 'atan':
                        // atan(x) returns the angle whose tangent is x, result is in radians
                        currentValue = Math.atan(currentValue);
                        break;
                    case 'asec':
                        // asec(x) returns the angle whose secant is x
                        // sec(x) = 1 / cos(x), so asec(x) = 1 / cos(x)
                        if (Math.abs(currentValue) >= 1) {  // secant must be >= 1 or <= -1
                            currentValue = Math.acos(1 / currentValue);
                        } else {
                            currentValue = "Undefined"; // asec(x) is undefined for |x| < 1
                        }
                        break;
                    case 'acsc':
                        // acsc(x) returns the angle whose cosecant is x
                        // csc(x) = 1 / sin(x), so acsc(x) = 1 / sin(x)
                        if (Math.abs(currentValue) >= 1) {  // cosecant must be >= 1 or <= -1
                            currentValue = Math.asin(1 / currentValue);
                        } else {
                            currentValue = "Undefined"; // acsc(x) is undefined for |x| < 1
                        }
                        break;
                    case 'acot':
                        // acot(x) returns the angle whose cotangent is x
                        // cot(x) = 1 / tan(x), so acot(x) = 1 / tan(x)
                        if (currentValue !== 0) {  // cotangent cannot be zero
                            currentValue = Math.atan(1 / currentValue);
                        } else {
                            currentValue = "Undefined"; // acot(x) is undefined for x = 0
                        }
                        break;
                }
            
                display.value = currentValue;
            }
            else if (value == 'sinh' || value == 'cosh' || value == 'tanh' || value == 'sech' || value == 'csch' || value == 'coth') {
                // Hyperbolic Trigonometric Functions
                switch (value) {
                    case 'sinh':
                        currentValue = Math.sinh(currentValue);
                        break;
                    case 'cosh':
                        currentValue = Math.cosh(currentValue);
                        break;
                    case 'tanh':
                        currentValue = Math.tanh(currentValue);
                        break;
                    case 'sech':
                        // Avoid division by zero (if cosh(x) = 0, sech(x) will be infinity)
                        if (Math.cosh(currentValue) !== 0) {
                            currentValue = 1 / Math.cosh(currentValue);
                        } else {
                            currentValue = "Undefined"; // sech(x) is undefined where cosh(x) = 0
                        }
                        break;
                    case 'csch':
                        // Avoid division by zero (if sinh(x) = 0, csch(x) will be infinity)
                        if (Math.sinh(currentValue) !== 0) {
                            currentValue = 1 / Math.sinh(currentValue);
                        } else {
                            currentValue = "Undefined"; // csch(x) is undefined where sinh(x) = 0
                        }
                        break;
                    case 'coth':
                        // Avoid division by zero (if tanh(x) = 0, coth(x) will be infinity)
                        if (Math.tanh(currentValue) !== 0) {
                            currentValue = 1 / Math.tanh(currentValue);
                        } else {
                            currentValue = "Undefined"; // coth(x) is undefined where tanh(x) = 0
                        }
                        break;
                }
            
                display.value = currentValue;
            } 
            else if (value == 'arsinh' || value == 'arcosh' || value == 'artanh' || value == 'arsech' || value == 'arcsch' || value == 'arcoth') {
                // Inverse Hyperbolic Trigonometric Functions
                switch (value) {
                    case 'arsinh':
                        currentValue = Math.asinh(currentValue);
                        break;
                    case 'arcosh':
                        // arcosh(x) is defined only for x >= 1
                        if (currentValue >= 1) {
                            currentValue = Math.acosh(currentValue);
                        } else {
                            currentValue = "Undefined"; // arcosh(x) is undefined for x < 1
                        }
                        break;
                    case 'artanh':
                        // artanh(x) is defined only for -1 < x < 1
                        if (currentValue > -1 && currentValue < 1) {
                            currentValue = Math.atanh(currentValue);
                        } else {
                            currentValue = "Undefined"; // artanh(x) is undefined for |x| >= 1
                        }
                        break;
                    case 'arsech':
                        // arsech(x) is defined for x >= 0 and x <= 1
                        if (currentValue >= 0 && currentValue <= 1) {
                            currentValue = Math.acosh(1 / currentValue);
                        } else {
                            currentValue = "Undefined"; // arsech(x) is undefined for x < 0 or x > 1
                        }
                        break;
                    case 'arcsch':
                        // arcsch(x) is defined for all x != 0
                        if (currentValue !== 0) {
                            currentValue = Math.asinh(1 / currentValue);
                        } else {
                            currentValue = "Undefined"; // arcsch(x) is undefined for x = 0
                        }
                        break;
                    case 'arcoth':
                        // arcoth(x) is defined for |x| > 1
                        if (Math.abs(currentValue) > 1) {
                            currentValue = Math.atanh(1 / currentValue);
                        } else {
                            currentValue = "Undefined"; // arcoth(x) is undefined for |x| <= 1
                        }
                        break;
                }
            
                display.value = currentValue;
            }
            
            else if (value == "x^3" || value == "3√x" || value == "y√x" || value == "2^x" || value == "logᵧ(x)" || value == "e^x") {
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

                // Update the display
                display.value = currentValue;
            }

            else if (value == "F-E") {
                // convert to float
                let num = parseFloat(currentValue);
                
                // Check if the value is a valid number
                if (!isNaN(num)) {
                    // Convert to exponential form with a certain number of decimals
                    // You can adjust the number of decimals as needed (e.g., 3 decimals here)
                    currentValue = num.toExponential(3);  
                    display.value = currentValue;
                } else {
                    // Handle invalid input
                    currentValue = "Error";
                    display.value = currentValue;
                }
            }
            

            else {
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




class Calculate {

    constructor(currentValue, display) {
        this.currentValue = currentValue;
        this.display = display;
    }

    evaluate(currentValue) {
        try {
            currentValue = currentValue.replace("log", "Math.log");
            currentValue = currentValue.replace("π", Math.PI); // Make sure π is replaced by Math.PI
            currentValue = currentValue.replace("e", Math.E); // Ensure e is replaced by Math.E
    
            // Make sure that the expression is valid before evaluation
            const result = eval(currentValue);
            if (isNaN(result) || result === undefined) {
                return "Error";
            }
            return result;
        } catch (err) {
            console.error("Evaluation error: ", err);
            return "Error"; // Return "Error" in case of any issue in evaluation
        }
    }
    

    factorial(n) {
        if (n < 0) return "Error";
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    sqrt(currentValue) {
        let num = parseFloat(currentValue);
        return num >= 0 ? Math.sqrt(num) : "Invalid Input";
    }

    power(currentValue) {
        let values = currentValue.split("^");
        if (values.length === 2) {
            let base = parseFloat(values[0]);
            let exponent = parseFloat(values[1]);
            if (!isNaN(base) && !isNaN(exponent)) {
                return Math.pow(base, exponent);
            }
        }
        return "Invalid Format";
    }


    append(value) {
        if (value === "π") {
            this.expression += Math.PI;
        } else if (this.screen.innerText === "0" && value !== ".") {
            this.expression = value;
        } else {
            this.expression += value;
        }
        this.updateScreen();
    }

}
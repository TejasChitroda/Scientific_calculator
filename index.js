// document.addEventListener("DOMContentLoaded", function () {
//   let main = document.getElementById("main");
//   // main.classList.remove();
//   let theme = localStorage.getItem("theme");
//   console.log(`theme class is : ${theme}`);
//   main.className = theme ? theme : "theme_light";

//   const evaluate = new Calculate();

//   const display = document.getElementById("spanOutput"); // Corrected reference
//   const buttons = document.getElementsByClassName("btn");

//   let currentValue = "";

//   for (let i = 0; i < buttons.length; i++) {
//     const button = buttons[i];
//     button.addEventListener("click", function () {
//       const value = button.innerText;
//       if (value == "CE") {
//         currentValue = "";
//         display.value = currentValue; // Clear the input field when "CE" is pressed
//       } else if (value == "=") {
//         evaluate.evaluate(currentValue, display); // Pass currentValue and display element
//       } else if (value == "BackSpace") {
//         currentValue = currentValue.slice(0, -1);
//         display.value = currentValue;
//       } else if (value == "n!") {
//         currentValue = evaluate.factorial(currentValue);
//         display.value = currentValue;
//       } else if (value == "𝜫") {
//         currentValue = currentValue.replace("𝜫", "Math.PI");

//         // currentValue += 3.14;
//         display.value = currentValue;
//       } else if (value == "exp") {
//         currentValue += ".e+";
//         display.value = currentValue;
//       } else if (value == "e") {
//         currentValue += 2.7178688518;
//         display.value = currentValue;
//       } else if (value == "+/-") {
//         let x = currentValue;
//         currentValue = -1 * currentValue;
//         display.value = currentValue;
//       } else if (value == "x²") {
//         currentValue *= currentValue;
//         display.value = currentValue;
//       } else if (value == "2√x") {
//         evaluate.sqrt(currentValue, display);
//       } else if (value == "xʸ") {
//         currentValue +="^"
//         evaluate.power(currentValue , display)
//       }

//       // for mod
//       else if (value == "mod") {
//       } else if (value == "| x |") {
//         currentValue = currentValue.replace("| x |", "Math.abs");
//         // currentValue = Math.abs(currentValue);
//         display.value = currentValue;
//       } else if (value == "1/x") {
//         currentValue = Math.pow(currentValue, -1);
//         display.value = currentValue;
//       } else {
//         currentValue += value;
//         display.value = currentValue; // Update the input field
//       }
//     });
//   }
// });

// function changeTheme() {
//   let main = document.getElementById("main");
//   let themeClass;
//   if (main.classList.contains("theme_light")) {
//     main.classList.replace("theme_light", "theme_dark"); // dark mode
//     themeClass = "theme_dark";
//   } else {
//     main.classList.replace("theme_dark", "theme_light"); // light mode
//     themeClass = "theme_light";
//   }

//   try {
//     localStorage.setItem("theme", themeClass);
//     console.log("theme class is : ", localStorage.getItem("theme"));
//   } catch (err) {
//     console.error(`error in storing theme: ${err}`);
//   }
// }

// class Calculate {
//   // for normal calculation
//   evaluate(currentValue, display) {
//     try {
//       currentValue = currentValue.replace("log", "Math.log");
//       const result = eval(currentValue);
//       display.value = result;
//       currentValue = parseFloat(result);
//     } catch (err) {
//       display.value = "Error";
//     }
//   }

//   factorial(currentValue) {
//     if (currentValue < 0) {
//       return "error";
//     }
//     let result = 1;
//     for (let i = 1; i <= currentValue; i++) {
//       result *= i;
//     }

//     return result;
//   }

//   sqrt(currentValue, display) {
//     let num = parseFloat(currentValue);
//     if (num >= 0) {
//       let result = Math.sqrt(num);
//       display.value = result;
//     } else {
//       display.value = "Invalid Input";
//     }
//   }

//   power(currentValue, display) {
//     let values = currentValue.split("^"); // Split input by "^"
//     if (values.length === 2) {
//         let base = parseFloat(values[0]); // Convert base to number
//         let exponent = parseFloat(values[1]); // Convert exponent to number
//         if (!isNaN(base) && !isNaN(exponent)) {
//             let result = Math.pow(base, exponent); // Compute power
//             display.value = result; // Update display
//         } else {
//             display.value = "Invalid Input"; // Handle invalid cases
//         }
//     } else {
//         display.value = "Invalid Format"; // Handle missing exponent case
//     }
// }

//   modulo(currentValue) {}
// }



 
document.addEventListener("DOMContentLoaded", function () {
    let main = document.getElementById("main");
    let theme = localStorage.getItem("theme");
    console.log(`theme class is : ${theme}`);
    main.className = theme ? theme : "theme_light";




    // this is for toggle logic


    let toggleButtons = document.querySelector(".nd_main"); // All toggle buttons
    toggleButtons.addEventListener('click' , function () {
        let toggle = document.querySelectorAll(".nd_change");

        toggle.forEach((e) => {
            if(e.style.display === "none") {
                e.style.display = "block"
            } else {
                e.style.display = 'none'
            }
        })

        let target = document.querySelectorAll(".nd");
        target.forEach((e) => {
            if(e.style.display === "block") {
                e.style.display = "none"
            } else {
                e.style.display = 'block'
            }
        })

    })


    // let toggleTrigo = document.querySelector(".drop_main_nd");

    // toggleTrigo.addEventListener('click' , function () {

    //     let toggle = document.querySelectorAll(".drop_2nd");
        
    //     toggle.addEventListener('click' , function () {
    //         toggle.forEach((e) => {
    //             if(e.style.display === "none") {
    //                 e.style.display = "block"
    //             } else {
    //                 e.style.display = 'none'
    //             }
    //         })
    
    //         let target = document.querySelectorAll(".drop_nd");
    //         target.forEach((e) => {
    //             if(e.style.display === "block") {
    //                 e.style.display = "none"
    //             } else {
    //                 e.style.display = 'block'
    //             }
    //         })
    //     })
    // })





    const display = document.getElementById("spanOutput");
    const buttons = document.getElementsByClassName("btn");
    
    const evaluate = new Calculate();
    
    let currentValue = "";

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener("click", function () {
            const value = button.innerText.trim();

            if (value == "CE") {
                currentValue = "";
                display.value = currentValue;
            } else if (value == "=") {
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
            } else if(value == "2nd") {
                currentValue = currentValue;
            } else if(value == "Trigonometry") {
               currentValue = evaluate.trigonometry(currentValue)
               display.value = currentValue;
            } else if(value == "Function") {
                currentValue = currentValue;
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

    constructor(currentValue , display) {
        this.currentValue = currentValue;
        this.display = display;
    }

    evaluate(currentValue) {
        try {
            currentValue = currentValue.replace("log", "Math.log");
            return eval(currentValue); // Evaluate standard math expressions
        } catch (err) {
            return "Error";
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

    
    
}
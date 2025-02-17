export default class Calculate {
    constructor() {
        this.currentValue = '';
        this.display = document.getElementById("spanOutput");
    }

    // evaluate(currentValue) {
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

    canNotDivide(currentValue) {
        let i = currentValue.includes('/0');
        if (i) {
            return 'Infinity';
        } else {
            return '';
        }
    }

    factorial(n) {
        if (n < 0) return "Error";
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result.toString();
    }

    sqrt(currentValue) {
        let num = parseFloat(currentValue);
        return num >= 0 ? Math.sqrt(num).toString() : "Invalid Input";
    }

    power(currentValue) {
        let values = currentValue.split("^");
        if (values.length === 2) {
            let base = parseFloat(values[0]);
            let exponent = parseFloat(values[1]);
            if (!isNaN(base) && !isNaN(exponent)) {
                return Math.pow(base, exponent).toString();
            }
        }
        return "Invalid Format";
    }

    append(value) {
        if (value === "π") {
            this.currentValue += Math.PI.toString();
        } else if (this.display.value === "0" && value !== ".") {
            this.currentValue = value;
        } else {
            this.currentValue += value;
        }
        this.updateScreen();
    }

    updateScreen() {
        this.display.value = this.currentValue;
    }

    
}

Calculate.prototype.evaluate = function(currentValue) {
    try {
        currentValue = currentValue.replace("log", "Math.log");
        currentValue = currentValue.replace("π", Math.PI.toString());
        
        const result = eval(currentValue);
        
        if (isNaN(result) || result === undefined) {
            return "Error";
        }
        return result.toString();
    } catch (err) {
        console.error("Evaluation error: ", err);
        return "Error"; 
    }
}


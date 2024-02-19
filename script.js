document.addEventListener("DOMContentLoaded", function () {
    let display = document.getElementById('display');
    let ongoingCalculation = '';
    let ans = 0;

    document.addEventListener('click', function (event) {
        const target = event.target;

        if (target.matches('button')) {
            const value = target.innerText;

            if (value === 'C') {
                clearAll();
            } else if (value === '=') {
                calculate();
            } else if (value === 'DEL') {
                deleteLast();
            } else {
                appendToDisplay(value);
            }
        }
    });

    function appendToDisplay(value) {
        if (display.value === 'Error' || display.value === 'Infinity') {
            clearDisplay();
        }
    
        const lastChar = display.value.slice(-1);
    
        if (lastChar === '=') {
            ongoingCalculation = ans + value;
        } else {
            ongoingCalculation += value;
        }
    
        // Check for percentage input
        if (value === '%' && /^\d+(\.\d+)?$/.test(ongoingCalculation)) {
            const percentageValue = (parseFloat(ongoingCalculation) * 0.01).toString();
            ongoingCalculation = percentageValue;
        }
    
        display.value = ongoingCalculation;
    }
    

    function clearDisplay() {
        display.value = '';
    }

    function calculate() {
        try {
            let expression = ongoingCalculation;
            ans = eval(expression);
            display.value = ongoingCalculation + ' = ' + ans;
            ongoingCalculation = ans.toString();
        } catch (error) {
            display.value = 'Error';
        }
    }

    function deleteLast() {
        let currentDisplay = display.value;
        display.value = currentDisplay.slice(0, -1);
        ongoingCalculation = display.value;
    }

    function clearAll() {
        display.value = '';
        ongoingCalculation = '';
        ans = 0;
    }
});

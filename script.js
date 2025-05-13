document.addEventListener('DOMContentLoaded', function(){
    const calculatorScreen = document.getElementById('calculator-screen');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    //Function to update Calculator Screen
    function updateScreen(){
        calculatorScreen.value = currentInput;
    }

    //Function to clear all
    function clearAll(){
        currentInput = '0';
        operator = null;
        previousInput  = null;
        updateScreen();
    }

    //Function to clear the last entry
    function clear(){
        if(currentInput.length > 1){
            currentInput = currentInput.slice(0, -1);
        }
        else{
            currentInput = '0';
        }
        updateScreen();
    }

    //Function to input number
    function inputNumber(value) {
        if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        } else {
            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
        updateScreen();
    }

    //Function to input operator
    function inputOperator(value) {
        if(operator !== null && previousInput !== null){
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }

    //function to store last calculated answer
    function storeAnswer() {
        localStorage.setItem('result', currentInput);
    }

    //function to retrieve last calculated answer
    function getAnswer() {
        const storedResult = localStorage.getItem('result');
        if (storedResult) {
            currentInput = storedResult;
            updateScreen();
        }
    }

    //Function to perform calculations
    function calculate(){
        if(operator === null || previousInput === null){
            return;
        }

        let result = 0;
        const previous = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = previous + current;
                break;
            case'-':
                result = previous - current;
                break;
            case'*':
                result = previous * current;
                break;
            case '/':
                if (current === 0) {
                    updateScreen("Error");
                    return;
                }
                result = previous / current;
                break;
        }

        currentInput = String(parseFloat(result.toFixed(6)));
        operator = null;
        previousInput = null;
        updateScreen();
    }

    //Click event listeners to the buttons
const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'all-clear'){
                clearAll();
            }
            else if (value === 'clear'){
                clear();
            }
            else if (value === 'Ans'){
                getAnswer();
            }
            else if(value === '='){
                calculate();
                storeAnswer();
            }
            else if (['+', '-', '*', '/'].includes(value)){
                inputOperator(value);
            }
            else{
                inputNumber(value);
            }
        });
    });

    updateScreen();
});
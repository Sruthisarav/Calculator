let input = [];
let buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    btn.addEventListener('click', e => getInput(e));
}
function getInput(e) {
    let value = e.target.textContent;
    let category = e.target.id;
    let display = document.getElementById('display');
    if (category === 'operator') {
        if (input.length === 0) {
            input.push(0);
        }
        input.push(value);
    } else if (category === 'number') {
        if (typeof input[input.length - 1] === 'number') {
            input[input.length - 1] = input[input.length - 1] * 10 + Number(value);
            display.innerHTML = input[input.length - 1];
        } else {
            input.push(Number(value));
            display.innerHTML = Number(value);
        }
    } else if (category === 'equal') {
        if (input.length === 0) {
            input = [0];
        } else if (typeof input[input.length-1] === 'string') {
            input.splice(input.length - 1);
        }
        result = calculate();
        str = result.toString();
        if (str.length > 10) {
            result = Number(result.toFixed(10 - str.split('.')[0].length));
        }
        display.innerHTML = result;
    } else if (category === 'clear') {
        input = [];
        display.innerHTML = 0;
    }
}

function calculate() {
    const operators = ['x', '÷', '%'];
    let i = 0;
    let result;
    while(i < input.length) {
        if (operators.includes(input[i])) {
            result = operate([input[i], input[i-1], input[i+1]]);
            input.splice(i-1, 3, result);
            i -= 1;
        } else {
            i+=1;
        }
    }
    while(input.length !== 1) {
        result = operate([input[1], input[0], input[2]]);
        input.splice(0, 3, result);
    }
    return input[0];
}

function operate(arr) {
    let operator = arr[0];
    arr.splice(0, 1);
    let numbers = arr;
    return operator === '+'
        ? add(numbers)
        : operator === '-'
            ? subtract(numbers)
            : operator === 'x'
                ? multiply(numbers)
                : divide(numbers);
}

function add(arr) {
    return arr.reduce(function(result, number) {
        return result + number;
    }, 0);
}
// First element of the array is the number being subtracted from
function subtract(arr) {
    let result = arr.length === 0 ? 0 :arr[0];
    for(let i = 1; i < arr.length; i++) {
        result -= arr[i];
    }
    return result;
}
function multiply(arr) {
    if (arr.length === 0) {
        return 0;
    }
    return arr.reduce(function(result, number) {
        return result *= number;
    }, 1)
}
// First element of the array is the numerator
function divide(arr) {
    let result = arr.length === 0 ? 0 : arr[0];
    for (let i = 1; i < arr.length; i++) {
        result /= arr[i];
    }
    return result;
}
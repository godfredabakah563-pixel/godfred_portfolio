const display = document.getElementById("display");
const expressionDisplay = document.getElementById("expression");

const buttons = document.querySelectorAll(".buttons button");

const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");
const themeBtn = document.getElementById("themeBtn");

let expression = "";
let currentNumber = "";
let justCalculated = false;


// ===============================
// BUTTONS
// ===============================

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        handleInput(button.textContent);

    });

});


// ===============================
// MAIN INPUT
// ===============================

function handleInput(value) {

    // Numbers
    if (!isNaN(value)) {

        if (justCalculated) {

            expression = "";
            currentNumber = "";

            justCalculated = false;
        }

        currentNumber += value;

        expression += value;

        display.value = currentNumber;

        updateExpression();

        return;
    }


    // Decimal
    if (value === ".") {

        if (currentNumber.includes(".")) {
            return;
        }

        if (currentNumber === "") {
            currentNumber = "0";
            expression += "0";
        }

        currentNumber += ".";

        expression += ".";

        display.value = currentNumber;

        updateExpression();

        return;
    }


    // Operators
    if (["+", "−", "×", "÷"].includes(value)) {

        if (currentNumber === "") {
            return;
        }

        expression += ` ${value} `;

        currentNumber = "";

        updateExpression();

        return;
    }


    // Equals
    if (value === "=") {

        calculate();

        return;
    }


    // Clear
    if (value === "AC") {

        expression = "";
        currentNumber = "";

        display.value = "0";

        expressionDisplay.textContent = "Ready";

        justCalculated = false;

        return;
    }


    // Delete
    if (value === "DEL") {

        if (justCalculated) {
            return;
        }

        expression = expression.slice(0, -1);

        currentNumber = currentNumber.slice(0, -1);

        display.value = currentNumber || "0";

        updateExpression();

        return;
    }


    // Percentage
    if (value === "%") {

        if (currentNumber === "") {
            return;
        }

        const percentage =
            Number(currentNumber) / 100;

        expression =
            expression.slice(
                0,
                expression.length - currentNumber.length
            );

        expression += percentage;

        currentNumber = String(percentage);

        display.value = currentNumber;

        updateExpression();

    }

}


// ===============================
// CALCULATE
// ===============================

function calculate() {

    if (expression.trim() === "") {
        return;
    }


    try {

        let calculation = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");


        // Prevent incomplete expressions
        if (/[+\-*/]\s*$/.test(calculation)) {
            return;
        }


        const result = Function(
            `"use strict"; return (${calculation})`
        )();


        if (!Number.isFinite(result)) {

            display.value = "Error";

            expressionDisplay.textContent =
                expression;

            expression = "";
            currentNumber = "";

            justCalculated = true;

            return;
        }


        const formattedResult =
            Number.isInteger(result)
                ? result
                : Number(result.toFixed(10));


        display.value = formattedResult;

        expressionDisplay.textContent =
            `${expression} =`;


        addHistory(
            expression,
            formattedResult
        );


        expression =
            String(formattedResult);

        currentNumber =
            String(formattedResult);

        justCalculated = true;

    }

    catch (error) {

        display.value = "Error";

        expressionDisplay.textContent =
            "Invalid expression";

        expression = "";
        currentNumber = "";

        justCalculated = true;
    }

}


// ===============================
// EXPRESSION DISPLAY
// ===============================

function updateExpression() {

    expressionDisplay.textContent =
        expression || "Ready";

}


// ===============================
// HISTORY
// ===============================

let history =
    JSON.parse(
        localStorage.getItem("nexaHistory")
    ) || [];


function addHistory(expressionText, result) {

    history.unshift({

        expression: expressionText,

        result: result

    });


    if (history.length > 15) {

        history.pop();

    }


    saveHistory();

    displayHistory();

}


function saveHistory() {

    localStorage.setItem(

        "nexaHistory",

        JSON.stringify(history)

    );

}


function displayHistory() {

    historyList.innerHTML = "";


    if (history.length === 0) {

        historyList.innerHTML =
            `<p class="empty-history">
                No calculations yet
            </p>`;

        return;

    }


    history.forEach(function(item) {

        const historyItem =
            document.createElement("div");


        historyItem.className =
            "history-item";


        historyItem.innerHTML = `

            <span class="history-expression">

                ${item.expression}

            </span>

            <span class="history-result">

                ${item.result}

            </span>

        `;


        historyList.appendChild(historyItem);

    });

}


clearHistory.addEventListener(
    "click",
    function() {

        history = [];

        saveHistory();

        displayHistory();

    }
);


displayHistory();


// ===============================
// THEME
// ===============================

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light-mode"
        );


        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            themeBtn.textContent = "🌙";

        }

        else {

            themeBtn.textContent = "☀️";

        }

    }
);


// ===============================
// KEYBOARD
// ===============================

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        if (key >= "0" && key <= "9") {

            handleInput(key);

        }

        else if (key === ".") {

            handleInput(".");

        }

        else if (key === "+") {

            handleInput("+");

        }

        else if (key === "-") {

            handleInput("−");

        }

        else if (key === "*") {

            handleInput("×");

        }

        else if (key === "/") {

            event.preventDefault();

            handleInput("÷");

        }

        else if (
            key === "Enter" ||
            key === "="
        ) {

            handleInput("=");

        }

        else if (key === "Backspace") {

            handleInput("DEL");

        }

        else if (key === "Escape") {

            handleInput("AC");

        }

    }
);

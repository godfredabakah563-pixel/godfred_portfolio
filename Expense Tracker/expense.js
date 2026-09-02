const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const themeToggle = document.getElementById("theme-toggle");
const search = document.getElementById("search");

let incomeTotal = 0;
let expenseTotal = 0;

let transactions = [];


/* =========================
   LOAD SAVED TRANSACTIONS
========================= */

const savedTransactions = localStorage.getItem("transactions");

if (savedTransactions) {
  transactions = JSON.parse(savedTransactions);
}


/* =========================
   DISPLAY TRANSACTIONS
========================= */

function displayTransactions() {

  transactionList.innerHTML = "";

  const searchText = search
    ? search.value.toLowerCase()
    : "";

  transactions.forEach(function(transaction, index) {

    // Search filter
    if (
      !transaction.description
        .toLowerCase()
        .includes(searchText)
    ) {
      return;
    }

    const row = document.createElement("tr");

    const sign =
      transaction.type === "expense"
        ? "-"
        : "+";

    const amount =
      Number(transaction.amount).toFixed(2);

    row.innerHTML = `
      <td>${transaction.description}</td>

      <td class="${transaction.type}">
        ${sign} GH₵${amount}
      </td>

      <td>${transaction.date || ""}</td>

      <td>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    transactionList.appendChild(row);


    /* =========================
       DELETE TRANSACTION
    ========================= */

    const deleteButton =
      row.querySelector(".delete-btn");

    deleteButton.addEventListener(
      "click",
      function() {

        transactions.splice(index, 1);

        localStorage.setItem(
          "transactions",
          JSON.stringify(transactions)
        );

        displayTransactions();
        updateTotals();
      }
    );

  });
}


/* =========================
   UPDATE TOTALS
========================= */

function updateTotals() {

  incomeTotal = 0;
  expenseTotal = 0;

  transactions.forEach(function(transaction) {

    const amount = Number(transaction.amount);

    if (transaction.type === "expense") {

      expenseTotal += amount;

    } else {

      incomeTotal += amount;

    }

  });

  const balanceTotal =
    incomeTotal - expenseTotal;


  income.textContent =
    `GH₵${incomeTotal.toFixed(2)}`;

  expense.textContent =
    `GH₵${expenseTotal.toFixed(2)}`;

  balance.textContent =
    `GH₵${balanceTotal.toFixed(2)}`;
}


/* =========================
   ADD TRANSACTION
========================= */

form.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const description =
      document.getElementById("description").value.trim();

    const amount =
      Number(document.getElementById("amount").value);

    const type =
      document.getElementById("type").value;


    // Make sure the amount is valid
    if (!description || amount <= 0) {
      return;
    }


    const transaction = {

      description: description,

      amount: amount,

      type: type,

      date: new Date().toLocaleDateString()

    };


    // Add transaction
    transactions.push(transaction);


    // Save transaction
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );


    // Update page
    displayTransactions();

    updateTotals();


    // Clear form
    form.reset();

  }
);


/* =========================
   SEARCH
========================= */

if (search) {

  search.addEventListener(
    "input",
    function() {

      displayTransactions();

    }
  );

}


/* =========================
   DARK MODE
========================= */

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    function() {

      document.body.classList.toggle(
        "dark-mode"
      );


      // Change button text
      if (
        document.body.classList.contains(
          "dark-mode"
        )
      ) {

        themeToggle.textContent =
          "☀️ Light Mode";

      } else {

        themeToggle.textContent =
          "🌙 Dark Mode";

      }

    }
  );

}


/* =========================
   LOAD APP
========================= */

displayTransactions();

updateTotals();

const typeSelect = document.getElementById("type");

function updateTypeColor() {
  if (typeSelect.value === "expense") {
    typeSelect.style.color = "red";
  } else {
    typeSelect.style.color = "green";
  }
}

typeSelect.addEventListener("change", updateTypeColor);

updateTypeColor();

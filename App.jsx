import { useState, useRef } from "react";
function App() {
  let [accounts, setAccounts] = useState([]);
  let ownerInput = useRef(null);

  function createAccount(owner) {
    if (!owner || owner.trim() === "") {
      alert("Owner name cannot be empty.");
      return;
    }
    let account = {
      owner: owner,
      balance: 0,
      history: []
    };

    let newAccounts = accounts.slice();
    newAccounts.push(account);
    setAccounts(newAccounts);
  }

  function deposit(index, amount) {
    if (amount <= 0) {
      alert("Deposit amount must be positive.");
      return;
    }
    let newAccounts = accounts.slice();
    newAccounts[index].balance += amount;
    newAccounts[index].history.push("Deposited: " + amount);
    setAccounts(newAccounts);
  }

  function deleteAccount(index) {
    let newAccounts = accounts.slice();
    newAccounts.splice(index, 1);
    setAccounts(newAccounts);
  }

  function showDetails(index) {
    let account = accounts[index];
    let details = "Owner: " + account.owner +
      "\nBalance: " + account.balance +
      "\nHistory:\n";

    for (let i = 0; i < account.history.length; i++) {
      details += account.history[i] + "\n";
    }
    alert(details);
  }
  let accountElements = [];

  for (let i = 0; i < accounts.length; i++) {
    accountElements.push(
      <p>
        {i}: {accounts[i].owner} |
        Balance: {accounts[i].balance}

        <button onClick={function () { showDetails(i); }}>
          Details
        </button>

        <button onClick={function () { deleteAccount(i); }}>
          Delete
        </button>
        <button /* .++ */>Deposit</button>
        <button /* .++ */>Withdraw</button>
        <button /* .++ */>Send Money</button>
      </p>
    );
  }
  return (
    <>
      <h2>Bank System</h2>
      <input ref={ownerInput} placeholder="Owner Name" />

      <button onClick={function () {
        createAccount(ownerInput.current.value);
      }}>
        Create Account
      </button>

      <h2>Accounts</h2>

      {accountElements}
    </>
  );
}

export default App;

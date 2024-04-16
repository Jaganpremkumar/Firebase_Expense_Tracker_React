import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../Hooks/useAddTransaction";
import { useGetTransactions } from "../../Hooks/useGetTransactions";
import { useGetUserInfo } from "../../Hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase-config";
import "./expense-tracker.css"; // Import the CSS file

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  // State var's
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    // fn
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to format the date
  const formatDate = (timestamp) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestamp.toDate()).toLocaleString("en-US", options);
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s Expense Tracker</h1>

          <div className="balance">
            <h3> Your Balance</h3>
            {balance >= 0 ? <h2> ₹ {balance}</h2> : <h2> -₹{balance * -1}</h2>}
          </div>

          <div className="summary">
            <div className="income">
              <h4> Income</h4>
              <p>₹ {income}</p>
            </div>

            <div className="expenses">
              <h4> Expenses</h4>
              <p>₹ {expenses}</p>
            </div>
          </div>

          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) =>
                setDescription(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
            />

            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />

            <div className="radio-container">
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>
            </div>

            <div className="radio-container">
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>

            <button type="submit"> Add Transaction</button>
          </form>
        </div>

        {profilePhoto && (
          <div className="profile">
            {" "}
            <img
              className="profile-photo"
              src={profilePhoto}
              alt="User Profile"
            />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Dispaly the transactions */}

      <div className="transactions">
        <h3> Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { id, description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={id}>
                <h4> {description} </h4>
                <p>
                  ₹ {transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
                {/* <p>{transaction.createdAt.toDate().toLocaleString()}</p> */}
                <p>{formatDate(transaction.createdAt)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./redux/index";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const accountBalance = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { withdrawMoney } = bindActionCreators(actionCreators, dispatch);

  const [amount, setAmount] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();

    if (amount > accountBalance) {
      setAmount("");
      return toast.error("Insufficient Balance");
    }

    withdrawMoney(amount, accountBalance);
    setAmount("");
  };

  return (
    <>
      <ToastContainer hideProgressBar={true} autoClose={3000} />
      <div
        className="App"
        style={{ width: "30%", margin: "5em auto 0", textAlign: "center" }}
      >
        <div style={{ fontWeight: "600", marginBottom: "0.5em" }}>
          {accountBalance}
        </div>
        <div style={{ cursor: "pointer" }}>
          <form onSubmit={handleWithdraw}>
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              pattern="[0-9]*"
              placeholder="&#8358;0.00"
              style={{ padding: "0.5em" }}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button
              type="submit"
              style={{ padding: "0.5em", marginLeft: "0.5em" }}
            >
              Withdraw
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;

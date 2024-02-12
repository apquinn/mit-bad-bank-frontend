import * as React from "react";
import DisplayAmountForm from "./components/DisplayAmountForm.js";
import handleTransaction from "./components/handleTransaction.js";
import Card from "./components/SCard.js";
import { useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default function Deposit() {
  const [balance, setBalance] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [status, setStatus] = React.useState("");
  let email = sessionStorage.getItem("email");

  useEffect(() => {
    var url = `http://localhost:3001/get-balance/${email}/${Date.now()}`;
    axios.get(url).then((res) => {
      let localBalance = res.data.balance
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setBalance(localBalance);
    });
  }, []);

  return (
    <>
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          <DisplayAmountForm
            balance={balance}
            type="Deposit"
            amount={amount}
            setAmount={setAmount}
            handleOnclick={() =>
              handleTransaction(
                "deposit",
                email,
                setAmount,
                balance,
                setBalance,
                setStatus
              )
            }
          />
        }
      />
    </>
  );
}

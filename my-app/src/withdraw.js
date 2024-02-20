import * as React from "react";
import DisplayAmountForm from "./components/DisplayAmountForm.js";
import handleTransaction from "./components/handleTransaction.js";
import Card from "./components/SCard.js";
import { useEffect } from "react";
import axios from "axios";
import DisplayAccountSelection from "./components/DisplayAccountSelection.js";

export default function Deposit() {
  const [balance, setBalance] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [account, setAccount] = React.useState("");

  useEffect(() => {
    if (email !== "" && account !== "") {
      console.log("INSIDE");
      var url = `http://localhost:3001/get-balance/${email}/${Date.now()}/${account}`;
      axios.get(url).then((res) => {
        console.log(res.data.balance);
        let localBalance = res.data.balance
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setBalance(localBalance);
      });
    }
  }, [email, account]);

  return (
    <>
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          <>
            <DisplayAccountSelection
              setEmail={setEmail}
              onChangeAction={(e) => setAccount(e.target.value)}
              displayUser={false}
              type="email"
              setAccount={setAccount}
            />

            <DisplayAmountForm
              balance={balance}
              type="Withdrawal"
              amount={amount}
              setAmount={setAmount}
              handleOnclick={() =>
                handleTransaction(
                  "Withdrawal",
                  email,
                  account,
                  setAmount,
                  balance,
                  setBalance,
                  "",
                  "",
                  setStatus
                )
              }
            />
          </>
        }
      />
    </>
  );
}

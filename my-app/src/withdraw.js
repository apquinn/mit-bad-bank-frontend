import * as React from "react";
import DisplayAmountForm from "./components/DisplayAmountForm.js";
import handleTransaction from "./utils/handleTransaction.js";
import Card from "./components/SCard.js";
import { useEffect } from "react";
import axios from "axios";
import DisplayAccountSelection from "./components/DisplayAccountSelection.js";

export default function Deposit() {
  const [balance, setBalance] = React.useState("");
  const [pending, setPending] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [account, setAccount] = React.useState("");

  useEffect(() => {
    if (email !== "" && account !== "") {
      var url = `${localStorage.getItem(
        "api-url"
      )}/get-balance/${email}/${Date.now()}/${account}`;
      axios.get(url).then((res) => {
        setBalance(res.data.balance);
        setPending(res.data.pending);
      });
    }
  }, [email, account]);

  return (
    <>
      <Card
        bgcolor="primary"
        header="Withdraw"
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
              pending={pending}
              type="Withdrawal"
              amount={amount}
              setAmount={setAmount}
              setStatus={setStatus}
              setBalance={setBalance}
              setPending={setPending}
              handleOnclick={() =>
                handleTransaction(
                  "Withdrawal",
                  email,
                  account,
                  setAmount,
                  balance,
                  setBalance,
                  pending,
                  setPending,
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

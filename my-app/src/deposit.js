import * as React from "react";
import { findCurrentAttribute } from "./components/findAttribute.js";
import DisplayAmountForm from "./components/DisplayAmountForm.js";
import handleTransaction from "./components/handleTransaction.js";
import Card from "./components/SCard.js";
import { UserContext } from "./contexts/usercontext.js";

export default function Deposit() {
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [deposit, setDeposit] = React.useState("");
  const ctx = React.useContext(UserContext);

  if (balance === "" && findCurrentAttribute("balance", ctx) !== "")
    setBalance(findCurrentAttribute("balance", ctx));

  return (
    <>
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          <DisplayAmountForm
            balance={balance}
            setAmount={setDeposit}
            amount={deposit}
            type="Deposit"
            handleOnclick={() =>
              handleTransaction(
                deposit,
                setDeposit,
                ctx,
                balance,
                setBalance,
                setStatus,
                "deposit"
              )
            }
          />
        }
      />
    </>
  );
}

import * as React from "react";
import { findCurrentAttribute } from "./components/findAttribute.js";
import DisplayAmountForm from "./components/DisplayAmountForm.js";
import handleTransaction from "./components/handleTransaction.js";
import Card from "./components/SCard.js";
import { UserContext } from "./contexts/usercontext.js";

export default function Withdraw() {
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [withdrawl, setWithdrawl] = React.useState("");
  const ctx = React.useContext(UserContext);

  let localLoggedIn = false;
  if (findCurrentAttribute("name", ctx) !== "") localLoggedIn = true;

  if (balance === "" && findCurrentAttribute("balance", ctx) !== "")
    setBalance(findCurrentAttribute("balance", ctx));

  return (
    <>
      <Card
        bgcolor="primary"
        header="Withdrawl"
        status={status}
        body={
          localLoggedIn ? (
            <DisplayAmountForm
              balance={balance}
              setAmount={setWithdrawl}
              amount={withdrawl}
              type="Withdrawl"
              handleOnclick={() =>
                handleTransaction(
                  withdrawl,
                  setWithdrawl,
                  ctx,
                  balance,
                  setBalance,
                  setStatus,
                  "withdrawl"
                )
              }
            />
          ) : (
            <>
              <h5>Notice</h5>
              <p>You must be logged in to make a withdrawl.</p>
              <br />
            </>
          )
        }
      />
    </>
  );
}

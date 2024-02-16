import * as React from "react";
import DisplayAmountForm from "./components/DisplayAmountForm.js";
import handleTransaction from "./components/handleTransaction.js";
import Card from "./components/SCard.js";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Transfer() {
  const [balance, setBalance] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const [status, setStatus] = React.useState("");

  const decoded = jwtDecode(localStorage.getItem("token"));
  let email = decoded.email;
  let options = [];

  useEffect(() => {
    var url = `http://localhost:3001/get-balance/${email}/${Date.now()}`;
    axios.get(url).then((res) => {
      let localBalance = res.data.balance
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setBalance(localBalance);
    });

    axios.get(`http://localhost:3001/get-users/${email}`).then((res) => {
      options = res.data.trans;
      for (let i = 0; i < options.length; i++) {
        var option = document.createElement("OPTION");
        option.setAttribute("value", options[i].email);
        var text = document.createTextNode(options[i].email);
        option.appendChild(text);

        document.getElementById("recipients").appendChild(option);
      }
    });
  }, [email]);

  return (
    <>
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          <>
            <DisplayAmountForm
              balance={balance}
              type="Transfer"
              amount={amount}
              setAmount={setAmount}
              handleOnclick={() =>
                handleTransaction(
                  "Transfer",
                  email,
                  setAmount,
                  balance,
                  setBalance,
                  recipient,
                  setStatus
                )
              }
              select={
                <>
                  Recipient
                  <br />
                  <select
                    id="recipients"
                    className="form-control"
                    onChange={(e) => setRecipient(e.target.value)}
                  >
                    <option></option>
                  </select>
                  <br />
                </>
              }
            />
          </>
        }
      />
    </>
  );
}

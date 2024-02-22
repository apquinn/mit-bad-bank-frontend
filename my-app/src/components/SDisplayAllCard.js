import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import axios from "axios";
import DisplayAccountSelection from "./DisplayAccountSelection.js";
import displayResults from "../utils/displayResults.js";
import { jwtDecode } from "jwt-decode";

export default function DisplayAllCard({ propsHeader, select }) {
  const [email, setEmail] = React.useState("");
  const [results, setResults] = React.useState("");
  const [account, setAccount] = React.useState("");
  let transactions = [];
  let header = [];
  const decoded = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    if (email !== "" && account !== "") {
      var url = `http://localhost:3001/get-all-transactions/${email}/${account}/${Date.now()}`;
      axios.get(url).then((res) => {
        setResults(res.data);
      });
    } else {
      setResults("");
    }
  }, [email, account]);

  function handleDelete(e) {
    var url = `http://localhost:3001/delete-transaction/${e.target.id}/${email}`;
    axios.get(url).then((res) => {
      setResults(res.data);
    });
  }

  if (decoded.userType === "employee") {
    header = [<div key={"card-body80"} className="col-md-1"></div>];
  }

  transactions = displayResults(results, transactions, decoded, handleDelete);

  return (
    <div className="card mb-12 bg-primary text-white">
      <div key="card-header" className="card-header">
        {propsHeader}
      </div>
      <div
        className="card-body"
        key="card-body"
        style={{
          backgroundColor: "white",
          color: "black",
          marginBottom: "3px",
        }}
      >
        <div key="card-body-wrapper" className="container">
          <div key="card-body-main2" className="row">
            {select}
            <div key="card-body-main70" className="col-md-3">
              <DisplayAccountSelection
                setEmail={setEmail}
                onChangeAction={(e) => setAccount(e.target.value)}
                displayUser="false"
                type="email"
                setAccount={setAccount}
              />
            </div>
          </div>
          <div
            key="card-body-main"
            className="row"
            style={{ borderBottom: "1px solid black" }}
          >
            {header}
            <div key="card-body1" className="col-md-2">
              Action
            </div>
            <div key="card-body3" className="col-md-2">
              E-mail
            </div>
            <div key="card-body4" className="col-md-2"></div>
          </div>
          {transactions}
        </div>
      </div>
    </div>
  );
}

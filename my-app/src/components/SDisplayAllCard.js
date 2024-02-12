import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import axios from "axios";

export default function DisplayAllCard(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-12 " + bg + txt;
  }
  const [results, setResults] = React.useState("");
  let transactions = [];

  let email = sessionStorage.getItem("email");
  useEffect(() => {
    var url = `http://localhost:3001/get-all-transactions/${email}/${Date.now()}`;
    axios.get(url).then((res) => {
      setResults(res.data);
    });
  }, []);

  console.log(results);
  if (results) {
    transactions = results.map((user, index) => {
      if (user.type === "login" || user.type === "create user") {
        return (
          <div key={"card-body5" + index} className="row">
            <div key={"card-body6" + index} className="col-md-2">
              {user.type}
            </div>
            <div key={"card-body7" + index} className="col-md-2">
              {user.name}
            </div>
            <div key={"card-body8" + index} className="col-md-3">
              {user.email}
            </div>
            <div key={"card-body9" + index} className="col-md-4">
              password: {user.password}
            </div>
          </div>
        );
      }
      if (user.type === "logout") {
        return (
          <div key={"card-body15" + index} className="row">
            <div key={"card-body16" + index} className="col-md-2">
              {user.type}
            </div>
            <div key={"card-body17" + index} className="col-md-2">
              {user.name}
            </div>
            <div key={"card-body18" + index} className="col-md-3">
              {user.email}
            </div>
          </div>
        );
      }
      if (user.type === "transaction") {
        return (
          <div key={"card-body26" + index} className="row">
            <div key={"card-body27" + index} className="col-md-2">
              {user.type}
            </div>
            <div key={"card-body28" + index} className="col-md-2">
              {user.name}
            </div>
            <div key={"card-body29" + index} className="col-md-3">
              {user.email}
            </div>
            <div key={"card-body30" + index} className="col-md-2">
              amount: {user.amount}
            </div>
            <div key={"card-body31" + index} className="col-md-3">
              balance: {user.balance}
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className={classes()}>
      <div key="card-header" className="card-header">
        {props.header}
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
          <div
            key="card-body-main"
            className="row"
            style={{ borderBottom: "1px solid black" }}
          >
            <div key="card-body1" className="col-md-2">
              Action
            </div>
            <div key="card-body2" className="col-md-2">
              Name
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

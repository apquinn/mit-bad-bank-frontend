import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function DisplayAllCard(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-12 " + bg + txt;
  }

  const [results, setResults] = React.useState("");
  let transactions = [];
  let header = [];

  const decoded = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    if (props.user !== "") {
      var url = `http://localhost:3001/get-all-transactions/${
        props.user
      }/${Date.now()}`;
      axios.get(url).then((res) => {
        setResults(res.data);
      });
    }
  }, [props.user]);

  function handleDelete(e) {
    var url = `http://localhost:3001/delete-transaction/${e.target.id}/${props.user}`;
    axios.get(url).then((res) => {
      console.log("HERE");
      setResults(res.data);
    });
  }

  if (results) {
    let delItem = "";
    transactions = results.map((user, index) => {
      if (user.type === "login" || user.type === "create user") {
        if (decoded.userType === "employee") {
          delItem = (
            <div key={"card-body50" + index} className="col-md-1"></div>
          );
        }

        return (
          <div key={"card-body5" + index} className="row">
            {delItem}
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
              password: encrypted
            </div>
          </div>
        );
      }
      if (user.type === "logout") {
        if (decoded.userType === "employee") {
          delItem = (
            <div key={"card-body51" + index} className="col-md-1"></div>
          );
        }

        return (
          <div key={"card-body15" + index} className="row">
            {delItem}
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
        if (decoded.userType === "employee") {
          delItem = (
            <div key={"card-body52" + index} className="col-md-1">
              <button
                id={user._id}
                key={user._id}
                className="delete-transaction-button"
                onClick={(e) => handleDelete(e)}
              >
                delete
              </button>
            </div>
          );
        }

        return (
          <>
            {" "}
            <div key={"card-body26" + index} className="row">
              {delItem}
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
              <div key={"card-body31" + index} className="col-md-2">
                balance: {user.balance}
              </div>
            </div>
          </>
        );
      }
      return "";
    });
  }

  if (decoded.userType === "employee") {
    header = [<div key={"card-body55"} className="col-md-1"></div>];
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
          <div key="card-body-main2" className="row">
            <div key="card-body-main3" className="col-md-3">
              {props.select}
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

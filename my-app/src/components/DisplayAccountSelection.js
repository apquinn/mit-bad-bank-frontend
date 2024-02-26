import * as React from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { addOption, removeOptions } from "../utils/optionFunctions.js";

export default function DisplayAccountSelection({
  onChangeAction,
  setEmail,
  displayUser,
  type,
  setAccount,
}) {
  const decoded = jwtDecode(localStorage.getItem("token"));
  let options = [];
  let selectBox = "";

  let selectID = "";
  let selectIDAccount = "";
  if (type === "email") {
    selectID = "userSelect";
    selectIDAccount = "accountSelect";
  } else {
    selectID = "recipientUserSelect";
    selectIDAccount = "recipientAccountSelect";
  }

  useEffect(() => {
    setEmail(decoded.email);
    if (decoded.email !== "") {
      if (decoded.userType === "employee" || displayUser === true) {
        axios
          .get(`${localStorage.getItem("api-url")}/get-all-customers`)
          .then((res) => {
            removeOptions(selectID);
            addOption(selectID, "");
            options = res.data.trans;
            for (let i = 0; i < options.length; i++) {
              addOption(selectID, options[i].email);
            }
          });
      } else {
        var url = `${localStorage.getItem("api-url")}/get-accounts/${
          decoded.email
        }`;
        axios.get(url).then((res) => {
          removeOptions(selectIDAccount);
          addOption(selectIDAccount, "");
          options = res.data.trans;
          for (let i = 0; i < options.length; i++) {
            addOption(selectIDAccount, options[i].name);
          }
        });
        setEmail(decoded.email);
      }
    }
  }, []);

  function handleUserChange(e) {
    setEmail(e.target.value);
    setAccount("");

    if (e.target.value !== "") {
      var url = `${localStorage.getItem("api-url")}/get-accounts/${
        e.target.value
      }`;
      axios.get(url).then((res) => {
        removeOptions(selectIDAccount);
        addOption(selectIDAccount, "");
        options = res.data.trans;
        for (let i = 0; i < options.length; i++) {
          addOption(selectIDAccount, options[i].name);
        }
      });
    } else {
      removeOptions(selectIDAccount);
    }
  }

  if (decoded.userType === "employee" || displayUser === true) {
    selectBox = (
      <>
        <div key="card-body-main3" className="col-md-12">
          Acccount holder
          <br />
          <select
            id={selectID}
            key={selectID}
            className="form-control"
            onChange={(e) => handleUserChange(e)}
          ></select>
          <br />
        </div>
      </>
    );
  }

  return (
    <>
      {selectBox}
      Account name
      <br />
      <select
        id={selectIDAccount}
        key={selectIDAccount}
        className="form-control"
        onChange={onChangeAction}
      >
        <option></option>
      </select>
      <br />
    </>
  );
}

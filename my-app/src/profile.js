import * as React from "react";
import Card from "./components/SCard.js";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [userData, setUserData] = React.useState("");
  const [accounts, setAccounts] = React.useState("");
  const decoded = jwtDecode(localStorage.getItem("token"));
  let email = decoded.email;
  let accountOutput = [];

  useEffect(() => {
    var url = `http://localhost:3001/get-profile/${email}`;
    axios.get(url).then((res) => {
      setUserData(res.data.trans[0]);
    });

    url = `http://localhost:3001/get-accounts/${email}`;
    axios.get(url).then((res) => {
      setAccounts(res.data.trans);
    });

    document.getElementById("createNewAccount").style.display = "none";
    document.getElementById("standardButtons").style.display = "inline";
  }, [email]);

  if (typeof accounts === "object") {
    if (accounts.length === 0) {
      accountOutput.push(
        <>
          {" "}
          - no accounts on file <br />
        </>
      );
    } else {
      accountOutput = accounts.map((item, index) => {
        return (
          <>
            <li className="account-li" key={"li" + index}>
              {item.name},<br /> &nbsp; &nbsp; &nbsp;{item._id}
              <br />
              &nbsp; &nbsp; &nbsp;
              <button
                id={item._id}
                className="close-account-button"
                onClick={closeAccount}
              >
                close account
              </button>
            </li>
          </>
        );
      });
    }
  }

  function addAccount() {
    var url = `http://localhost:3001/add-account/${email}/${
      document.getElementById("accountName").value
    }`;
    axios.get(url).then((res) => {
      if (typeof res.data === "string") {
        alert(res.data);
      } else {
        setAccounts(res.data.trans);
        showAddAccount(false);
      }
    });
  }

  function closeAccount(e) {
    var url = `http://localhost:3001/close-account/${email}/${e.target.id}`;
    axios.get(url).then((res) => {
      if (typeof res.data === "string") {
        alert(res.data);
      } else {
        setAccounts(res.data.trans);
        showAddAccount(false);
      }
    });
  }

  function showAddAccount(showAdd) {
    if (showAdd) {
      document.getElementById("createNewAccount").style.display = "inline";
      document.getElementById("standardButtons").style.display = "none";
    } else {
      document.getElementById("accountName").value = "";
      document.getElementById("createNewAccount").style.display = "none";
      document.getElementById("standardButtons").style.display = "inline";
    }
  }

  return (
    <>
      <Card
        bgcolor="primary"
        header="User Profile"
        body={
          <>
            Username: {userData.name}
            <br />
            Email: {userData.email}
            <br />
            Account type: {userData.userType}
            <br />
            <br />
            Accounts
            <br />
            {accountOutput}
            <br />
            <div id="createNewAccount">
              Add account
              <br />
              <input
                type="text"
                className="form-control col-sm-2"
                id="accountName"
                placeholder="new account name"
              />
              <br />
              <button
                id="addAccount"
                onClick={addAccount}
                className="btn btn-light"
              >
                create new account
              </button>{" "}
              &nbsp;
              <button
                id="cancelAddAccount"
                onClick={() => showAddAccount(false)}
                className="btn btn-light"
              >
                cancel
              </button>
              <br />
            </div>
            <div id="standardButtons">
              <br />
              <button
                id="newAccount"
                onClick={() => showAddAccount(true)}
                className="btn btn-light"
              >
                add account
              </button>
              <br />
            </div>
          </>
        }
      />
    </>
  );
}

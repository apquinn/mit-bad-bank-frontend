import * as React from "react";
import { useContext, useEffect } from "react";
import Card from "./components/SCard.js";
import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "./contexts/usercontext.js";
import DisplayField from "./components/DisplayField.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

(function () {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBM3Kol97p3vu1iVSLX9VwM8J3b4xLiPKU",
    authDomain: "course-8d11e.firebaseapp.com",
    databaseURL: "https://course-8d11e-default-rtdb.firebaseio.com",
    projectId: "course-8d11e",
    storageBucket: "course-8d11e.appspot.com",
    messagingSenderId: "646016197490",
    appId: "1:646016197490:web:aceb1987b39da44fc2b3eb",
  };
  // Initialize Firebase
  initializeApp(firebaseConfig);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("li-deposit").style.display = "inline";
      document.getElementById("li-withdrawl").style.display = "inline";
      document.getElementById("li-alldata").style.display = "inline";
    } else {
      document.getElementById("li-deposit").style.display = "none";
      document.getElementById("li-withdrawl").style.display = "none";
      document.getElementById("li-alldata").style.display = "none";
    }
  });
})();

export default function CreateAccount() {
  let globalEmail = React.useContext(UserContext);

  useEffect(() => {
    const element = document.getElementById("submit-button");
    element.disabled = true;
  }, []);

  const [show, setShow] = React.useState(true);
  const [status] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validate(field, label) {
    if (!field) {
      alert("Error: " + label + " is required");
      return false;
    } else if (label === "password" && field.length < 8) {
      alert("Password must be 8 charactors");
      return false;
    }

    return true;
  }

  function handleCreate(globalEmail) {
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var url = `http://localhost:3001/account/create/${name}/${email}/${password}`;
        axios.get(url).then((res) => {
          setShow(false);
          alert("Successfully created account.");
        });
      })
      .catch((e) => alert(e.message));
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  function disableButton(event) {
    const element = document.getElementById("submit-button");
    if (element !== undefined) {
      if (event.currentTarget.value === "" && email === "" && password === "")
        element.disabled = true;
      else element.disabled = false;
    }
  }

  function handleChangeName(event) {
    setName(event.currentTarget.value);
    disableButton(event);
  }

  function handleChangeEmail(event) {
    setEmail(event.currentTarget.value);
    disableButton(event);
  }

  function handleChangePassword(event) {
    setPassword(event.currentTarget.value);
    disableButton(event);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            <DisplayField
              type="input"
              id="name"
              value={name}
              name="Name"
              handleChange={handleChangeName}
            />
            <DisplayField
              type="input"
              id="email"
              value={email}
              name="Email address"
              handleChange={handleChangeEmail}
            />
            <DisplayField
              type="password"
              id="password"
              value={password}
              name="Password"
              handleChange={handleChangePassword}
            />
            <button
              id="submit-button"
              type="submit"
              className="btn btn-light"
              onClick={() => handleCreate(globalEmail)}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}

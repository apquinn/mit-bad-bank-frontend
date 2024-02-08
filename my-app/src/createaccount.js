import * as React from "react";
import { useContext, useEffect } from "react";
import Card from "./components/SCard.js";
import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "./contexts/usercontext.js";
import DisplayField from "./components/DisplayField.js";
import { findEmail } from "./components/findAttribute.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function CreateAccount() {
  useEffect(() => {
    const element = document.getElementById("submit-button");
    element.disabled = true;
  }, []);

  const [show, setShow] = React.useState(true);
  const [status] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      alert("Error: " + label + " is required");
      return false;
    } else if (label === "password" && field.length < 8) {
      alert("Password must be 8 charactors");
      return false;
    } else if (label === "email" && findEmail(field, ctx) === true) {
      alert("An account for email " + email + " already exists");
      return false;
    }

    return true;
  }

  function handleSignupClick() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((e) => console.log(e.message));
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    ctx.users.push({
      type: "user",
      name,
      email,
      password,
      balance: 100,
      loggedin: false,
    });
    setShow(false);
    alert("Successfully created account.");
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  function handleChangeName(event) {
    setName(event.currentTarget.value);
    const element = document.getElementById("submit-button");
    if (event.currentTarget.value === "" && email === "" && password === "")
      element.disabled = true;
    else element.disabled = false;
  }

  function handleChangeEmail(event) {
    setEmail(event.currentTarget.value);
    const element = document.getElementById("submit-button");
    if (event.currentTarget.value === "" && name === "" && password === "")
      element.disabled = true;
    else element.disabled = false;
  }

  function handleChangePassword(event) {
    setPassword(event.currentTarget.value);
    const element = document.getElementById("submit-button");
    if (event.currentTarget.value === "" && name === "" && email === "")
      element.disabled = true;
    else element.disabled = false;
  }

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
        document.getElementById("loginFields").style.display = "none";
        document.getElementById("loggedin").style.display = "inline";
      } else {
        document.getElementById("loginFields").style.display = "inline";
        document.getElementById("loggedin").style.display = "none";
      }
    });
  })();

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
              onClick={handleCreate}
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

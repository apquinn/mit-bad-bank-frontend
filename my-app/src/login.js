import * as React from "react";
import { useEffect } from "react";
import { findCurrentAttribute } from "./components/findAttribute.js";
import Card from "./components/SCard.js";
import { UserContext } from "./contexts/usercontext.js";
import DisplayField from "./components/DisplayField.js";
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login() {
  const ctx = React.useContext(UserContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    setEmail(findCurrentAttribute("email", ctx));
    setPassword(findCurrentAttribute("password", ctx));
  }, [ctx]);

  function validate(field, label) {
    if (field === "") {
      alert("Error: " + label + " is required");
      return false;
    }
    return true;
  }

  function handleLogin() {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailField.value, passwordField.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        if (!user) {
          alert("Email or password invalid.");
          return "";
        }

        ctx.users.map((user) => {
          if (user.email === email && user.password === password) {
            user.loggedin = true;

            ctx.users.push({
              type: "login",
              name: user.name,
              email: user.email,
              action: "login",
              balance: user.balance,
            });
          }
          return "";
        });
      })
      .catch((e) => console.log(e.message));
  }

  function handleSignout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        ctx.users.map((user) => {
          if (user.type === "user") {
            if (user.loggedin === true) {
              ctx.users.push({
                type: "login",
                name: user.name,
                email: user.email,
                action: "logout",
                balance: user.balance,
              });
            }
            user.loggedin = false;
          }
          return "";
        });
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    <>
      <Card
        bgcolor="primary"
        header="Login to your account"
        status=""
        body={
          <>
            <div id="loginFields" key="loginFields">
              <DisplayField
                type="input"
                id="email"
                value={email}
                name="Email"
                handleChange={(e) => setEmail(e.currentTarget.value)}
              />
              <DisplayField
                type="password"
                id="password"
                value={password}
                name="Password"
                handleChange={(e) => setPassword(e.currentTarget.value)}
              />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div id="loggedin" key="loggedin" style={{ display: "none" }}>
              <h5>Success</h5>
              <p>{findCurrentAttribute("name", ctx)} is logged in.</p>
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleSignout}
              >
                logout
              </button>
            </div>
          </>
        }
      />
    </>
  );
}

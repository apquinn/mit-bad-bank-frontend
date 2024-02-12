import * as React from "react";
import Card from "./components/SCard.js";
import DisplayField from "./components/DisplayField.js";
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { UserContext } from "./contexts/usercontext.js";

export default function Login() {
  let globalEmail = React.useContext(UserContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validate(field, label) {
    if (field === "") {
      alert("Error: " + label + " is required");
      return false;
    }
    return true;
  }

  function handleLogin(globalEmail) {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user) {
          alert("Email or password invalid.");
          return "";
        }
        sessionStorage.setItem("email", email);

        var url = `http://localhost:3001/login/${email}/${password}`;
        axios.get(url).then((res) => {});
      })
      .catch((e) => alert(e.message));
  }

  function handleLogout() {
    const auth = getAuth();
    signOut(auth, email)
      .then(() => {
        var url = `http://localhost:3001/logout/${email}`;
        axios.get(url).then((res) => {});

        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.message);
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
        document.getElementById("li-deposit").style.display = "inline";
        document.getElementById("li-withdrawl").style.display = "inline";
        document.getElementById("li-alldata").style.display = "inline";
        document.getElementById("status").innerHTML =
          user.email + " is logged in.";
      } else {
        document.getElementById("loginFields").style.display = "inline";
        document.getElementById("loggedin").style.display = "none";
        document.getElementById("li-deposit").style.display = "none";
        document.getElementById("li-withdrawl").style.display = "none";
        document.getElementById("li-alldata").style.display = "none";
        document.getElementById("status").innerHTML = "";
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
                onClick={() => handleLogin(globalEmail)}
              >
                Login
              </button>
            </div>
            <div id="loggedin" key="loggedin" style={{ display: "none" }}>
              <h5>Success</h5>
              <p id="status"></p>
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleLogout}
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

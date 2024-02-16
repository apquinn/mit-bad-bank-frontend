import { handleLogin } from "./utils/endpoints/auth";
import * as React from "react";
import { useEffect } from "react";
import Card from "./components/SCard.js";
import DisplayField from "./components/DisplayField.js";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validate(field, label) {
    if (field === "") {
      alert("Error: " + label + " is required");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let decoded = jwtDecode(localStorage.getItem("token"));

      document.getElementById("loginFields").style.display = "none";
      document.getElementById("loggedin").style.display = "inline";
      document.getElementById("status").innerHTML =
        decoded.email + " is logged in.";
    }
  }, []);

  async function handleLoginLocal() {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const response = await handleLogin(email, password);
    if (response) {
      document.getElementById("loginFields").style.display = "none";
      document.getElementById("loggedin").style.display = "inline";
      document.getElementById("li-deposit").style.display = "inline";
      document.getElementById("li-withdrawl").style.display = "inline";
      document.getElementById("li-transfer").style.display = "inline";
      document.getElementById("li-alldata").style.display = "inline";
      document.getElementById("status").innerHTML = email + " is logged in.";
      document.getElementById("account-name").innerHTML = email;
      document.getElementById("logout-button").style.display = "inline";
      setEmail("");
      setPassword("");
    }
  }

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
                onClick={handleLoginLocal}
              >
                Login
              </button>
              <br />
              <br />
              <span className="white-link">
                <a href="/#/createaccount/">Need an account? Sign up here!</a>
              </span>{" "}
            </div>
            <div id="loggedin" key="loggedin" style={{ display: "none" }}>
              <h5>Success</h5>
              <p id="status"></p>
              <br />
            </div>
          </>
        }
      />
    </>
  );
}

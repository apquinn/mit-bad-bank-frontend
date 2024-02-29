import * as React from "react";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { handleSignup } from "./utils/endpoints/auth";
import Card from "./components/SCard.js";
import DisplayField from "./components/DisplayField.js";

export default function Auth() {
  const [show, setShow] = useState(true);

  useEffect(() => {}, []);

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

  function clearForm() {
    setShow(true);
  }

  const handleCreate = async (e, signupData) => {
    e.preventDefault();
    if (!validate(signupData.name, "name")) return;
    if (!validate(signupData.email, "email")) return;
    if (!validate(signupData.password, "password")) return;

    const response = await handleSignup(signupData);
    if (response === true) {
      setShow(false);
      document.getElementById("account-name").innerHTML = signupData.email;
      document.getElementById("logout-button").style.display = "inline";

      document.getElementById("deposit").style.display = "inline";
      document.getElementById("withdrawl").style.display = "inline";
      document.getElementById("transfer").style.display = "inline";
      document.getElementById("alldata").style.display = "inline";
    }
  };

  return (
    <>
      <Card
        bgcolor="primary"
        header="Create Login"
        body={
          show ? (
            <>
              <Form>
                <DisplayField type="input" id="name" name="Name" />
                <DisplayField type="input" id="email" name="Email address" />
                <DisplayField type="password" id="password" name="Password" />
                Account type
                <br />
                <input
                  type="radio"
                  id="customer"
                  name="userType"
                  value="customer"
                  defaultChecked
                />
                &nbsp;
                <label htmlFor="customer">Customer</label>
                &nbsp; &nbsp; &nbsp;
                <input
                  type="radio"
                  id="employee"
                  name="userType"
                  value="employee"
                />
                &nbsp;
                <label htmlFor="employee">Employee</label>
                <br />
                <br />
                <button
                  id="submit-button"
                  type="submit"
                  className="btn btn-light"
                  onClick={(e) => {
                    var userType = "";
                    var ele = document.getElementsByName("userType");
                    for (let i = 0; i < ele.length; i++) {
                      if (ele[i].checked) userType = ele[i].value;
                    }

                    const signupData = {
                      name: document.getElementById("name").value,
                      email: document.getElementById("email").value,
                      password: document.getElementById("password").value,
                      userType: userType,
                    };

                    handleCreate(e, signupData);
                  }}
                >
                  Create Account
                </button>
                <br />
                <br />
                <span className="white-link">
                  <a href="/#/login/">Already have a login?</a>
                </span>
              </Form>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Add another account
              </button>
            </>
          )
        }
      />
    </>
  );
}

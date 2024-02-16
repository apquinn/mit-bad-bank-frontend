import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import DisplayAllCard from "./components/SDisplayAllCard.js";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function AllData() {
  const [user, setUser] = React.useState("");
  const decoded = jwtDecode(localStorage.getItem("token"));
  const email = decoded.email;
  let options = [];
  let selectBox = "";

  useEffect(() => {
    if (decoded.userType === "employee") {
      axios.get(`http://localhost:3001/get-customers`).then((res) => {
        options = res.data.trans;
        for (let i = 0; i < options.length; i++) {
          var option = document.createElement("OPTION");
          option.setAttribute("value", options[i].email);
          var text = document.createTextNode(options[i].email);
          option.appendChild(text);

          document.getElementById("recipients").appendChild(option);
        }
      });
    } else {
      setUser(decoded.email);
    }
  }, [email]);

  if (decoded.userType === "employee") {
    selectBox = (
      <>
        Recipient
        <br />
        <select
          id="recipients"
          className="form-control"
          onChange={(e) => setUser(e.target.value)}
        >
          <option></option>
        </select>
        <br />
      </>
    );
  }

  return (
    <>
      <h5>All Data in Store</h5>
      <br />
      <DisplayAllCard
        bgcolor="primary"
        header="User Actions"
        user={user}
        select={<>{selectBox}</>}
      />
    </>
  );
}

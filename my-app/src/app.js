import NavBar from "./components/navbar.js";
import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./home.js";
import CreateAccount from "./createaccount.js";
import Login from "./login.js";
import Deposit from "./deposit.js";
import Withdraw from "./withdraw.js";
import AllData from "./alldata.js";
import { UserContext } from "./contexts/usercontext.js";
import { getAuth } from "firebase/auth";

export function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createaccount/" element={<CreateAccount />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdrawl/" element={<Withdraw />} />
          <Route path="/alldata/" element={<AllData />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

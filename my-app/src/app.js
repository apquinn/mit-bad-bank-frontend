import NavBar from "./components/navbar.js";
import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./home.js";
import CreateAccount from "./createaccount.js";
import Login from "./login.js";
import Deposit from "./deposit.js";
import Withdraw from "./withdraw.js";
import Transfer from "./transfer.js";
import AllData from "./alldata.js";
import PrivateRoute from "./components/PrivateRoute.js";

export function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createaccount/" element={<CreateAccount />} />
          <Route path="/login/" element={<Login />} />
          <Route
            path="/deposit/"
            element={
              <PrivateRoute>
                <Deposit />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdrawl/"
            element={
              <PrivateRoute>
                <Withdraw />
              </PrivateRoute>
            }
          />
          <Route
            path="/transfer/"
            element={
              <PrivateRoute>
                <Transfer />
              </PrivateRoute>
            }
          />
          <Route
            path="/alldata/"
            element={
              <PrivateRoute>
                <AllData />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

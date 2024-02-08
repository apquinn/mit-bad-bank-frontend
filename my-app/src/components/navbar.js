import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarItem from "./NavbarItem.js";

const useReactPath = () => {
  const [path, setPath] = useState(window.location.hash);
  const listenToPopstate = () => {
    setPath(window.location.hash);
  };
  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
  }, []);
  return path;
};

export default function NavBar() {
  const path = useReactPath();
  useEffect(() => {
    document.getElementById("createaccount").classList.remove("active");
    document.getElementById("login").classList.remove("active");
    document.getElementById("deposit").classList.remove("active");
    document.getElementById("withdrawl").classList.remove("active");
    document.getElementById("alldata").classList.remove("active");
    if (window.location.hash === "#/createaccount/")
      document.getElementById("createaccount").classList.add("active");
    else if (window.location.hash === "#/login/")
      document.getElementById("login").classList.add("active");
    else if (window.location.hash === "#/deposit/")
      document.getElementById("deposit").classList.add("active");
    else if (window.location.hash === "#/withdrawl/")
      document.getElementById("withdrawl").classList.add("active");
    else if (window.location.hash === "#/alldata/")
      document.getElementById("alldata").classList.add("active");
  }, [path]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-tabs">
            <NavbarItem
              message="Use this page to create new accounts at the bank"
              link="createaccount"
              title="Create Account"
            />
            <NavbarItem
              message="Use this page to login to your bank account"
              link="login"
              title="Login"
            />
            <NavbarItem
              message="Use this page to make a deposit into your account. You must be logged in to make a deposit."
              link="deposit"
              title="Deposit"
            />
            <NavbarItem
              message="Use this page to make a withdrawl from your account. You must be logged in to make a withdrawl."
              link="withdrawl"
              title="Withdraw"
            />
            <NavbarItem
              message="This page will display all the data for users and accounts"
              link="alldata"
              title="View All Data"
            />
          </ul>
        </div>
      </nav>
    </>
  );
}

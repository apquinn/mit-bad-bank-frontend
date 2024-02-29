import axios from "axios";
import { jwtDecode } from "jwt-decode";

const handleSignup = async (user) => {
  try {
    const response = await axios.post(
      `${localStorage.getItem("api-url")}/signup`,
      {
        user,
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);

      return true;
    }

    alert(response.data);
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(
      `${localStorage.getItem("api-url")}/login`,
      {
        email,
        password,
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return true;
    }

    alert(response.data);
  } catch (err) {
    alert(err);
    return false;
  }
};

const handleLogout = async () => {
  if (localStorage.getItem("token")) {
    const decoded = jwtDecode(localStorage.getItem("token"));

    const response = await axios.get(
      `${localStorage.getItem("api-url")}/logout/${decoded.email}`
    );

    localStorage.removeItem("token");

    if (document.getElementById("loginFields") !== null) {
      document.getElementById("loginFields").style.display = "inline";
      document.getElementById("loggedin").style.display = "none";
    }

    document.getElementById("deposit").style.display = "none";
    document.getElementById("withdrawl").style.display = "none";
    document.getElementById("transfer").style.display = "none";
    document.getElementById("approve").style.display = "none";
    document.getElementById("alldata").style.display = "none";

    document.getElementById("account-name").innerHTML = "";
    document.getElementById("logout-button").style.display = "none";

    return response.data;
  }
};

export { handleSignup, handleLogout, handleLogin };

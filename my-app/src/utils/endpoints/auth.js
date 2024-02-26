import axios from "axios";

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
    const response = await axios.get(
      `${localStorage.getItem("api-url")}/logout/${localStorage.getItem(
        "email"
      )}`
    );

    localStorage.removeItem("token");

    if (document.getElementById("loginFields") !== null) {
      document.getElementById("loginFields").style.display = "inline";
      document.getElementById("loggedin").style.display = "none";
    }

    document.getElementById("li-deposit").style.display = "none";
    document.getElementById("li-withdrawl").style.display = "none";
    document.getElementById("li-transfer").style.display = "none";
    document.getElementById("li-alldata").style.display = "none";

    document.getElementById("account-name").innerHTML = "";
    document.getElementById("logout-button").style.display = "none";

    return response.data;
  }
};

export { handleSignup, handleLogout, handleLogin };

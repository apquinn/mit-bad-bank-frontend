import axios from "axios";

function validate(field, label) {
  if (field === "") {
    alert("Error: valid " + label + " is required");
    return false;
  }

  if (Number(field) < 0) {
    alert("Error: " + label + " cannot be negative");
    return false;
  }

  if (field === 0) {
    alert("Error: " + label + " must be greater than zero");
    return false;
  } else {
    let parts = field.split(".");
    if (parts.length === 2 && parts[1].length > 2 && parts[1] > 0) {
      alert("Error: fractions of a cent are not allowed");
      return false;
    }
  }
  return true;
}

export default function handleTransaction(
  type,
  email,
  setAmount,
  balance,
  setBalance,
  setStatus
) {
  let amount = document.getElementById("amount").value;

  if (!validate(amount, "amount")) return;

  if (type === "Withdrawal") amount = 0 - Number(amount);

  if (email !== "") {
    if (type === "Withdrawal" && Number(balance) + Number(amount) < 0) {
      alert(
        "Your balance will not cover the amount you are trying to withdraw. Please try a smaller amount."
      );
      setTimeout(() => setStatus(""), 3000);
      setAmount(0);
    } else {
      var url = `http://localhost:3001/transaction/${email}/${amount}/transaction/${type}/`;
      axios.get(url).then((res) => {
        let localBalance = res.data.balance
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setBalance(localBalance);
      });

      setAmount(0);
      setStatus(type + " was successful");
      setTimeout(() => setStatus(""), 3000);
    }
  }
  return false;
}

import axios from "axios";

function validate(field, label) {
  if (field === "") {
    alert("Error: valid " + label + " is required");
    return false;
  }

  if (Number(field) <= 0) {
    alert("Error: " + label + " cannot be negative or zero");
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
  emailAccount,
  setAmount,
  balance,
  setBalance,
  pending,
  setPending,
  recipient,
  recipientAccount,
  setStatus
) {
  function callFinal(res) {
    setBalance(res.data.balance);
    setPending(res.data.pending);
  }

  let amount = document.getElementById("amount").value;

  if (!validate(amount, "amount")) return;
  if (!validate(email, "email")) return;
  if (!validate(emailAccount, "account")) return;
  if (type === "Transfer") {
    if (!validate(recipient, "recipient")) {
      return;
    }
    if (!validate(recipientAccount, "recipient account")) {
      return;
    }
    if (recipient === email && recipientAccount === emailAccount) {
      alert("You cannot transfer money into the same account");
      return;
    }
  }

  if (type === "Withdrawal" || type === "Transfer") amount = 0 - Number(amount);

  if (email !== "") {
    if (
      (type === "Withdrawal" || type === "Transfer") &&
      Number(balance.replaceAll(",", "")) + Number(amount) < 0
    ) {
      alert(
        "Your balance will not cover the amount you are trying to withdraw. Please try a smaller amount."
      );
      setTimeout(() => setStatus(""), 3000);
      setAmount(0);
    } else {
      var url = "";
      if (type === "Transfer") {
        url = `${localStorage.getItem(
          "api-url"
        )}/transfer/${email}/${emailAccount}/${recipient}/${recipientAccount}/${amount}/transaction/${type}/`;
        axios.get(url).then((res) => {
          callFinal(res);
        });
      } else {
        url = `${localStorage.getItem(
          "api-url"
        )}/transaction/${email}/${amount}/transaction/${type}/${emailAccount}`;
        axios.get(url).then((res) => {
          callFinal(res);
        });
      }

      setAmount(0);
      setStatus(type + " was successful");
      setTimeout(() => setStatus(""), 3000);
    }
  }
  return false;
}

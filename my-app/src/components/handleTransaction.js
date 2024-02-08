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
  amount,
  setAmount,
  ctx,
  balance,
  setBalance,
  setStatus,
  type
) {
  if (!validate(amount, "amount")) return;

  let localAmount = amount;
  if (type === "withdrawl") localAmount = 0 - Number(amount);

  ctx.users.map((user) => {
    if (user.loggedin === true) {
      let localBalance = Number(user.balance) + Number(localAmount);
      if (type === "withdrawl" && localBalance < 0) {
        alert(
          "Your balance will not cover the amount you are trying to withdraw. Please try a smaller amount."
        );
        setTimeout(() => setStatus(""), 3000);
        setAmount(0);
      } else {
        user.balance = Number(user.balance) + Number(localAmount);
        setBalance(Number(balance) + Number(localAmount));
        setAmount(0);
        setStatus(type + " was successful");
        setTimeout(() => setStatus(""), 3000);
        ctx.users.push({
          type: type,
          name: user.name,
          email: user.email,
          amount: amount,
          balance: Number(balance) + Number(localAmount),
        });
      }
    }
    return false;
  });
}

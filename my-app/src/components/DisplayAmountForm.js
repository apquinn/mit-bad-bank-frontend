import { useEffect } from "react";
export default function DisplayAmountForm({
  balance,
  setAmount,
  amount,
  handleOnclick,
  type,
}) {
  useEffect(() => {
    const element = document.getElementById("submit-transaction");
    element.disabled = true;
  }, []);

  function handleChange(event) {
    setAmount(event.currentTarget.value);
    const element = document.getElementById("submit-transaction");
    if (event.currentTarget.value === "") element.disabled = true;
    else element.disabled = false;
  }

  return (
    <>
      <div
        style={{
          display: "inline-block",
          width: "150px",
          paddingBottom: "20px",
        }}
      >
        {" "}
        Balance
      </div>
      <div style={{ display: "inline-block" }}>{balance}</div>
      <br />
      {type} Amount
      <br />
      <input
        type="number"
        className="form-control"
        id="deposit"
        placeholder={type.toLowerCase() + " amount"}
        value={amount}
        onChange={handleChange}
      />
      <br />
      <button
        id="submit-transaction"
        type="submit"
        className="btn btn-light"
        onClick={handleOnclick}
      >
        Deposit
      </button>
    </>
  );
}

import { useEffect, createRef } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function DisplayAmountForm({
  balance,
  type,
  handleOnclick,
  amount,
  setAmount,
  select,
  setStatus,
  setBalance,
}) {
  useEffect(() => {
    const element = document.getElementById("submit-transaction");
    element.disabled = true;
  }, [type]);

  const fileInput = createRef();
  const decoded = jwtDecode(localStorage.getItem("token"));
  let url = "";

  function handleChange(event) {
    setAmount(document.getElementById("amount").value);
    const element = document.getElementById("submit-transaction");
    if (event.currentTarget.value === "") element.disabled = true;
    else element.disabled = false;
  }

  function validate(id, fieldName) {
    if (document.getElementById(id).value === "") {
      alert(fieldName + " is required");
      return false;
    }

    if (fieldName === "Amount" && document.getElementById(id).value === "0") {
      alert(fieldName + " is required");
      return false;
    }
    return true;
  }

  async function onFileFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ImportFile", fileInput.current.files[0]);

    if (decoded.userType === "employee") {
      if (!validate("userSelect", "User")) return;
      if (!validate("accountSelect", "Account")) return;
      if (!validate("amount", "Amount")) return;
      if (!validate("uploadCheck", "Check")) return;

      url = `${localStorage.getItem("api-url")}/upload-deposit/${
        document.getElementById("userSelect").value
      }/${document.getElementById("accountSelect").value}/${
        document.getElementById("amount").value
      }`;
    } else {
      if (document.getElementById("accountSelect").value === "") {
        alert("Account is required");
        return;
      }
      if (!validate("accountSelect", "Account")) return;
      if (!validate("amount", "Amount")) return;
      if (!validate("uploadCheck", "Check")) return;

      url = `${localStorage.getItem("api-url")}/upload-deposit/${
        decoded.email
      }/${document.getElementById("accountSelect").value}/${
        document.getElementById("amount").value
      }`;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setAmount(0);
        setBalance(response.data.balance);
        setStatus(type + " was successful");
        setTimeout(() => setStatus(""), 3000);
        document.getElementById("uploadCheck").value = "";
      } else {
        alert("Some error occured");
      }
    } catch (e) {
      alert(e.message);
    }
  }

  function onChangeType() {
    if (document.getElementById("depositAmount").checked === true) {
      document.getElementById("amountButtonDiv").style.display = "inline";
      document.getElementById("checkDiv").style.display = "none";
    } else {
      document.getElementById("amountButtonDiv").style.display = "none";
      document.getElementById("checkDiv").style.display = "inline";
    }
  }

  let radios = "";
  let button = "";
  if (type === "Deposit") {
    radios = (
      <>
        Deposit Type
        <br />
        <input
          type="radio"
          id="depositAmount"
          name="depositType"
          value="depositAmount"
          onClick={onChangeType}
          defaultChecked
        />
        &nbsp;
        <label htmlFor="depositAmount">Amount</label>
        &nbsp; &nbsp; &nbsp;
        <input
          type="radio"
          id="depositCheck"
          name="depositType"
          value="depositCheck"
          onClick={onChangeType}
        />
        &nbsp;
        <label htmlFor="depositCheck">Check</label>
        <br />
        <br />
        <form id="myForm" onSubmit={(e) => onFileFormSubmit(e)}>
          <div id="checkDiv" style={{ display: "none" }}>
            <label htmlFor="upload-check" className="label">
              Upload check
              <input
                type="file"
                id="uploadCheck"
                key="upload-check"
                accept="image/*"
                className="input-for-upload form-control"
                name="upload-check"
                ref={fileInput}
              />
            </label>
            <br />
            <br />
            <button id="submitCheck" type="submit" className="btn btn-light">
              {type}
            </button>
          </div>
        </form>
      </>
    );
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
      <div id="amountDiv">
        {type} Amount
        <br />
        <input
          type="number"
          className="form-control"
          id="amount"
          placeholder={type.toLowerCase() + " amount"}
          value={amount}
          onChange={handleChange}
        />
        <br />
      </div>
      {select}
      {radios}
      <div id="amountButtonDiv">
        <button
          id="submit-transaction"
          type="submit"
          className="btn btn-light"
          onClick={handleOnclick}
        >
          {type}
        </button>
      </div>
    </>
  );
}

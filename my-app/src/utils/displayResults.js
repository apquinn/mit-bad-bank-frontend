export default function displayResults(results, decoded, handleDelete) {
  if (results) {
    let delItem = "";
    let padding = "";
    let localPending = "";
    const transactions = results.map((user, index) => {
      if (user.type === "login" || user.type === "create user") {
        if (decoded.userType === "employee") {
          delItem = (
            <div key={"card-body50" + index} className="col-md-1"></div>
          );
        }

        return (
          <div key={"card-body5" + index} className="row">
            {delItem}
            <div key={"card-body6" + index} className="col-md-2">
              {user.type}
            </div>
            <div key={"card-body8" + index} className="col-md-2">
              {user.email}
            </div>
            <div key={"card-body9" + index} className="col-md-4">
              password: encrypted
            </div>
          </div>
        );
      }
      if (user.type === "account creation") {
        if (decoded.userType === "employee") {
          delItem = (
            <div key={"card-body51" + index} className="col-md-1"></div>
          );
        }

        return (
          <div key={"card-body65" + index} className="row">
            {delItem}
            <div key={"card-body66" + index} className="col-md-2">
              {user.type}
            </div>
            <div key={"card-body68" + index} className="col-md-2">
              {user.email}
            </div>
            <div key={"card-body69" + index} className="col-md-4">
              account name: {user.name}
            </div>
          </div>
        );
      }
      if (user.type === "logout") {
        if (decoded.userType === "employee") {
          delItem = (
            <div key={"card-body52" + index} className="col-md-1"></div>
          );
        }

        return (
          <div key={"card-body15" + index} className="row">
            {delItem}
            <div key={"card-body16" + index} className="col-md-2">
              {user.type}
            </div>
            <div key={"card-body18" + index} className="col-md-2">
              {user.email}
            </div>
          </div>
        );
      }
      if (user.type === "transaction") {
        if (decoded.userType === "employee") {
          delItem = (
            <div key={"card-body53" + index} className="col-md-1">
              <button
                id={user._id}
                key={user._id}
                className="delete-transaction-button"
                onClick={(e) => handleDelete(e)}
              >
                delete
              </button>
            </div>
          );
          padding = (
            <div key={"card-body54" + index} className="col-md-5"></div>
          );
        } else {
          <div key={"card-body54" + index} className="col-md-4"></div>;
        }

        if (user.pending !== "0") {
          localPending = (
            <div key={"card-body132" + index} className="col-md-2">
              pending: {user.pending}
            </div>
          );
        }
        return (
          <>
            <div key={"card-body26" + index} className="row">
              {delItem}
              <div key={"card-body27" + index} className="col-md-2">
                {user.type}
              </div>
              <div key={"card-body29" + index} className="col-md-2">
                {user.email}
              </div>
              <div key={"card-body28" + index} className="col-md-3">
                {user.account}
              </div>
            </div>
            <div key={"card-body126" + index} className="row">
              {padding}
              <div key={"card-body130" + index} className="col-md-2">
                amount: {user.amount}
              </div>
              <div key={"card-body131" + index} className="col-md-2">
                balance: {user.balance}
              </div>
              {localPending}
            </div>
          </>
        );
      }
      return "";
    });

    return transactions;
  }
}

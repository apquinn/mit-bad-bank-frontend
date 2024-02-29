export default function displayResults(
  results,
  transactions,
  decoded,
  handleDelete
) {
  if (results) {
    let delItem = "";
    transactions = results.map((user, index) => {
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
              <div key={"card-body30" + index} className="col-md-2">
                amount: {user.amount}
              </div>
              <div key={"card-body31" + index} className="col-md-2">
                balance: {user.balance}
              </div>
              <div key={"card-body28" + index} className="col-md-3">
                {user.account}
              </div>
            </div>
          </>
        );
      }
      return "";
    });

    return transactions;
  }
}

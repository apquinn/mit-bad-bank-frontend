import "bootstrap/dist/css/bootstrap.css";

export default function DisplayAllCard(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-12 " + bg + txt;
  }

  const transactions = props.ctx.users.map((user) => {
    if (user.type === "user")
      return (
        <div className="row">
          <div className="col-md-2">user created</div>
          <div className="col-md-2">{user.name}</div>
          <div className="col-md-3">{user.email}</div>
          <div className="col-md-4">password: {user.password}</div>
        </div>
      );
    if (user.type === "login")
      return (
        <div className="row">
          <div className="col-md-2">{user.action}</div>
          <div className="col-md-2">{user.name}</div>
          <div className="col-md-3">{user.email}</div>
          <div className="col-md-2"></div>
          <div className="col-md-3">balance: {user.balance}</div>
        </div>
      );
    if (user.type === "deposit" || user.type === "withdrawl")
      return (
        <div className="row">
          <div className="col-md-2">{user.type}</div>
          <div className="col-md-2">{user.name}</div>
          <div className="col-md-3">{user.email}</div>
          <div className="col-md-2">amount: {user.amount}</div>
          <div className="col-md-3">balance: {user.balance}</div>
        </div>
      );
    return "";
  });

  return (
    <div className={classes()}>
      <div className="card-header">{props.header}</div>
      <div
        className="card-body"
        style={{
          "background-color": "white",
          color: "black",
          "margin-bottom": "3px",
        }}
      >
        <div className="container">
          <div className="row" style={{ "border-bottom": "1px solid black" }}>
            <div className="col-md-2">Action</div>
            <div className="col-md-2">Name</div>
            <div className="col-md-2">E-mail</div>
            <div className="col-md-2"></div>
          </div>
          {transactions}
        </div>
      </div>
    </div>
  );
}

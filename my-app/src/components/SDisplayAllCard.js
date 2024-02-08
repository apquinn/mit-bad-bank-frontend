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
        <div key="card-body5" className="row">
          <div key="card-body6" className="col-md-2">
            user created
          </div>
          <div key="card-body7" className="col-md-2">
            {user.name}
          </div>
          <div key="card-body8" className="col-md-3">
            {user.email}
          </div>
          <div key="card-body9" className="col-md-4">
            password: {user.password}
          </div>
        </div>
      );
    if (user.type === "login")
      return (
        <div key="card-body10" className="row">
          <div key="card-body11" className="col-md-2">
            {user.action}
          </div>
          <div key="card-body12" className="col-md-2">
            {user.name}
          </div>
          <div key="card-body13" className="col-md-3">
            {user.email}
          </div>
          <div key="card-body14" className="col-md-2"></div>
          <div key="card-body15" className="col-md-3">
            balance: {user.balance}
          </div>
        </div>
      );
    if (user.type === "deposit" || user.type === "withdrawl")
      return (
        <div key="card-body16" className="row">
          <div key="card-body17" className="col-md-2">
            {user.type}
          </div>
          <div key="card-body18" className="col-md-2">
            {user.name}
          </div>
          <div key="card-body19" className="col-md-3">
            {user.email}
          </div>
          <div key="card-body20" className="col-md-2">
            amount: {user.amount}
          </div>
          <div key="card-body21" className="col-md-3">
            balance: {user.balance}
          </div>
        </div>
      );
    return "";
  });

  return (
    <div className={classes()}>
      <div key="card-header" className="card-header">
        {props.header}
      </div>
      <div
        className="card-body"
        key="card-body"
        style={{
          backgroundColor: "white",
          color: "black",
          marginBottom: "3px",
        }}
      >
        <div key="card-body-wrapper" className="container">
          <div
            key="card-body-main"
            className="row"
            style={{ borderBottom: "1px solid black" }}
          >
            <div key="card-body1" className="col-md-2">
              Action
            </div>
            <div key="card-body2" className="col-md-2">
              Name
            </div>
            <div key="card-body3" className="col-md-2">
              E-mail
            </div>
            <div key="card-body4" className="col-md-2"></div>
          </div>
          {transactions}
        </div>
      </div>
    </div>
  );
}

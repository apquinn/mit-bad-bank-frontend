import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function DisplayApproveCard({ propsHeader, select }) {
  const [unapproved, setUnapproved] = React.useState([]);
  const decoded = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`${localStorage.getItem("api-url")}/get-all-unapproved`)
      .then((res) => {
        setUnapproved(res.data);
      });
  }, []);

  function handleApprove(e) {
    var url = `${localStorage.getItem("api-url")}/approve-check/${e.target.id}`;
    axios.get(url).then((res) => {
      setUnapproved(res.data);
    });
  }

  const checks = unapproved.map((item, index) => {
    return (
      <>
        <div key={"card-body-main-" + index} className="row">
          <div key={"card-body1-" + index} className="col-md-2">
            <button onClick={handleApprove} id={item[1]._id} key={item[1]._id}>
              approve
            </button>
          </div>
          <div key={"card-body2-" + index} className="col-md-2">
            {item[1].amount}
          </div>
          <div
            key={"card-body3-" + index}
            className="col-md-7"
            style={{ paddingBottom: "25px" }}
          >
            <img
              style={{ width: "400px" }}
              key={"card-body4-" + index}
              src={
                localStorage.getItem("api-url") + "/uploads/" + item[1].checkPic
              }
            />
          </div>
        </div>
      </>
    );
  });

  return (
    <div key="main" className="card mb-12 bg-primary text-white">
      <div key="card-header" className="card-header">
        {propsHeader}
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
            style={{ borderBottom: "1px solid black", marginBottom: "10px" }}
          >
            <div key="card-body1" className="col-md-2">
              Action
            </div>
            <div key="card-body2" className="col-md-2">
              Amount
            </div>
            <div key="card-body3" className="col-md-8">
              Check image
            </div>
          </div>
          {checks}
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import DisplayAllCard from "./components/SDisplayAllCard.js";

export default function AllData() {
  return (
    <>
      <h5>All Data in Store</h5>
      <br />
      <DisplayAllCard bgcolor="primary" header="User Actions" />
    </>
  );
}

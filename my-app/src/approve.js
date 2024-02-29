import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import DisplayApproveCard from "./components/SDisplayApproveCard.js";

export default function Approve() {
  return (
    <>
      <DisplayApproveCard propsHeader="Unapproved check deposits" />
    </>
  );
}

import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import DisplayAllCard from "./components/SDisplayAllCard.js";

export default function AllData() {
  let selectBox = "";

  return (
    <>
      <DisplayAllCard propsHeader="User Events" select={<>{selectBox}</>} />
    </>
  );
}

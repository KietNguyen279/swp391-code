import React from "react";
import LayoutTemplate from "../../../components/header-footer-template/LayoutTemplate";
import PondList from "./pondList";
import PondDetails from "./updatePond";
import AddPond from "./addPond";

function YourPond() {
  return (
    <LayoutTemplate>
      <div className="container">
        <PondList />
        <PondDetails />
        <AddPond />
      </div>
    </LayoutTemplate>
  );
}

export default YourPond;

import React from "react";
import LayoutTemplate from "../../../components/header-footer-template/LayoutTemplate";
import MemberCRUDTemplate from "../../../components/CRUD-template/member/MemberCRUDTemplate";
import { Button } from "antd";

function ManagePond() {
  const koiPond = [
    {
      name: "Sunset Pond",
      imgSrc:
        "https://images.unsplash.com/photo-1678754183715-87b12a70ef28?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "12x8 feet",
      depth: "4 feet",
      volume: "3,500 gallons",
      drainageOutlets: "2",
      pumpPower: "5,000 GPH",
    },
    {
      name: "Emerald Waters",
      imgSrc:
        "https://images.unsplash.com/photo-1678754183715-87b12a70ef28?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "15x10 feet",
      depth: "5 feet",
      volume: "6,000 gallons",
      drainageOutlets: "3",
      pumpPower: "6,500 GPH",
    },
    {
      name: "Crystal Lagoon",
      imgSrc:
        "https://images.unsplash.com/photo-1678754183715-87b12a70ef28?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "10x6 feet",
      depth: "3.5 feet",
      volume: "2,800 gallons",
      drainageOutlets: "1",
      pumpPower: "4,000 GPH",
    },
    {
      name: "Golden Stream",
      imgSrc:
        "https://images.unsplash.com/photo-1678754183715-87b12a70ef28?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "14x9 feet",
      depth: "4.5 feet",
      volume: "5,000 gallons",
      drainageOutlets: "2",
      pumpPower: "5,500 GPH",
    },
    {
      name: "Moonlit Cove",
      imgSrc:
        "https://images.unsplash.com/photo-1678754183715-87b12a70ef28?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "18x12 feet",
      depth: "6 feet",
      volume: "8,000 gallons",
      drainageOutlets: "4",
      pumpPower: "7,000 GPH",
    },
  ];

  return (
    <div>
      <LayoutTemplate>
        <div
          className="pond row"
          style={{ padding: "120px", "--bs-gutter-x": "0" }}
        >
          {/* <MemberCRUDTemplate formItems={formItems} /> */}
          {koiPond.map((pond, index) => (
            <div
              key={index}
              className="row"
              style={{
                marginBottom: "20px",
                border: "1px solid #e0e0e0",
                borderRadius: "15px",
                padding: "30px 0",
              }}
            >
              <div className="col-md-4 justify-content-center align-items-center">
                <img
                  src={pond.imgSrc}
                  alt={pond.name}
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Pond contents */}
              <div className="col-md-8">
                <h2 style={{ color: "#FF6900" }}>{pond.name}</h2>
                <div className="row mt-5">
                  <div className="col-md-6">
                    <p>
                      <strong>Size: </strong>
                      {pond.size}
                    </p>
                    <p>
                      <strong>Depth: </strong>
                      {pond.depth}
                    </p>
                    <p>
                      <strong>Volume: </strong>
                      {pond.volume}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Drainage Outlets: </strong>
                      {pond.drainageOutlets}
                    </p>
                    <p>
                      <strong>Pump Power: </strong>
                      {pond.pumpPower}
                    </p>
                  </div>
                </div>
                <div className="CRUD_button ">
                  <Button style={{ backgroundColor: "#FF6900", color: "#fff" }}>
                    Update
                  </Button>
                  <Button style={{ backgroundColor: "#000", color: "#fff" }}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutTemplate>
    </div>
  );
}

export default ManagePond;

import React, { useEffect } from "react";
import { Button, message, Modal, Card } from "antd";
import usePondStore from "./usePondStore";
import AddPond from "./addPond";
import UpdatePond from "./updatePond";
import {
  fetchPondData,
  deletePond,
  addPond,
  updatePond,
} from "../../../config/ApiPond.jsx";

function PondList() {
  const { ponds, setPonds } = usePondStore();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [selectedPond, setSelectedPond] = React.useState(null);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const fetchPonds = async () => {
    try {
      const data = await fetchPondData();
      if (Array.isArray(data)) {
        setPonds(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setPonds([]); // Reset to an empty array if not an array
      }
    } catch (error) {
      console.error("Error fetching pond data:", error);
      setPonds([]); // Optionally reset in case of an error
    }
  };

  useEffect(() => {
    fetchPonds();
  }, [ponds]); // This will call fetchPonds again whenever ponds changes

  const handleAddPond = async (newPond) => {
    try {
      const addedPond = await addPond(newPond);
      message.success("Pond added successfully!"); // Show success toast
      setPonds((prev) => [...prev, addedPond]);
      setOpenAdd(false);
    } catch (error) {
      console.error("Error adding pond:", error);
      message.error("Failed to add pond."); // Show error toast
    }
  };

  const handleUpdatePond = async (updatedPond) => {
    try {
      const pondAfterUpdate = await updatePond(updatedPond);
      message.success("Pond updated successfully!"); // Show success toast
      setPonds((prev) =>
        prev.map((p) => (p.id === pondAfterUpdate.id ? pondAfterUpdate : p))
      );
      setOpenUpdate(false);
    } catch (error) {
      console.error("Error updating pond:", error);
      message.error("Failed to update pond."); // Show error toast
    }
  };

  const handleDeletePond = (id) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this pond?",
      okText: "Delete",
      onOk: async () => {
        try {
          await deletePond(id);
          message.success(`Pond deleted successfully.`); // Show success toast
          setPonds((prevPonds) => prevPonds.filter((pond) => pond.id !== id));
        } catch (error) {
          console.error("Error deleting pond:", error.message);
          message.error("Failed to delete pond.");
        }
      },
    });
  };

  const handleClickOpen = (pond) => {
    setSelectedPond(pond);
    setOpenUpdate(true);
  };

  return (
    <div>
      <h1>Your Ponds</h1>
      <Button
        type="primary"
        onClick={() => setOpenAdd(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Pond +
      </Button>
      {Array.isArray(ponds) && ponds.length > 0 ? (
        ponds.map((p) => (
          <Card key={p.id} style={{ margin: "10px 0" }} hoverable>
            <Card.Meta
              title={p.name}
              description={
                <div className="row">
                  <div className="col-4">
                    <img
                      src={p.image}
                      width="150px"
                      height="150px"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-6">
                        <p className="card-text">Size: {p.size} m²</p>
                        <p className="card-text">Depth: {p.depth} m</p>
                        <p className="card-text">Volume: {p.volume} L</p>
                      </div>
                      <div className="col-6">
                        <p className="card-text">Drains: {p.num_of_drains}</p>
                        <p className="card-text">
                          Pump Capacity: {p.pump_capacity} L/min
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Button
              type="link"
              onClick={() => handleClickOpen(p)}
              style={{ textAlign: "center", width: "100%", color: "black" }}
            >
              View More
            </Button>
          </Card>
        ))
      ) : (
        <p>No pond data available.</p>
      )}
      <AddPond
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddPond}
      />
      <UpdatePond
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        pond={selectedPond}
        onUpdate={handleUpdatePond}
        onDelete={handleDeletePond}
      />
    </div>
  );
}

export default PondList;

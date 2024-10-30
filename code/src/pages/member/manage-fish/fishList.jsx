import React, { useEffect } from "react";
import { Button, message, Modal, Card } from "antd";
import useFishStore from "./useFishStore";
import AddFish from "./addFish";
import UpdateFish from "./updateFish";
import {
  fetchFishData,
  deleteFish,
  addFish,
  updateFish,
} from "../../../config/ApiFish.jsx";

function FishList() {
  const { fish, setFish } = useFishStore();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [selectedFish, setSelectedFish] = React.useState(null);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const fetchFish = async () => {
    try {
      const data = await fetchFishData();
      if (Array.isArray(data)) {
        setFish(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setFish([]); // Reset to an empty array if not an array
      }
    } catch (error) {
      console.error("Error fetching fish data:", error);
      setFish([]); // Optionally reset in case of an error
    }
  };

  useEffect(() => {
    fetchFish();
  }, [fish]); // This will call fetchFish again whenever fish changes

  const handleAddFish = async (newFish) => {
    try {
      const addedFish = await addFish(newFish);
      message.success("Fish added successfully!"); // Show success toast
      setFish((prev) => [...prev, addedFish]);
      setOpenAdd(false);
    } catch (error) {
      console.error("Error adding fish:", error);
      message.error("Failed to add fish."); // Show error toast
    }
  };

  const handleUpdateFish = async (updatedFish) => {
    try {
      const fishAfterUpdate = await updateFish(updatedFish);
      message.success("Fish updated successfully!"); // Show success toast
      setFish((prev) =>
        prev.map((f) => (f.id === fishAfterUpdate.id ? fishAfterUpdate : f))
      );
      setOpenUpdate(false);
    } catch (error) {
      console.error("Error updating fish:", error);
      message.error("Failed to update fish."); // Show error toast
    }
  };

  const handleDeleteFish = (id) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this fish?",
      okText: "Delete",
      onOk: async () => {
        try {
          await deleteFish(id);
          message.success(`Fish deleted successfully.`); // Show success toast
          setFish((prevFish) => prevFish.filter((fish) => fish.id !== id));
        } catch (error) {
          console.error("Error deleting fish:", error.message);
          message.error("Failed to delete fish.");
        }
      },
    });
  };

  const handleClickOpen = (fish) => {
    setSelectedFish(fish);
    setOpenUpdate(true);
  };

  return (
    <div>
      <h1>Your Fish</h1>
      <Button
        type="primary"
        onClick={() => setOpenAdd(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Fish +
      </Button>
      {Array.isArray(fish) && fish.length > 0 ? (
        fish.map((f) => (
          <Card key={f.id} style={{ margin: "10px 0" }} hoverable>
            <Card.Meta
              title={f.name}
              description={
                <div className="row">
                  <div className="col-4">
                    <img
                      src={f.image}
                      width="150px"
                      height="150px"
                      alt={f.name}
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-6">
                        <p className="card-text">Body Shape: {f.body_shape}</p>
                        <p className="card-text">Origin: {f.origin}</p>
                        <p className="card-text">Breed: {f.breed}</p>
                        <p className="card-text">Gender: {f.gender}</p>
                      </div>
                      <div className="col-6">
                        <p className="card-text">Age: {f.age}</p>
                        <p className="card-text">Size: {f.size}</p>
                        <p className="card-text">
                          Food for Fish: {f.food_required_kg_per_day}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Button
              type="link"
              onClick={() => handleClickOpen(f)}
              style={{ textAlign: "center", width: "100%", color: "black" }}
            >
              View More
            </Button>
          </Card>
        ))
      ) : (
        <p>No fish data available.</p>
      )}
      <AddFish
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddFish}
      />
      <UpdateFish
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        fish={selectedFish}
        onUpdate={handleUpdateFish}
        onDelete={handleDeleteFish}
      />
    </div>
  );
}

export default FishList;

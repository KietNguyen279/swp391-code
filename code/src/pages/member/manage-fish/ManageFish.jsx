import LayoutTemplate from "../../../components/header-footer-template/LayoutTemplate";
import FishList from "./fishList";
import FishDetails from "./updateFish";
import AddFish from "./addFish";


function YourFish() {
  return (
    <LayoutTemplate>
      <div className="container">
        <FishList />
        <FishDetails />
        <AddFish />
      </div>
    </LayoutTemplate>
  );
}

export default YourFish;
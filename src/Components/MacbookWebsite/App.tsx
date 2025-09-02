import useCameraStore from "../../Utils/useCameraStore";
import { LeftSideComponent } from "./LeftSide";
import { RightSideComponent } from "./RightSide";

export const App = () => {
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCamera(2);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-stone-800 grid grid-cols-[30%_70%] gap-2 pt-6 px-4 text-[#e2d7d0] w-[400px] h-[265px] rounded"
    >
      <LeftSideComponent />
      <RightSideComponent />
    </div>
  );
};

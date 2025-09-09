import useCameraStore from "@/Utils/useCameraStore";

export const App = () => {
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCamera(4);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-stone-800 text-white flex items-center justify-center relative"
      style={{
        width: "390px",
        height: "844px",
        borderRadius: "30px",
        overflow: "hidden",
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 bg-black"
        style={{
          width: "210px",
          height: "35px",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      />
      <p className="text-3xl">Iphone</p>
    </div>
  );
};

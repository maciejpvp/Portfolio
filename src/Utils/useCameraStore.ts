import { create } from "zustand";

interface CameraStore {
  selectedCamera: number;
  setSelectedCamera: (camera: number) => void;
}

const useCameraStore = create<CameraStore>((set) => ({
  selectedCamera: 0,
  setSelectedCamera: (camera) =>
    set((state) => {
      console.log(camera);
      if (state?.selectedCamera === camera) return {};
      return { selectedCamera: camera };
    }),
}));

export default useCameraStore;

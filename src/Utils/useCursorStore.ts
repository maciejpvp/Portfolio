import { create } from "zustand";

type CursorStore = {
  isCursorInWebsite: boolean;
  setIsCursorInWebsite: (isCursorInWebsite: boolean) => void;
};

const useCursorStore = create<CursorStore>((set) => ({
  isCursorInWebsite: false,
  setIsCursorInWebsite: (isCursorInWebsite: boolean) =>
    set(() => ({ isCursorInWebsite })),
}));

export default useCursorStore;

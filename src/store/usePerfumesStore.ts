import { create } from "zustand";
import { PerfumesType } from "../utils/types";

type Store = {
    perfumes: PerfumesType[];
    setPerfumes: (perfume: PerfumesType[]) => void;
}

export const usePerfumesStore = create<Store>((set) => ({
    perfumes: [],
    setPerfumes: (perfumes) => set({perfumes})
}))
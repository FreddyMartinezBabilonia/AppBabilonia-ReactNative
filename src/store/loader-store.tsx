import { create } from "zustand";

export interface LoaderState {
    loader: boolean;
    setLoader: (state: boolean) => void;
}

export const useLoaderStore = create<LoaderState>()((set) => ({
    loader: false,
    setLoader: (state) => set({ loader: state }),
}));
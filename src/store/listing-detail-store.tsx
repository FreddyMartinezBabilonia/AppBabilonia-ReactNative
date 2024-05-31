import { create } from "zustand";

type Id = number | null;

export interface ListingDetailStore {
    id : Id;
    setId: (state:Id) => void;
}

export const useListingDetailStore = create<ListingDetailStore>()((set) => ({
    id: null,
    setId: (state:Id) => set({ id: state }),
}));
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "@/types";

const initialState: ModalState = {
  shareModal: false,
  cardActionModal: false,
  cardActionPosition: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleShareModal: (state) => {
      state.shareModal = !state.shareModal;
    },
    toggleCardActionModal: (
      state,
      action: PayloadAction<{ x: number; y: number } | null>
    ) => {
      state.cardActionModal = !state.cardActionModal;
      state.cardActionPosition = action.payload;
    },
    closeAllModals: (state) => {
      state.shareModal = false;
      state.cardActionModal = false;
      state.cardActionPosition = null;
    },
  },
});

export const { toggleShareModal, toggleCardActionModal, closeAllModals } =
  modalSlice.actions;
export default modalSlice.reducer;

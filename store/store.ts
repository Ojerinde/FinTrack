import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import modalReducer from "./slices/modalSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    modal: modalReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

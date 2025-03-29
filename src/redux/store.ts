import { configureStore } from "@reduxjs/toolkit";
import { paginationReducer } from "./features/pagination.slice";

const store = configureStore({
  reducer: {
    pagination: paginationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

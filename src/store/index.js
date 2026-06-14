import { configureStore } from "@reduxjs/toolkit";
import reducer from "./modules/billReducer";

const store = configureStore({
  reducer: {
    bill: reducer,
  },
});

export default store;

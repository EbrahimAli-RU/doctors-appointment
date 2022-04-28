import { configureStore } from "@reduxjs/toolkit";
import Auth from "./auth";

const store = configureStore({
  reducer: {
    auth: Auth,
  },
});

export default store;

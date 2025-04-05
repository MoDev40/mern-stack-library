import { configureStore } from "@reduxjs/toolkit/react";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    [userReducer.reducerPath]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userReducer.middleware),
});

setupListeners(store.dispatch);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (defoultMiddleWare) => defoultMiddleWare().concat(api.middleware),
});

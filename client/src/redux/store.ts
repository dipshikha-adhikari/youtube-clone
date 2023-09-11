import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import componentsReducer from "./slices/componentsSlice";
import videosReducer from "./slices/videosSlice";
import themeReducer from "./slices/themeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { videosApi } from "../services/videos";

const rootReducers = combineReducers({
  auth: authReducer,
  components: componentsReducer,
  videos: videosReducer,
  theme: themeReducer,
  [videosApi.reducerPath] : videosApi.reducer
});

const persistConfig = {
  key: "root",
  storage,
  version:1,
  whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware(
    {
      serializableCheck: false

    }
  ).concat(videosApi.middleware)
});

export let persistor = persistStore(store);

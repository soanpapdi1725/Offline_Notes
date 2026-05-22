import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./Reducer/combineReducer";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["savedNotes"],
};

const notesPersisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: notesPersisted,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistorNotes = persistStore(store);

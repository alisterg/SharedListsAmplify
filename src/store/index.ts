import {
  Action,
  configureStore,
  ConfigureStoreOptions,
  ThunkAction,
} from "@reduxjs/toolkit";
import settingsReducer from "./settings";
import itemsReducer from "./items";
import { STORAGE_SETTING_REDUX } from "../Constants";

const storeOptions: ConfigureStoreOptions = {
  reducer: {
    settings: settingsReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
};

const storage = localStorage.getItem(STORAGE_SETTING_REDUX);

if (storage) {
  storeOptions.preloadedState = JSON.parse(storage);
}

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

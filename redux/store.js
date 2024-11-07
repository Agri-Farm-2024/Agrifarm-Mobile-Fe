import storage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import { userSlice } from "./slices/userSlice";
import processSlice from "./slices/processSlice";
import cartSlice from "./slices/cartSlice";
import materialSlice from "./slices/materialSlice";
import cartReducer from "./slices/cartSlice";
import landSlice from "./slices/landSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  safelist: ["userSlice"], // name of reducer which will be stored in the local storage
};

const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  cartSlice: cartSlice.reducer,
  processSlice: processSlice.reducer,
  materialSlice: materialSlice.reducer,
  cart: cartReducer.reducer,
  landSlice: landSlice.reducer,

  //add more reducer here
  //...
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        warnAfter: 400, // Increase the warning threshold to 400
      },
    }),
});

export const persistor = persistStore(store);

import storage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import { userSlice } from "./slices/userSlice";
import processSlice from "./slices/processSlice";
import cartSlice from "./slices/cartSlice";
import materialSlice from "./slices/materialSlice";
import cartReducer from "./slices/cartSlice";
import landSlice from "./slices/landSlice";
import serviceSlice from "./slices/serviceSlice";
import plantSlice from "./slices/plantSlice";
import transactionSlice from "./slices/transactionSlice";
import requestSlice from "./slices/requestSlice";
import taskSlice from "./slices/taskSlice";
import chatSlice from "./slices/chatSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["userSlice"],
};

const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  cartSlice: cartSlice.reducer,
  processSlice: processSlice.reducer,
  materialSlice: materialSlice.reducer,
  cart: cartReducer.reducer,
  landSlice: landSlice.reducer,
  serviceSlice: serviceSlice.reducer,
  plantSlice: plantSlice.reducer,
  requestSlice: requestSlice.reducer,
  taskSlice: taskSlice.reducer,
  chatSlice: chatSlice.reducer,
  transactionSlice: transactionSlice.reducer,

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

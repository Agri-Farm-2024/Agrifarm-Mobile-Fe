import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";

export const buyMaterial = createAsyncThunk(
  "materialSlice/buyMaterial",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post(`/materials/buyMaterial`, formData);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cartCount: 0,
  items: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.material_id === action.payload.material_id
      );

      console.log("existingItemIndex: " + existingItemIndex);

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }

      let countNumberOfCart = 0;
      state.items.map((item) => (countNumberOfCart += 1));
      state.cartCount = countNumberOfCart;
      console.log("cart: " + JSON.stringify(state.items));

      AsyncStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.cartCount -= 1;
      state.items = state.items.filter(
        (item) => item.material_id !== action.payload.material_id
      );
      AsyncStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.cartCount = 0;
      AsyncStorage.removeItem("cartItems");
    },
    increaseQuantity: (state, action) => {
      state.items = state.items.map((item) =>
        item.material_id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      AsyncStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      state.items = state.items
        .map((item) =>
          item.material_id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      AsyncStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyMaterial.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(buyMaterial.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(buyMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice;

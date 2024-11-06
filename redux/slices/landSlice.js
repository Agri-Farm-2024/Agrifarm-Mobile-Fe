import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getListOfLand = createAsyncThunk(
  "landSlice/getListOfLand",
  async ({ status, page_size, page_index }, { rejectWithValue }) => {
    console.log("status", status);
    console.log("page_size", page_size);
    console.log("page_index", page_index);

    try {
      const data = await api.get(
        `/lands?status=${status}&page_size=${page_size}&page_index=${page_index}`
      );

      // console.log("getListOfLand data:", data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookingLand = createAsyncThunk(
  "landSlice/bookingLand",
  async (
    { land_id, time_start, total_month, purpose_rental },
    { rejectWithValue }
  ) => {
    console.log({ land_id, time_start, total_month, purpose_rental });

    try {
      const data = await api.post(`/bookings`, {
        land_id,
        time_start,
        total_month: Number(total_month),
        purpose_rental,
      });

      console.log("bookingLand data:", data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const landSlice = createSlice({
  name: "landSlice",
  initialState: {
    landList: [],
    loading: false,
    error: null,
    msg: "",
  },
  reducers: {
    // setUser: (state, action) => {
    //   state.userInfo = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOfLand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListOfLand.fulfilled, (state, action) => {
        state.loading = false;
        state.landList = action.payload.metadata;
      })
      .addCase(getListOfLand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(bookingLand.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookingLand.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.metadata;
      })
      .addCase(bookingLand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default landSlice;

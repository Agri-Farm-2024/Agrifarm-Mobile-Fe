import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getListOfBookingLand = createAsyncThunk(
  "requestSlice/getListOfBookingLand",
  async ({ page_size, page_index }, { rejectWithValue }) => {
    console.log("page_size", page_size);
    console.log("page_index", page_index);

    try {
      const data = await api.get(
        `/bookings?type=booking&page_size=${page_size}&page_index=${page_index}`
      );

      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBookingByID = createAsyncThunk(
  "requestSlice/getBookingByID",
  async ({ booking_id }, { rejectWithValue }) => {
    console.log("bookings", booking_id);

    try {
      const data = await api.get(`/bookings/${booking_id}`);

      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const requestSlice = createSlice({
  name: "requestSlice",
  initialState: {
    requestLandLease: [],
    booking: {},
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
      .addCase(getListOfBookingLand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListOfBookingLand.fulfilled, (state, action) => {
        state.loading = false;
        state.requestLandLease = action.payload.metadata;
      })
      .addCase(getListOfBookingLand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookingByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByID.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.metadata;
      })
      .addCase(getBookingByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestSlice;

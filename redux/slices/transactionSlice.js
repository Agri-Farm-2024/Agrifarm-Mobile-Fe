import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const cancelTransaction = createAsyncThunk(
  "transactionSlice/cancelTransaction",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/transactions/${transactionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListOfTransactions = createAsyncThunk(
  "transactionSlice/getListOfTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/transactions/getListTransactionByUser`);
      return response.data.metadata;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTransactionByID = createAsyncThunk(
  "transactionSlice/getTransactionByID",
  async ({ transactionID }, { rejectWithValue }) => {
    console.log("getTransactionByID: " + transactionID);
    try {
      const response = await api.get(`/transactions/${transactionID}`);
      return response.data.metadata;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Transaction slice
export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState: {
    transactionList: [],
    transaction: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOfTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListOfTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionList = action.payload;
      })
      .addCase(getListOfTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionByID.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(getTransactionByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelTransaction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(cancelTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = transactionSlice.actions; // Export the clear error action if needed

export default transactionSlice;

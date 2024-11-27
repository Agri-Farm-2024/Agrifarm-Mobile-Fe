import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getServicePackageList = createAsyncThunk(
  "serviceSlice/getServicePackageList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get(`/services/getListServicePackages`);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListServiceSpecific = createAsyncThunk(
  "serviceSlice/getListServiceSpecific",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get(
        `/services/getListServiceSpecific?page_size=100&page_index=1`
      );
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const buyService = createAsyncThunk(
  "serviceSlice/buyService",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post(`/services/buyServiceSpecific`, formData);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendSupportService = createAsyncThunk(
  "serviceSlice/sendSupportService",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post(
        `/requests/createRequestTechnicalSupport`,
        formData
      );
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: {
    servicePackage: {},
    listServiceInUse: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServicePackageList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getServicePackageList.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePackage = action.payload;
      })
      .addCase(getServicePackageList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getListServiceSpecific.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListServiceSpecific.fulfilled, (state, action) => {
        state.loading = false;
        state.listServiceInUse = action.payload;
      })
      .addCase(getListServiceSpecific.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(buyService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(buyService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(buyService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendSupportService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendSupportService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendSupportService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice;

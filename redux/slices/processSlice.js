import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const createStandardProcess = createAsyncThunk(
  "processSlice/createStandardProcess",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post(`/processes/createProcessStandard`, formData);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPlantSeason = createAsyncThunk(
  "processSlice/getPlantSeason",
  async (params, { rejectWithValue }) => {
    try {
      const data = await api.get(`/plants/plantSeasons`, params);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const processSlice = createSlice({
  name: "processSlice",
  initialState: {
    process: {},
    plantSeason: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStandardProcess.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createStandardProcess.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createStandardProcess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPlantSeason.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPlantSeason.fulfilled, (state, action) => {
        state.loading = false;
        state.plantSeason = action.payload;
      })
      .addCase(getPlantSeason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default processSlice;

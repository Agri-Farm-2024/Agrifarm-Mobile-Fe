import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getPlantSeasonList = createAsyncThunk(
  "plantSlice/getPlantSeasonList",
  async (params, { rejectWithValue }) => {
    try {
      const data = await api.get(`/plants/plantSeasons`, { params });
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPlantListByLandType = createAsyncThunk(
  "plantSlice/getPlantListByLandType",
  async (params, { rejectWithValue }) => {
    console.log(params);
    try {
      const data = await api.get(`/plants/`, { params });
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const plantSlice = createSlice({
  name: "plantSlice",
  initialState: {
    plant: {},
    plantSeason: {},
    plantList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlantSeasonList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPlantSeasonList.fulfilled, (state, action) => {
        state.loading = false;
        state.plantSeason = action.payload.metadata;
      })
      .addCase(getPlantSeasonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPlantListByLandType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPlantListByLandType.fulfilled, (state, action) => {
        state.loading = false;
        state.plantList = action.payload.metadata;
      })
      .addCase(getPlantListByLandType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default plantSlice;

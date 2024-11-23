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

export const getSpecificProcess = createAsyncThunk(
  "processSlice/getSpecificProcess",
  async (params, { rejectWithValue }) => {
    try {
      const data = await api.get(`/processes/getListProcessSpecific`, {
        params,
      });
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSpecificProcess = createAsyncThunk(
  "processSlice/updateSpecificProcess",
  async (params, { rejectWithValue }) => {
    try {
      const { formData, processId } = params;
      const data = await api.put(
        `/processes/updateProcessSpecific/${processId}`,
        formData
      );
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveSpecificProcess = createAsyncThunk(
  "processSlice/approveSpecificProcess",
  async (processId, { rejectWithValue }) => {
    try {
      const data = await api.put(
        `/processes/updateStatusProcessSpecific/${processId}`
      );
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const writeDiary = createAsyncThunk(
  "processSlice/writeDiary",
  async (params, { rejectWithValue }) => {
    try {
      const { processId, formData } = params;
      const data = await api.post(`/dinaries/${processId}`, formData);
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
    specificProcess: {},
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
      .addCase(writeDiary.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(writeDiary.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(writeDiary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSpecificProcess.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSpecificProcess.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSpecificProcess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveSpecificProcess.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(approveSpecificProcess.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(approveSpecificProcess.rejected, (state, action) => {
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
      })
      .addCase(getSpecificProcess.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSpecificProcess.fulfilled, (state, action) => {
        state.loading = false;
        //handle whether load a new list or paging
        if (action.payload.metadata?.pagination?.page_index > 1) {
          state.specificProcess = {
            ...state.specificProcess,
            ...action.payload.metadata,
          };
        } else {
          state.specificProcess = action.payload.metadata;
        }
      })
      .addCase(getSpecificProcess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default processSlice;

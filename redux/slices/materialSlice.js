import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getMaterial = createAsyncThunk(
  "materialSlice/getMaterial",
  async (params, { rejectWithValue }) => {
    try {
      console.log("params fetch material", JSON.stringify(params));
      const data = await api.get(`/materials/getAllMaterial`, { params });
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const materialSlice = createSlice({
  name: "materialSlice",
  initialState: {
    material: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMaterial.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMaterial.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.metadata?.pagination?.page_index > 1) {
          state.material = {
            materials: [
              ...state.material.materials,
              ...action?.payload?.metadata?.materials,
            ],
            pagination: action?.payload?.metadata?.pagination,
          };
        } else {
          state.material = action.payload.metadata;
        }
      })
      .addCase(getMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default materialSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getListTaskByUser = createAsyncThunk(
  "taskSlice/getListTaskByUser",
  async ({ status }, { rejectWithValue }) => {
    console.log("status", status);

    try {
      const data = await api.get(`/tasks/getByUser`);

      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const reportTask = createAsyncThunk(
  "taskSlice/reportTask",
  async (reportData, { rejectWithValue }) => {
    const { taskId, formData } = reportData;
    try {
      const data = await api.post(`/reports/${taskId}`, formData);

      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const startTaskByID = createAsyncThunk(
  "taskSlice/startTaskByID",
  async ({ task_id }, { rejectWithValue }) => {
    console.log("task_id", task_id);

    try {
      const data = await api.patch(`/tasks/start/${task_id}`);

      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {
    taskList: [],
    task: {},
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
      .addCase(getListTaskByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListTaskByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload.metadata;
      })
      .addCase(getListTaskByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(startTaskByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(startTaskByID.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.metadata;
      })
      .addCase(startTaskByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(reportTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(reportTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(reportTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice;

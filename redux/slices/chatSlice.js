import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getChatList = createAsyncThunk(
  "chatSlice/getChatList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get(`/channels`);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getChatDetail = createAsyncThunk(
  "chatSlice/getChatDetail",
  async (messageId, { rejectWithValue }) => {
    try {
      const data = await api.get(`/channels/messages/${messageId}`);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessageByUser = createAsyncThunk(
  "chatSlice/sendMessageByUser",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post(`/channels/messages`, formData);
      return data.data;
    } catch (error) {
      console.log("error sendMessage Slice", JSON.stringify(error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chatList: null,
    chatDetail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload.metadata;
      })
      .addCase(getChatList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getChatDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getChatDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.chatDetail = action.payload.metadata;
      })
      .addCase(getChatDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessageByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendMessageByUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendMessageByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice;

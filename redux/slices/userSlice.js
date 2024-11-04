import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk(
  "userSlice/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("login");
    console.log("email", email);
    console.log("password", password);

    try {
      const data = await api.post(`/auths/login?type=emailAndPassword`, {
        email,
        password,
      });

      console.log("login data:", data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userInfo: {
      created_at: null,
      updated_at: null,
      user_id: null,
      email: "",
      password: "",
      full_name: "",
      dob: null,
      phone: null,
      avatar_url: "",
      status: "",
      role: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    // setUser: (state, action) => {
    //   state.userInfo = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.metadata.user;
        AsyncStorage.setItem(
          "accessToken",
          action.payload.metadata.token.accessToken
        );
        AsyncStorage.setItem(
          "refreshToken",
          action.payload.metadata.token.refreshToken
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice;

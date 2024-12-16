import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Login Thunk
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

// Send OTP Thunk
export const sendOtp = createAsyncThunk(
  "userSlice/sendOtp",
  async (email, { rejectWithValue }) => {
    console.log("Sending OTP to email:", email);
    try {
      const response = await api.post(
        `/auths/sendOTP?type=forgotPassword`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("OTP sent successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

// Verify OTP Thunk
export const verifyOtp = createAsyncThunk(
  "userSlice/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log("Verifying OTP for email:", email, otp);
    try {
      const response = await api.post(
        `/auths/verifyOTP?type=forgotPassword`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("OTP verified successfully:", response.data);
      return response.data;
    } catch (error) {
      console.log(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
      return error.response?.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "userSlice/resetPassword",
  async ({ email }, { rejectWithValue }) => {
    console.log("Resetting password for email:", email);
    try {
      const response = await api.post(
        `/auths/resetPassword`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Password reset successful:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

// User Slice
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
    otpLoading: false,
    otpError: null,
    verifyLoading: false,
    verifyError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login Cases
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
      })
      // Send OTP Cases
      .addCase(sendOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.otpLoading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
      })
      // Verify OTP Cases
      .addCase(verifyOtp.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyLoading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyError = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetLoading = true;
        state.resetError = null;
        state.resetSuccess = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetLoading = false;
        state.resetSuccess = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetLoading = false;
        state.resetError = action.payload;
      });
  },
});

export default userSlice;

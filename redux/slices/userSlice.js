import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const login = createAsyncThunk(
//   "userSlice/login",
//   async ({ username, password }, { rejectWithValue }) => {
//     console.log("login");
//     console.log("username", username);
//     console.log("password", password);

//     try {
//       const data = await api.post(`/authen/login?type=username`, {
//         username,
//         password,
//       });

//       console.log("login data:", data);
//       return data.data;
//     } catch (error) {
//       console.log("error", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userInfo: {
      id: null,
      phone: null,
      email: null,
      name: null,
      username: null,
      password: null,
      bio: null,
      avatar_url: null,
      gender: null,
      date_of_birth: null,
      role: null,
      createdAt: null,
      updatedAt: null,
      last_active_time: null,
      is_premium: false,
      status: "active",
      longitude: null,
      latitude: null,
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
    builder;
    //   .addCase(login.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.userInfo = action.payload.metadata.user;
    //     AsyncStorage.setItem(
    //       "accessToken",
    //       action.payload.metadata.token.accessToken
    //     );
    //     AsyncStorage.setItem(
    //       "refreshToken",
    //       action.payload.metadata.token.refreshToken
    //     );
    //     AsyncStorage.setItem("xClientId", action.payload.metadata.user.id);
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
  },
});

export default userSlice;

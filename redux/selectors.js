//get state out of the reducer
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getUserLoadingSelector = (state) => state.userSlice.loading;

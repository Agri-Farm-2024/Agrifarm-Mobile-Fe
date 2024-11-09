//get state out of the reducer

//user
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getUserLoadingSelector = (state) => state.userSlice.loading;

//service
export const getServicePackageSelector = (state) =>
  state.serviceSlice.servicePackage;
export const serviceLoadingSelector = (state) => state.serviceSlice.loading;

//land
export const getBookingSelector = (state) => state.landSlice.booking;
export const landLoadingSelector = (state) => state.landSlice.loading;

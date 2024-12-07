//get state out of the reducer

//user
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getUserLoadingSelector = (state) => state.userSlice.loading;

//service
export const getServicePackageSelector = (state) =>
  state.serviceSlice.servicePackage;
export const getServiceSpecificSelector = (state) =>
  state.serviceSlice.listServiceInUse;
export const serviceLoadingSelector = (state) => state.serviceSlice.loading;

//plant
export const getPlantSeasonSelector = (state) => state.plantSlice.plantSeason;
export const plantLoadingSelector = (state) => state.plantSlice.loading;

//land
export const getBookingSelector = (state) => state.landSlice.booking;
export const landLoadingSelector = (state) => state.landSlice.loading;

//process
export const getSpecificProcessSelector = (state) =>
  state.processSlice.specificProcess;
export const getSpecificProcessDetailSelector = (state) =>
  state.processSlice.specificProcessDetail;
export const processLoadingSelector = (state) => state.processSlice.loading;

//material
export const getMaterialSelector = (state) => state.materialSlice.material;
export const getOrderSelector = (state) => state.materialSlice.order;
export const getBookingMaterialSelector = (state) =>
  state.materialSlice.bookingMaterial;
export const materialLoadingSelector = (state) => state.materialSlice.loading;

//chat
export const getChatListSelector = (state) => state.chatSlice.chatList;
export const chatLoadingSelector = (state) => state.chatSlice.loading;

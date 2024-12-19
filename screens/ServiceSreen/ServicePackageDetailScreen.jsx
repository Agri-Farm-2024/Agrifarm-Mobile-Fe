import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  calculateMonthsBetween,
  capitalizeFirstLetter,
  formatDate,
  formatNumber,
  isDateGreaterThanTodayPlus7Days,
} from "../../utils";
import DropdownComponent from "../../components/DropdownComponent";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { getBookingList } from "../../redux/slices/landSlice";
import {
  getBookingSelector,
  getPlantSeasonSelector,
} from "../../redux/selectors";
import { getPlantSeasonList } from "../../redux/slices/plantSlice";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

const PAGE_SIZE = 100;

const ServicePackageDetailScreen = ({ navigation, route }) => {
  const [formInput, setFormInput] = useState({
    plot: "",
    cultivatedArea: "",
    dateStart: new Date(new Date().setDate(new Date().getDate() + 1)), // Default to tomorrow
    plantSeason: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [bookingOptions, setBookingOptions] = useState([]);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [plantSeasonOptions, setPlantSeasonOptions] = useState([]);
  const [pageNumberPlantSeason, setPageNumberPlantSeason] = useState(1);
  const [hasMorePlantSeason, setHasMorePlantSeason] = useState(true);
  const [isLoadingPlantSeason, setIsLoadingPlantSeason] = useState(false);
  const [showPreviewParams, setShowPreviewParams] = useState({
    total_month: 0,
    time_start: 0,
  });
  const [priceSeason, setPriceSeason] = useState(0);

  const { serviceDetail } = route.params;

  const dispatch = useDispatch();
  const bookingSelector = useSelector(getBookingSelector);
  const plantSeasonSelector = useSelector(getPlantSeasonSelector);

  const fetchUserBookings = () => {
    try {
      const formData = {
        page_index: 1,
        page_size: PAGE_SIZE,
        type: "booking",
        status: "completed",
      };
      dispatch(getBookingList(formData));
      // .then((response) => {
      //   console.log("booking response: " + JSON.stringify(response));
      //   if (response.payload.statusCode !== 200) {
      //     console.log("Fetch booking fail");
      //   }
      //   if (response.payload.statusCode === 200) {
      //     const newBookingOptions =
      //       response.payload?.metadata?.bookings &&
      //       response.payload?.metadata?.bookings.map((booking) => ({
      //         label: booking?.land?.name,
      //         value: booking?.booking_id,
      //       }));
      //     setBookingOptions(newBookingOptions);
      //   }
      // });
    } catch (error) {
      console.log("Error fetching user bookings", error);
    }
  };

  const fetchPlantSeasonOptions = (
    pageIndex,
    total_month,
    time_start,
    bookingId
  ) => {
    const params = {
      page_size: PAGE_SIZE,
      page_index: pageIndex,
      time_start: time_start || showPreviewParams.time_start,
      total_month: total_month || showPreviewParams.total_month,
    };
    console.log("prams", params);
    setIsLoadingPlantSeason(true);
    dispatch(getPlantSeasonList(params))
      .then((response) => {
        console.log("response plantSeasonOptions: " + JSON.stringify(response));
        if (response.payload && response.payload.statusCode === 200) {
          setIsLoadingPlantSeason(false);
          if (
            response.payload.metadata &&
            response.payload.metadata.plant_seasons
          ) {
            if (response.payload.metadata.plant_seasons.length == 0) {
              console.log("plantSeasonOptions empty");
              Toast.show({
                type: "error",
                text1: "Không có mùa vụ phù hợp",
                text2: "Hãy đổi tháng bắt đầu canh tác",
              });
              setPlantSeasonOptions([]);
            } else {
              //Filter the process that have the standard process with status is accepted
              const bookingObject =
                bookingSelector?.bookings &&
                bookingSelector?.bookings.filter(
                  (booking) => booking.booking_id == bookingId
                )[0];

              const seasonOptions =
                response.payload.metadata.plant_seasons.filter(
                  (season) =>
                    season?.status == "active" &&
                    season?.plant?.status == "active" &&
                    season.process_technical_standard &&
                    season?.process_technical_standard.status == "accepted" &&
                    season?.plant?.land_type_id ==
                      bookingObject?.land?.land_type_id
                );
              console.log("bookingid", bookingId);
              console.log(
                "land type of booking",
                bookingObject?.land?.land_type_id
              );
              console.log("season options", seasonOptions);
              if (!seasonOptions || seasonOptions.length == 0) {
                Toast.show({
                  type: "error",
                  text1: "Không có mùa vụ phù hợp",
                  text2: "Hãy đổi tháng bắt đầu canh tác hoặc mảnh đất",
                });
                setPlantSeasonOptions([]);
              } else {
                const optionData =
                  seasonOptions &&
                  seasonOptions.length > 0 &&
                  seasonOptions.map((season) => ({
                    value: season.plant_season_id,
                    label: `Mùa vụ ${season.plant.name} tháng ${season.month_start}`,
                    total_month: season?.total_month,
                    price_process: season?.price_process,
                  }));
                console.log("Option data: " + JSON.stringify(optionData));
                setPlantSeasonOptions(optionData);
                setPageNumberPlantSeason(pageIndex);

                //Check whether has more options to fetch
                if (
                  response.payload.metadata.pagination.total_page == pageIndex
                ) {
                  setHasMorePlantSeason(false);
                }
              }
            }
          }
        }
      })
      .catch((error) => {
        setIsLoadingPlantSeason(false);
        console.log("Error loading plant season options", error);
      });
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  //function will get seasons the user can cultivate
  const showPreviewSeason = (bookingId, dateStart) => {
    if (bookingId != "" && dateStart > new Date()) {
      //find the booking object by id from booking list
      const bookingObject =
        bookingSelector?.bookings &&
        bookingSelector?.bookings.filter(
          (booking) => booking.booking_id == bookingId
        )[0];

      const totalDateAvailable =
        bookingObject &&
        calculateMonthsBetween(dateStart, bookingObject.time_end);
      setFormInput((prevState) => ({ ...prevState, plantSeason: "" }));
      setShowPreviewParams({
        total_month: totalDateAvailable,
        time_start: new Date(dateStart).getMonth() + 1,
      });
      fetchPlantSeasonOptions(
        1,
        totalDateAvailable,
        new Date(dateStart).getMonth() + 1,
        bookingId
      );
    }
  };

  const handleSubmit = () => {
    try {
      if (
        formInput.plot === "" ||
        formInput.cultivatedArea === "" ||
        formInput.plantSeason === "" ||
        showPreviewParams.time_start == 0 ||
        showPreviewParams.total_month == 0
      ) {
        Toast.show({
          type: "error",
          text1: "Vui lòng điền đầy đủ thông tin!",
        });
      } else if (formInput.cultivatedArea - 0 < 1000) {
        Toast.show({
          type: "error",
          text1: "Diện tích canh tác tối thiểu là 1000 m²!",
        });
      } else if (!isDateGreaterThanTodayPlus7Days(formInput.dateStart)) {
        Toast.show({
          type: "error",
          text1: "Ngày bắt đầu phải sau ngày hôm nay 7 ngày!",
        });
      } else {
        const bookingObject =
          bookingSelector?.bookings &&
          bookingSelector?.bookings.filter(
            (booking) => booking.booking_id == formInput.plot
          )[0];

        const seasonObject =
          plantSeasonSelector &&
          plantSeasonSelector?.plant_seasons?.find(
            (season) => season.plant_season_id == formInput.plantSeason
          );

        //check acreage
        if (bookingObject?.acreage_land_can_used < formInput.cultivatedArea) {
          Toast.show({
            type: "error",
            text1: "Diện tích mảnh đất có sẵn không đủ!",
          });
        } else {
          const serviceInfo = {
            plant_season_id: formInput.plantSeason,
            booking_id: formInput.plot,
            service_package_id: serviceDetail.service_package_id,
            acreage_land: formInput.cultivatedArea - 0,
            time_start: formInput.dateStart.toISOString(),
            service_name: serviceDetail.name,
            service_price: serviceDetail.price,
            plot_name: bookingObject ? bookingObject?.land?.name : "",
            season_name: seasonObject
              ? `Mùa vụ ${seasonObject?.plant?.name} Tháng ${seasonObject?.month_start}`
              : "",
            seasonPrice: priceSeason,
            seasonObject: seasonObject,
            isPurchase: serviceDetail.purchase,
          };
          navigation.navigate("PreviewBuyingServiceScreen", {
            serviceInfo: serviceInfo,
          });
        }
      }
    } catch (error) {
      console.log("Buy service failed", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          style={styles.container}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          {!serviceDetail && <Text>Không tìm thấy dịch vụ</Text>}
          {serviceDetail && (
            <>
              <Text style={styles.title}>{serviceDetail.name}</Text>
              <Text style={styles.description}>
                {serviceDetail.description}
              </Text>
              <Text style={styles.header}>Thông tin gói dịch vụ</Text>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Gói dịch vụ</Text>
                <Text style={styles.detailContent}>{serviceDetail.name}</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Giá gói dịch vụ</Text>
                <Text style={styles.detailContent}>
                  {formatNumber(serviceDetail.price)} VND/tháng
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Bao tiêu</Text>
                <Text style={styles.detailContent}>
                  {serviceDetail.purchase == true ? "Có" : "Không"}
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Bao vật tư</Text>
                <Text style={styles.detailContent}>
                  {serviceDetail.material == true ? "Có" : "Không"}
                </Text>
              </View>
              <Text style={[styles.header, { marginTop: 30 }]}>
                Mua gói dịch vụ
              </Text>
              <View style={styles.detail}>
                <Text
                  style={[
                    styles.detailName,
                    { color: "#141414", fontWeight: "bold" },
                  ]}
                >
                  Ngày bắt đầu canh tác
                </Text>
                <View style={styles.detailContentInput}>
                  <TouchableOpacity
                    style={[styles.inputDate]}
                    onPress={() => {
                      setIsShowDatePicker(true);
                    }}
                  >
                    <Text>{formatDate(formInput.dateStart, 0)}</Text>
                  </TouchableOpacity>
                  {isShowDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(formInput.dateStart)}
                      open={isShowDatePicker}
                      timeZoneName="Asia/Ho_Chi_Minh"
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setIsShowDatePicker(false);
                        if (!isDateGreaterThanTodayPlus7Days(selectedDate)) {
                          Toast.show({
                            type: "error",
                            text1: "Ngày bắt đầu phải sau ngày hôm nay 7 ngày!",
                          });
                        } else {
                          console.log("Select date", selectedDate);
                          setFormInput((prevState) => ({
                            ...prevState,
                            dateStart: selectedDate,
                          }));
                          showPreviewSeason(formInput.plot, selectedDate);
                        }
                      }}
                      textColor="#7FB640"
                    />
                  )}
                </View>
              </View>
              <View style={styles.bookingContainer}>
                <Text style={styles.label}>Áp dụng cho mảnh đất</Text>
                <View style={styles.booking}>
                  {(!bookingSelector ||
                    !bookingSelector?.bookings ||
                    bookingSelector.bookings.length == 0) && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#707070",
                      }}
                    >
                      Không có mảnh đất
                    </Text>
                  )}
                  {bookingSelector &&
                    bookingSelector?.bookings &&
                    bookingSelector.bookings.length > 0 &&
                    bookingSelector.bookings.map((booking, index) => (
                      <TouchableOpacity
                        key={`booking ${index}`}
                        style={[
                          styles.bookingItem,
                          booking?.booking_id == formInput?.plot &&
                            styles.selectItem,
                          booking?.acreage_land_can_used < 1000 &&
                            styles.disabledItem,
                          new Date(booking?.time_start) >
                            new Date(formInput.dateStart) &&
                            styles.disabledItem,
                        ]}
                        onPress={() => {
                          if (
                            booking?.acreage_land_can_used >= 1000 &&
                            new Date(booking?.time_start) <=
                              new Date(formInput.dateStart)
                          ) {
                            console.log("select booking", booking.booking_id);
                            setFormInput((prevState) => ({
                              ...prevState,
                              plot: booking?.booking_id,
                            }));
                            showPreviewSeason(
                              booking?.booking_id,
                              formInput.dateStart
                            );
                          }
                        }}
                      >
                        <Text
                          style={[
                            styles.landName,
                            booking?.booking_id == formInput?.plot &&
                              styles.selectText,
                            booking?.acreage_land_can_used < 1000 &&
                              styles.disabledText,
                            new Date(booking?.time_start) >
                              new Date(formInput.dateStart) &&
                              styles.disabledText,
                          ]}
                        >
                          {capitalizeFirstLetter(booking?.land?.name)}
                        </Text>
                        <Text
                          style={[
                            styles.landAcreage,
                            booking?.booking_id == formInput?.plot &&
                              styles.selectText,
                          ]}
                        >
                          Còn trống:{" "}
                          {formatNumber(booking?.acreage_land_can_used)} m²
                        </Text>
                        <Text
                          style={[
                            styles.landAcreage,
                            booking?.booking_id == formInput?.plot &&
                              styles.selectText,
                          ]}
                        >
                          Ngày hết hạn: {formatDate(booking.time_end, 0)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>

              <View style={styles.bookingContainer}>
                <Text style={styles.label}>Mùa vụ</Text>
                <View style={styles.booking}>
                  {isLoadingPlantSeason && <ActivityIndicatorComponent />}
                  {!isLoadingPlantSeason &&
                    (!plantSeasonOptions || plantSeasonOptions.length == 0) && (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "#707070",
                        }}
                      >
                        Không có mùa vụ
                      </Text>
                    )}
                  {plantSeasonOptions &&
                    plantSeasonOptions.length > 0 &&
                    plantSeasonOptions.map((season, index) => (
                      <TouchableOpacity
                        key={`season ${index}`}
                        style={[
                          styles.bookingItem,
                          season?.value == formInput?.plantSeason &&
                            styles.selectItem,
                        ]}
                        onPress={() => {
                          setFormInput((prevState) => ({
                            ...prevState,
                            plantSeason: season.value,
                          }));
                          const seasonObject =
                            plantSeasonSelector &&
                            plantSeasonSelector?.plant_seasons?.find(
                              (plantSeason) =>
                                plantSeason.plant_season_id == season.value
                            );
                          const processPrice = seasonObject.price_process;
                          setPriceSeason(processPrice);
                        }}
                      >
                        <Text
                          style={[
                            styles.landName,
                            season.value == formInput?.plantSeason &&
                              styles.selectText,
                          ]}
                        >
                          {season?.label}
                        </Text>
                        <Text
                          style={[
                            styles.landAcreage,
                            season.value == formInput?.plantSeason &&
                              styles.selectText,
                          ]}
                        >
                          Số tháng trồng: {formatNumber(season?.total_month)}{" "}
                          tháng
                        </Text>
                        <Text
                          style={[
                            styles.landAcreage,
                            { maxWidth: "100%" },
                            season.value == formInput?.plantSeason &&
                              styles.selectText,
                          ]}
                        >
                          Giá quy trình của mùa vụ:{" "}
                          {formatNumber(season?.price_process)} VND/1000 m²
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
              <View style={styles.detail}>
                <Text
                  style={[
                    styles.detailName,
                    { color: "#141414", fontWeight: "bold" },
                  ]}
                >
                  Diện tích canh tác (m²)
                </Text>
                <View style={styles.detailContent}>
                  <TextInput
                    keyboardType="decimal-pad"
                    placeholder="Diện tích canh tác"
                    style={styles.input}
                    value={formInput.cultivatedArea}
                    onChangeText={(text) =>
                      setFormInput((prevState) => ({
                        ...prevState,
                        cultivatedArea: text,
                      }))
                    }
                  ></TextInput>
                </View>
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Mua gói dịch vụ</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D9D9D9",
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  header: {
    marginVertical: 10,
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#D9D9D9",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D9D9D9",
  },
  detailName: {
    fontSize: 16,
    color: "#707070",
  },
  detailContentInput: {
    width: "50%",
    fontSize: 14,
    color: "#707070",
    fontWeight: "bold",
  },
  detailContent: {
    width: "50%",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#707070",
  },
  input: {
    paddingVertical: 0,
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 7,
    borderColor: "#cacaca",
  },
  inputDate: {
    height: 40,
    lineHeight: 40,
    backgroundColor: "transparent",
    marginVertical: 10,
    borderRadius: 7,
    borderColor: "#cacaca",
    alignItems: "left",
    paddingLeft: 10,
    justifyContent: "center",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7FB640",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  checkboxLink: {
    color: "#7fb640",
    fontWeight: "bold",
  },
  label: {
    color: "#141414",
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingContainer: {
    marginVertical: 10,
  },
  booking: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
    marginTop: 10,
  },
  bookingItem: {
    width: "100%",
    borderRadius: 7,
    backgroundColor: "#f5f5f5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  landName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  landAcreage: {
    marginTop: 5,
    fontSize: 14,
    color: "#707070",
  },
  selectItem: {
    backgroundColor: "#7fb640",
  },
  selectText: {
    color: "#f5f5f5",
  },
  disabledItem: {
    backgroundColor: "#cacaca",
  },
  disabledText: {
    color: "#707070",
  },
});

export default ServicePackageDetailScreen;

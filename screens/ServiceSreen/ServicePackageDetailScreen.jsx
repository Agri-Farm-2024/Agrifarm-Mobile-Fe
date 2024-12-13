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
import { Checkbox } from "react-native-paper";
import ContractServicesDialog from "../../components/ContractServicesDialog/ContractServicesDialog";

const plotOptions = [
  {
    label: "Mảnh đất số 1",
    value: "Mảnh đất số 1",
  },
  {
    label: "Mảnh đất số 2",
    value: "Mảnh đất số 2",
  },
];

const plantSeasonOptions = [
  {
    label: "Tháng 9 - 12",
    value: "Tháng 9 - 12",
  },
  {
    label: "Tháng 10 - 1",
    value: "Tháng 10 - 1",
  },
  {
    label: "Tháng 1 - 3",
    value: "Tháng 1 - 3",
  },
  {
    value: "Tháng 4 - 8",
    label: "Tháng 4 - 8",
  },
];

const plantTypeOptions = [
  {
    label: "Dưa lưới",
    value: "Dưa lưới",
  },
  {
    label: "Dưa hấu",
    value: "Dưa hấu",
  },
  {
    label: "Dưa leo",
    value: "Dưa leo",
  },
  {
    label: "Cây ớt",
    value: "Cây ớt",
  },
];

const PAGE_SIZE = 30;

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
  const [visibleContract, setVisibleContract] = useState(false);

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
      dispatch(getBookingList(formData)).then((response) => {
        console.log("booking response: " + JSON.stringify(response));
        if (response.payload.statusCode !== 200) {
          console.log("Fetch booking fail");
        }
        if (response.payload.statusCode === 200) {
          const newBookingOptions =
            response.payload?.metadata?.bookings &&
            response.payload?.metadata?.bookings.map((booking) => ({
              label: booking?.land?.name,
              value: booking?.booking_id,
            }));
          setBookingOptions(newBookingOptions);
        }
      });
    } catch (error) {
      console.log("Error fetching user bookings", error);
    }
  };

  const fetchPlantSeasonOptions = (pageIndex, total_month, time_start) => {
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
                  (booking) => booking.booking_id == formInput.plot
                )[0];

              const seasonOptions =
                response.payload.metadata.plant_seasons.filter(
                  (season) =>
                    season.process_technical_standard &&
                    season.process_technical_standard.status == "accepted" &&
                    season.plant.land_type_id == bookingObject.land.land_type_id
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
                    label: `Mùa vụ ${season.plant.name} Tháng ${season.month_start}`,
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

  const handleScrollPlantSeasonOption = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height * 0.75;

    if (isCloseToBottom && !isLoading) {
      if (!isLoadingPlantSeason && hasMorePlantSeason) {
        fetchPlantSeasonOptions(pageNumberPlantSeason + 1);
      }
    }
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

      setShowPreviewParams({
        total_month: totalDateAvailable,
        time_start: new Date(dateStart).getMonth() + 1,
      });
      fetchPlantSeasonOptions(
        1,
        totalDateAvailable,
        new Date(dateStart).getMonth() + 1
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
        };
        navigation.navigate("PreviewBuyingServiceScreen", {
          serviceInfo: serviceInfo,
        });
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
              <Text style={styles.header}>Chi tiết gói dịch vụ</Text>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Gói dịch vụ</Text>
                <Text style={styles.detailContent}>{serviceDetail.name}</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Giá gói dịch vụ</Text>
                <Text style={styles.detailContent}>
                  {formatNumber(serviceDetail.price)} VND
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
              <View style={styles.detail}>
                <Text style={styles.detailName}>Áp dụng cho mảnh đất</Text>
                <View style={styles.detailContentInput}>
                  <DropdownComponent
                    styleValue={{
                      height: 40,
                    }}
                    placeholderStyleValue={{ fontSize: 14, color: "#707070" }}
                    options={bookingOptions}
                    placeholder="Chọn mảnh đất"
                    value={formInput.plot}
                    setValue={(value) => {
                      setFormInput({ ...formInput, plot: value });
                      showPreviewSeason(value, formInput.dateStart);
                    }}
                  />
                </View>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Ngày bắt đầu canh tác</Text>
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
              <View style={styles.detail}>
                <Text style={styles.detailName}>Mùa vụ</Text>
                <View style={styles.detailContentInput}>
                  <DropdownComponent
                    isDisabled={
                      showPreviewParams.time_start != 0 &&
                      !showPreviewParams.total_month != 0
                        ? true
                        : false
                    }
                    styleValue={{
                      height: 40,
                    }}
                    isLoading={isLoadingPlantSeason}
                    onScroll={handleScrollPlantSeasonOption}
                    placeholderStyleValue={{ fontSize: 14, color: "#707070" }}
                    options={plantSeasonOptions}
                    placeholder="Chọn mùa vụ"
                    value={formInput.plantSeason}
                    setValue={(value) => {
                      setFormInput({ ...formInput, plantSeason: value });
                      console.log(
                        "season selector",
                        JSON.stringify(plantSeasonSelector)
                      );
                      const seasonObject =
                        plantSeasonSelector &&
                        plantSeasonSelector?.plant_seasons?.find(
                          (season) => season.plant_season_id == value
                        );
                      const processPrice = seasonObject.price_process;
                      setPriceSeason(processPrice);
                    }}
                  />
                </View>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Giá quy trình của mùa vụ</Text>
                <Text style={styles.detailContent}>
                  {priceSeason && priceSeason != 0
                    ? `${formatNumber(priceSeason)} VND/1000 m²`
                    : "Hãy chọn mùa vụ"}
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Diện tích canh tác (m²)</Text>
                <View style={styles.detailContent}>
                  <TextInput
                    keyboardType="decimal-pad"
                    placeholder="Diện tích canh tác"
                    style={styles.input}
                    value={formInput.cultivatedArea}
                    onChangeText={(text) =>
                      setFormInput({ ...formInput, cultivatedArea: text })
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
});

export default ServicePackageDetailScreen;

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
import { calculateMonthsBetween, formatDate, formatNumber } from "../../utils";
import DropdownComponent from "../../components/DropdownComponent";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { getBookingList } from "../../redux/slices/landSlice";
import { getBookingSelector } from "../../redux/selectors";
import { getPlantSeasonList } from "../../redux/slices/plantSlice";
import { buyService } from "../../redux/slices/serviceSlice";

const service = {
  id: "SV001",
  serviceTitle: "Gói dịch vụ số 1",
  serviceDescription:
    "Gói quy trình canh tác theo chuẩn VietGap của giống cây. Dịch vụ này sẽ cung cấp quy trình cụ thể để trồng trọt theo chuẩn VietGAP. Dịch vụ sẽ cung cấp cung cấp vật tư cần thiết để trồng trọt như: phân bón, thuốc trừ sâu, các dụng cụ trồng trọt và các nguyên vật liệu để cải tạo đất và xây dựng mô hình đạt chuẩn VietGAP để trồng cây.",
  servicePrice: 2000000,
  isPurchase: true,
  isMaterial: true,
};

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

console.log("Render service");

const ServicePackageDetailScreen = ({ route }) => {
  const [formInput, setFormInput] = useState({
    plot: "",
    cultivatedArea: "",
    dateStart: new Date(new Date().setDate(new Date().getDate() + 1)), // Default to tomorrow
    plantSeason: "",
  });
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

  const { serviceDetail } = route.params;

  const dispatch = useDispatch();
  const bookingSelector = useSelector(getBookingSelector);

  const fetchUserBookings = () => {
    try {
      const formData = {
        page_index: 1,
        page_size: 30,
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
      page_size: 20,
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
      } else {
        const formData = {
          plant_season_id: formInput.plantSeason,
          booking_id: formInput.plot,
          service_package_id: serviceDetail.service_package_id,
          acreage_land: formInput.cultivatedArea - 0,
          time_start: formatDate(formInput.dateStart, 1),
        };
        console.log("FormData", formData);
        dispatch(buyService(formData)).then((response) => {
          console.log("Buy service response", JSON.stringify(response));
          if (response.payload.statusCode != 201) {
            if (
              response.payload.statusCode == 400 &&
              response.payload.message == "Acreage land is not enough"
            ) {
              Toast.show({
                type: "error",
                text1: "Diện tích mảnh đất có sẵn không đủ!",
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Mua dịch vụ thất bại!",
              });
            }
          }
          if (response.payload.statusCode == 201) {
            Toast.show({
              type: "success",
              text1: "Mua dịch vụ thành công!",
            });
          }
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
                <Text style={styles.detailName}>Giá thuê</Text>
                <Text style={styles.detailContent}>
                  {formatNumber(serviceDetail.price)} VND / năm
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
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        setIsShowDatePicker(false);
                        if (selectedDate <= new Date()) {
                          Toast.show({
                            type: "error",
                            text1: "Ngày bắt đầu phải lớn hơn ngày hôm nay!",
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
                    setValue={(value) =>
                      setFormInput({ ...formInput, plantSeason: value })
                    }
                  />
                </View>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailName}>Diện tích canh tác (ha)</Text>
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
});

export default ServicePackageDetailScreen;

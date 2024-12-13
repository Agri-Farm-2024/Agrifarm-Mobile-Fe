import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Appbar,
  Card,
  Text,
  Button,
  Divider,
  Checkbox,
} from "react-native-paper";
import {
  capitalizeFirstLetter,
  convertImageURL,
  formatNumberToVND,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../redux/selectors";
import { buyMaterial, rentMaterial } from "../../redux/slices/cartSlice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ContractServicesDialog from "../../components/ContractServicesDialog/ContractServicesDialog";
import { getBookingList } from "../../redux/slices/landSlice";
import DropdownComponent from "../../components/DropdownComponent";
import ContractRentDialog from "../../components/ContractRentDialog/ContractRentDialog";

const PAGE_SIZE = 30;
const CheckoutScreen = ({ route, navigation }) => {
  const { cartItemsCheckout, isRent, rentDay } = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const [visibleContract, setVisibleContract] = useState(false);
  const userSelector = useSelector(getUserSelector);
  const [bookingOptions, setBookingOptions] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const discountPrice = 0;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRent) {
      fetchUserBookings();
    }
  }, []);

  function objectToArray(obj) {
    return Object.keys(obj).map((key) => obj[key]);
  }

  const totalPrice = objectToArray(cartItemsCheckout).reduce(
    (total, item) =>
      item.type == "buy"
        ? total + item?.price_per_piece * item?.quantity
        : total +
          item?.price_of_rent * item?.quantity * rentDay +
          item?.deposit_per_piece * item?.quantity,
    0
  );

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
              label: capitalizeFirstLetter(booking?.land?.name),
              value: booking?.booking_id,
            }));
          setBookingOptions(newBookingOptions);
          console.log("booking options: " + JSON.stringify(newBookingOptions));
        }
      });
    } catch (error) {
      console.log("Error fetching user bookings", error);
    }
  };

  const contract = {
    farmOwner: "Trang trại AgriFarm - quản lí trang trại: bà Trịnh Gia Hân",
    landrenter: userSelector,
    productList: objectToArray(cartItemsCheckout),
    rentDay,
  };

  const handleCheckout = () => {
    try {
      if (isRent) {
        const materials = objectToArray(cartItemsCheckout).map((item) => ({
          material_id: item?.material_id,
          quantity: item.quantity,
        }));
        const formData = {
          materials: materials,
          booking_land_id: bookingId,
          total_day: rentDay,
        };
        console.log("formdata rent material", JSON.stringify(formData));
        dispatch(rentMaterial(formData)).then((response) => {
          console.log("Buy material response: " + JSON.stringify(response));
          if (response.payload.statusCode != 201) {
            Toast.show({ type: "error", text1: "Thanh toán thất bại!" });
          }
          if (response.payload.statusCode == 201) {
            console.log("Response sucess", JSON.stringify(response));
            const paymentInfo = {
              payment_link: response?.payload?.metadata?.payment_link,
              transactionID: response?.payload?.metadata?.transaction_id,
              isCart: true,
            };
            navigation.navigate("PaymentServiceScreen", {
              paymentInfo: paymentInfo,
            });
          }
        });
      } else {
        const formData = objectToArray(cartItemsCheckout).map((item) => ({
          material_id: item?.material_id,
          quantity: item.quantity,
        }));
        console.log("FormData buy material", formData);
        dispatch(buyMaterial(formData)).then((response) => {
          console.log("Buy material response: " + JSON.stringify(response));
          if (response.payload.statusCode != 201) {
            Toast.show({ type: "error", text1: "Thanh toán thất bại!" });
          }
          if (response.payload.statusCode == 201) {
            console.log("Response sucess", JSON.stringify(response));
            const paymentInfo = {
              payment_link: response?.payload?.metadata?.payment_link,
              transactionID: response?.payload?.metadata?.transaction_id,
              isCart: true,
            };
            navigation.navigate("PaymentServiceScreen", {
              paymentInfo: paymentInfo,
            });
          }
        });
      }
    } catch (error) {
      console.log("Error Checkout", error);
    }
  };

  return (
    <>
      {/* Header */}
      <Appbar.Header style={{ backgroundColor: "#7fb640" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thanh Toán" color="white" />
      </Appbar.Header>

      {/* Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* Delivery Information */}
        <Text style={styles.sectionTitle}>Thông tin người đặt</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={{ color: "#707070" }}>
              <Text style={{ fontWeight: "bold" }}>Người thuê:</Text>{" "}
              {userSelector?.full_name || ""}
            </Text>
            {isRent && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", width: "40%" }}>
                  Mảnh đất sử dụng:{" "}
                </Text>
                <View style={{ width: "60%" }}>
                  <DropdownComponent
                    styleValue={{
                      height: 40,
                    }}
                    placeholderStyleValue={{ fontSize: 14, color: "#707070" }}
                    options={bookingOptions}
                    placeholder="Chọn mảnh đất"
                    value={bookingId}
                    setValue={(value) => {
                      setBookingId(value);
                    }}
                  />
                </View>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Order Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đơn hàng</Text>
          {objectToArray(cartItemsCheckout).map((item) => (
            <Card key={item.material_id} style={styles.productCard}>
              <Card.Content style={styles.productContent}>
                <Image
                  style={{
                    borderRadius: 5,
                    width: 70,
                    height: 70,
                  }}
                  source={{
                    uri: convertImageURL(item.image_material),
                  }}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>
                    {capitalizeFirstLetter(item.name)}
                  </Text>
                  <Text style={styles.productPrice}>
                    Giá: {item.type == "buy" ? "mua" : "thuê"}:{" "}
                    {item.type == "buy"
                      ? formatNumberToVND(item.price_per_piece)
                      : formatNumberToVND(item.price_of_rent)}{" "}
                    VND{item.type == "rent" && "/ngày"}
                  </Text>
                  {item.type == "rent" && (
                    <Text style={styles.productPrice}>
                      Giá cọc: {formatNumberToVND(item.deposit_per_piece)}{" "}
                      VND/cái
                    </Text>
                  )}
                  {item.type == "rent" && (
                    <Text style={styles.productPrice}>
                      Số ngày thuê: {rentDay} ngày
                    </Text>
                  )}
                  <Text style={styles.productQuantity}>
                    Số lượng: {item.quantity}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <TouchableOpacity
            style={{
              width: 90,
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: "white",
            }}
          >
            <MaterialIcons
              name="account-balance"
              size={24}
              color="#707070"
              style={{
                marginBottom: 5,
                color: "#7fb640",
              }}
            />
            <Text>Ngân hàng</Text>
          </TouchableOpacity>
        </View>

        {/* Total Summary */}
        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Text style={styles.textLabelPrice}>Tổng đơn:</Text>
            <Text>{formatNumberToVND(totalPrice)} VND</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.textLabelPrice}>Giảm giá:</Text>
            <Text>{formatNumberToVND(discountPrice)} VND</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Tổng thanh toán:</Text>
            <Text style={styles.totalText}>
              {formatNumberToVND(totalPrice - discountPrice)} VND
            </Text>
          </View>
        </View>
        {isRent && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={isChecked ? "checked" : "unchecked"}
              onPress={() => setIsChecked(!isChecked)}
              color="#7fb640"
            />
            <Text style={styles.checkboxText}>
              Tôi đã đọc và đồng ý với{" "}
              <Text
                style={styles.checkboxLink}
                onPress={() => setVisibleContract(true)}
              >
                các điều khoản của hợp đồng
              </Text>
            </Text>
          </View>
        )}
        {/* Payment Button */}
        <Button
          mode="contained"
          style={styles.payButton}
          onPress={() => handleCheckout()}
          disabled={!isChecked || !bookingId}
        >
          THANH TOÁN
        </Button>
      </ScrollView>
      <ContractRentDialog
        isVisible={visibleContract}
        onDismiss={() => setVisibleContract(false)}
        contract={contract}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  card: {
    marginBottom: 16,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productCard: {
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#7fb640",
    backgroundColor: "white",
  },
  productContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  productDetails: {
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  payButton: {
    marginTop: 16,
    backgroundColor: "#7fb640",
  },
  textLabelPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9B9B9B",
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

export default CheckoutScreen;

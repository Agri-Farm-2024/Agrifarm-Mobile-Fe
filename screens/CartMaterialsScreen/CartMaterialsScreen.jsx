import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Appbar, Checkbox, IconButton, Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { formatNumberToVND } from "../../utils";
import Toast from "react-native-toast-message";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

export default function CartMaterialsScreen({ navigation }) {
  const cartItems = useSelector((state) => state.cartSlice.items);
  const cartBuy = cartItems.filter((item) => item.requestType === "buy");
  const cartRent = cartItems.filter((item) => item.requestType === "rent");
  const dispatch = useDispatch();

  const [checkedBuy, setcheckedBuy] = useState(false);
  const [checkedRent, setcheckedRent] = useState(false);
  const [menuVisibleItem, setMenuVisibleItem] = useState({});
  const [comfirmVisibleClearAll, setComfirmVisibleClearAll] = useState(false);

  const totalPrice =
    (checkedBuy
      ? cartBuy.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0) +
    (checkedRent
      ? cartRent.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0);

  const openMenu = (itemId) => {
    setMenuVisibleItem((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));
  };

  const closeMenu = (itemId) => {
    setMenuVisibleItem((prevState) => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  const handleCheckout = () => {
    let cartItemsCheckout = {};

    // Handle case where both are checked first
    if (checkedBuy && checkedRent) {
      cartItemsCheckout = { ...cartItems };
    }
    // If only 'Buy' is checked
    else if (checkedBuy) {
      cartItemsCheckout = { ...cartBuy };
    }
    // If only 'Rent' is checked
    else if (checkedRent) {
      cartItemsCheckout = { ...cartRent };
    }

    navigation.navigate("CheckoutScreen", { cartItemsCheckout });
  };

  const renderItem = (item) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>Tên: {item.name}</Text>
        <Text style={styles.itemPrice}>
          Giá: {formatNumberToVND(item.price)} VND
        </Text>
        <View style={styles.itemQuantity}>
          <IconButton
            icon="minus"
            size={20}
            onPress={() => dispatch(decreaseQuantity(item.id))}
            style={styles.iconButton}
            iconColor="#7fb640"
          />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <IconButton
            icon="plus"
            size={20}
            onPress={() => dispatch(increaseQuantity(item.id))}
            style={styles.iconButton}
            iconColor="#7fb640"
          />
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Menu
          visible={menuVisibleItem[item.id]}
          onDismiss={() => closeMenu(item.id)}
          anchor={
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={() => openMenu(item.id)}
              style={styles.menuIcon}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              dispatch(removeFromCart(item));
              Toast.show({
                type: "error",
                text1: "Đã xóa sản phẩm khỏi giỏ hàng",
              });
              closeMenu(item.id);
            }}
            title="Xóa"
          />
        </Menu>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
          <Appbar.Content
            title="Giỏ Hàng"
            color="white"
            titleStyle={styles.appbarTitle}
          />
          <Appbar.Action
            icon="delete-outline"
            onPress={() => setComfirmVisibleClearAll(true)}
            color="white"
          />
        </Appbar.Header>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mua vật tư</Text>
              <Checkbox
                status={checkedBuy ? "checked" : "unchecked"}
                onPress={() => setcheckedBuy(!checkedBuy)}
                color="#7fb640"
              />
            </View>
            <View style={styles.sectionItems}>
              {cartBuy.length > 0 ? (
                cartBuy.map((item) => renderItem(item))
              ) : (
                <Text style={styles.emptyText}>
                  Không có sản phẩm mua trong giỏ hàng
                </Text>
              )}
            </View>
          </View>

          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Thuê thiết bị</Text>
              <Checkbox
                status={checkedRent ? "checked" : "unchecked"}
                onPress={() => setcheckedRent(!checkedRent)}
                color="#7fb640"
              />
            </View>
            <View style={styles.sectionItems}>
              {cartRent.length > 0 ? (
                cartRent.map((item) => renderItem(item))
              ) : (
                <Text style={styles.emptyText}>
                  Không có thiết bị thuê trong giỏ hàng
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
            <Text style={styles.totalPrice}>
              {formatNumberToVND(totalPrice)} VND
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              checkedBuy === false && checkedRent === false
                ? { opacity: 0.7 }
                : null,
            ]}
            onPress={handleCheckout}
            disabled={checkedBuy === false && checkedRent === false}
          >
            <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmationModal
        title="Xác nhận xóa"
        content="Bạn có muốn xóa toàn bộ sản phẩm"
        visible={comfirmVisibleClearAll}
        onDismiss={() => setComfirmVisibleClearAll(false)}
        onConfirm={() => {
          setComfirmVisibleClearAll(false);
          setcheckedBuy(false);
          setcheckedRent(false);
          dispatch(clearCart());
          Toast.show({
            type: "success",
            text1: "Đã xóa",
            text2: "Xóa toàn toàn bộ sản phẩm trong giỏ",
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: "#7fb640",
  },
  appbarTitle: {
    color: "white",
    fontSize: 18,
  },
  scrollViewContent: {
    paddingBottom: 120,
  },
  sectionHeader: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: "#222",
    fontWeight: "600",
  },
  sectionItems: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "#7FB640",
    alignItems: "center",
    position: "relative",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  itemDetails: {
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 5,
  },
  itemQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    borderColor: "gray",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9B9B9B",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: "#7fb640",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#9B9B9B",
    marginTop: 20,
    fontSize: 16,
  },
});

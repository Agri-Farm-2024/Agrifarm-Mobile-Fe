import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, IconButton, Appbar, Badge } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../../redux/slices/cartSlice";
import { formatNumberToVND } from "../../utils";

export default function MaterialDetailScreen({ route, navigation }) {
  const { image, name, type, price, requestType, id } = route.params;
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.cartCount);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const item = {
      id,
      name,
      price,
      requestType,
      quantity,
      image,
    };
    console.log("handleIncrease");
    dispatch(addToCart(item));
    setQuantity(1);
    Toast.show({
      type: "success",
      text1: "Đã thêm vào giỏ hàng",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#7fb640" }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="white" // Icon color
        />
        <Appbar.Content
          title="Chi Tiết Vật Liệu"
          color="white" // Text color
          titleStyle={{ color: "white", fontSize: 20 }}
        />
        <Appbar.Action
          icon="cart"
          onPress={() => navigation.navigate("CartMaterialsScreen")}
          color="white" // Icon color
        />
        {cartCount > 0 && (
          <Badge
            size={20}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "red",
              color: "white",
            }}
          >
            {cartCount}
          </Badge>
        )}
      </Appbar.Header>

      <View style={styles.container}>
        <Image
          style={styles.imageProduct}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.nameProduct}>{name}</Text>
        <Text style={styles.typeProduct}>{type}</Text>
        <Text style={styles.descProduct}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in
          posuere dui. In hac habitasse platea dictumst. Morbi vitae tincidunt
          leo. Etiam id libero at turpis mollis posuere consectetur.
        </Text>
        <Text style={styles.priceProduct}>{formatNumberToVND(price)} VND</Text>
        <View style={styles.addCartContainer}>
          <View style={styles.adjustContainer}>
            <IconButton
              icon="minus"
              size={24}
              onPress={handleDecrease}
              style={styles.adjustButton}
              iconColor="#7fb640"
              disabled={quantity === 0}
            />
            <Text style={styles.number}>{quantity}</Text>
            <IconButton
              icon="plus"
              size={24}
              onPress={handleIncrease}
              style={styles.adjustButton}
              iconColor="#7fb640"
            />
          </View>
          <View>
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: "#7fb640",
              }}
              mode="contained"
              onPress={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </View>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageProduct: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  adjustButton: {
    borderColor: "gray",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
  },
  nameProduct: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 40,
  },
  typeProduct: {
    fontSize: 14,
    fontWeight: "400",
    color: "#707070",
    marginTop: 10,
  },
  descProduct: {
    fontSize: 15,
    fontWeight: "500",
    color: "#4F4F4F",
    marginTop: 10,
    lineHeight: 24,
  },
  priceProduct: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 10,
  },
  number: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 20,
  },
  adjustContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addCartContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

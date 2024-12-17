import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  capitalizeFirstLetter,
  convertImageURL,
  formatNumberToVND,
} from "../utils";
import { useNavigation } from "@react-navigation/native";

export default function MaterialItem({ material }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={() =>
        navigation.navigate("MaterialDetailScreen", {
          material: material,
        })
      }
    >
      <Image
        style={styles.imageProduct}
        source={{
          uri: convertImageURL(material?.image_material),
        }}
      ></Image>
      <View style={styles.productInfo}>
        <Text style={styles.nameProduct}>
          {capitalizeFirstLetter(material?.name) || ""}
        </Text>
        <Text style={styles.priceProduct}>
          {material?.type == "buy"
            ? formatNumberToVND(material?.price_per_piece)
            : formatNumberToVND(material?.price_of_rent)}{" "}
          VND
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  productInfo: {
    padding: 15,
  },
  imageProduct: {
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 160,
    resizeMode: "cover",
  },
  nameProduct: {
    fontSize: 16,
    fontWeight: "500",
    color: "#221F1F",
    marginBottom: 5,
  },
  typeProduct: {
    fontSize: 14,
    fontWeight: "400",
    color: "#7D7B7B",
    marginBottom: 5,
  },
  priceProduct: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7FB640",
  },
});

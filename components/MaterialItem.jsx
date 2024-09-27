import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { formatNumberToVND } from "../utils";
import { useNavigation } from "@react-navigation/native";

export default function MaterialItem({
  image,
  name,
  type,
  price,
  requestType,
  id,
  quantity,
}) {
  const navigation = useNavigation();
  console.log(requestType);
  return (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={() =>
        navigation.navigate("MaterialDetailScreen", {
          image,
          name,
          type,
          price,
          requestType,
          id,
          quantityByStage: quantity,
        })
      }
    >
      <Image
        style={styles.imageProduct}
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        }}
      ></Image>
      <Text style={styles.nameProduct}>{name}</Text>
      <Text style={styles.typeProduct}>{type}</Text>
      <Text style={styles.priceProduct}>
        {requestType == "request by stage"
          ? "Số lượng: " + quantity
          : formatNumberToVND(price) + " VND"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    width: "45%",
    marginBottom: 30,
  },
  imageProduct: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
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
    fontSize: 16,
    fontWeight: "500",
    color: "#7FB640",
  },
});

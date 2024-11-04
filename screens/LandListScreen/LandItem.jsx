// LandItem.js

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { convertImageURL, formatNumber } from "../../utils";
import { useNavigation } from "@react-navigation/native";

const LandItem = ({ item }) => {
  const navigation = useNavigation();

  const image = item.url.find((item) => item.type === "image")?.string_url;
  console.log(convertImageURL(image));

  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: convertImageURL(image) }}
        style={styles.itemImage}
      />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.title}</Text>
        <Text
          style={[
            styles.itemStatus,
            item.status == "booked" ? styles.itemStatusSold : null,
          ]}
        >
          {item.status == "booked" ? "Đã thuê" : "Chưa thuê"}
        </Text>
        <Text style={styles.itemArea}>
          {formatNumber(item.acreage_land)} m2
        </Text>

        <TouchableOpacity
          style={styles.detailButton}
          onPress={() =>
            navigation.navigate("LandDetailScreen", { land: item })
          }
        >
          <Text style={styles.detailButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingBottom: 20,
    flexDirection: "row",
    borderRadius: 8,
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#b3b3b3",
  },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemStatus: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7fb640",
    marginBottom: 5,
  },
  itemStatusSold: {
    color: "red",
  },
  itemArea: {
    fontSize: 12,
    marginBottom: 5,
  },

  detailButton: {
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7fb640",
  },
  detailButtonText: {
    color: "#7fb640",
    fontSize: 14,
    textAlign: "center",
  },
});

export default LandItem;

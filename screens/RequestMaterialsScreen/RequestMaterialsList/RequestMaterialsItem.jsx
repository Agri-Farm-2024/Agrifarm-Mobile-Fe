import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function RequestMaterialsItem({
  title,
  description,
  price,
  status,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.RequestMaterialsItem}
      onPress={() => navigation.navigate("RequestMaterialsByStage")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={styles.title}> {title}</Text>
        <View
          style={[
            styles.containerStatus,
            status == "Hoàn thành"
              ? styles.containerStatusDone
              : status == "Chưa bắt đầu"
              ? styles.containerStatusNotYet
              : null,
          ]}
        >
          <Text
            style={[
              styles.textStatus,
              status == "Chưa bắt đầu" ? styles.textStatusNotYet : null,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
      <Text style={styles.textDesc}>{description}</Text>
      <Text style={styles.TextPrice}>{price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  RequestMaterialsItem: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#c4c4c4",
    width: "90%",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  containerStatus: {
    backgroundColor: "#f29d50",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  containerStatusDone: {
    backgroundColor: "#7FB640",
  },
  containerStatusNotYet: {
    backgroundColor: "#e2e2e2",
  },

  textStatus: {
    color: "white",
  },
  textStatusNotYet: {
    color: "#707070",
  },

  textDesc: {
    fontSize: 16,
    color: "#707070",
    fontWeight: "400",
    width: 280,
    marginBottom: 10,
  },
  TextPrice: {
    fontSize: 16,
    color: "#7FB640",
    fontWeight: "400",
  },
});

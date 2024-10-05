import { View, Text, ScrollView } from "react-native";
import React from "react";
import MaterialItem from "../../../components/MaterialItem";

const deviceData = [
  {
    id: 6,
    image:
      "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    name: "Máy cắt cỏ",
    type: "Thiết bị cắt",
    price: 2500000,
    requestType: "rent",
  },
  {
    id: 7,
    image:
      "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    name: "Máy cắt lưỡi",
    type: "Thiết bị cắt",
    price: 3200000,
    requestType: "rent",
  },
  {
    id: 8,
    image:
      "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    name: "Máy cắt gỗ",
    type: "Thiết bị cắt",
    price: 4100000,
    requestType: "rent",
  },
  {
    id: 9,
    image:
      "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    name: "Máy cắt gạch",
    type: "Thiết bị xây dựng",
    price: 3500000,
    requestType: "rent",
  },
  {
    id: 10,
    image:
      "https://st.meta.vn/Data/image/2024/02/16/may-cat-co-dung-pin-makute-cbc001-2b-g.jpg",
    name: "Máy cắt sắt",
    type: "Thiết bị công nghiệp",
    price: 5000000,
    requestType: "rent",
  },
];

export default function RentMaterials() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 20, // Prevent data from being cut off at the bottom
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          {deviceData.map((item) => (
            <MaterialItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              type={item.type}
              price={item.price}
              requestType={item.requestType}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

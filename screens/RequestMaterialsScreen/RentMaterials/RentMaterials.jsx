import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialItem from "../../../components/MaterialItem";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getMaterial } from "../../../redux/slices/materialSlice";
import { getMaterialSelector } from "../../../redux/selectors";
import ActivityIndicatorComponent from "../../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

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

const PAGE_SIZE = 100;

export default function RentMaterials() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const materialList = useSelector(getMaterialSelector);
  console.log("materialList", JSON.stringify(materialList));

  useEffect(() => {
    try {
      console.log("isFocused", isFocused);
      if (isFocused) {
        const params = {
          material_type: "rent",
          page_index: 1,
          page_size: PAGE_SIZE,
        };
        setLoading(true);
        dispatch(getMaterial(params)).then((response) => {
          setLoading(false);
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetch rent material", JSON.stringify(error));
    }
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {materialList &&
            materialList?.materials?.map((item) => (
              <MaterialItem key={item.material_id} material={item} />
            ))}
          {!materialList && loading && <ActivityIndicatorComponent />}
          {!materialList && !loading && (
            <Text
              style={{
                width: "100%",
                color: "#707070",
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Không tìm thấy vật tư
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

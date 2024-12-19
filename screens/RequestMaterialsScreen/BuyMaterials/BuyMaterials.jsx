import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialItem from "../../../components/MaterialItem";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getMaterial } from "../../../redux/slices/materialSlice";
import { getMaterialSelector } from "../../../redux/selectors";
import ActivityIndicatorComponent from "../../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";

const data = [
  {
    id: 1,
    image:
      "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
    name: "Ớt chuông",
    type: "Hạt giống",
    price: 16000,
    requestType: "buy",
  },
  {
    id: 2,
    image:
      "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
    name: "Cà chua",
    type: "Rau ăn quả",
    price: 12000,
    requestType: "buy",
  },
  {
    id: 3,
    image:
      "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
    name: "Hành tím",
    type: "Gia vị",
    price: 8000,
    requestType: "buy",
  },
  {
    id: 4,
    image:
      "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
    name: "Hành tím",
    type: "Gia vị",
    price: 8000,
    requestType: "buy",
  },
  {
    id: 5,
    image:
      "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
    name: "Tỏi",
    type: "Gia vị",
    price: 7000,

    requestType: "buy",
  },
];
const PAGE_SIZE = 100;

export default function BuyMaterials() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const materialList = useSelector(getMaterialSelector);
  console.log("materialList", JSON.stringify(materialList));

  useEffect(() => {
    try {
      if (isFocused) {
        const params = {
          material_type: "buy",
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
      console.log("Error fetch buy material", JSON.stringify(error));
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

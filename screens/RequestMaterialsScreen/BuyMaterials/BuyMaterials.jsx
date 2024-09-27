import { View, Text, ScrollView } from "react-native";
import React from "react";
import MaterialItem from "../../../components/MaterialItem";

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

export default function BuyMaterials() {
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
          }}
        >
          {data.map((item) => (
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

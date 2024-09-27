import { View, Text, ScrollView } from "react-native";
import React from "react";
import MaterialItem from "../../../components/MaterialItem";
import { Button } from "react-native-paper";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import Toast from "react-native-toast-message";

const data = [
  {
    stage: "Giai đoạn 1",
    status: "done",
    materials: [
      {
        id: 1,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Ớt chuông",
        type: "Hạt giống",
        price: 16000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 2,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Cà chua",
        type: "Rau ăn quả",
        price: 12000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 3,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Hành tím",
        type: "Gia vị",
        price: 8000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 4,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Hành tím",
        type: "Gia vị",
        price: 8000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 5,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Tỏi",
        type: "Gia vị",
        price: 7000,

        requestType: "request by stage",
        quantity: 3,
      },
    ],
  },
  {
    stage: "Giai đoạn 2",
    status: "not yet",
    materials: [
      {
        id: 1,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Ớt chuông",
        type: "Hạt giống",
        price: 16000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 2,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Cà chua",
        type: "Rau ăn quả",
        price: 12000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 3,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Hành tím",
        type: "Gia vị",
        price: 8000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 4,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Hành tím",
        type: "Gia vị",
        price: 8000,
        requestType: "request by stage",
        quantity: 3,
      },
      {
        id: 5,
        image:
          "https://s3-alpha-sig.figma.com/img/c186/5b3a/3dfa3959ea2ba52fb1d69308eca9b4c8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kvQMjDZeFSdiG7-pr2I67SVKLwJvZgEYra~r33IY7zYxHTA~XFPOlgk0HKBuonycGqU8k9xhfCXeRB7HBUH4kqMFk1-rBu8e9ECm1e9VrGNp0Y2eWKRbgAk3-DO5UZPK1BG5S2~nmD5Kdl32g~R86U9uh8VycFNe~PtphMLJJe75XtTIsJSox-q7xniRWMVGqeRLhSc5CgqwzDDOlCJl1vMpVKETyfnJQ-DmmEXg1u3jy8BKnBSyrpiub9vhv9JkIi2pKmI8OaJIfjNHi~p1O8lmYgEYZPyYH-CZRkKKKOVsSKQ0B38NTLroy4Ox1ehJcubH2UgQ6H2fUNm9~EFIAQ__",
        name: "Tỏi",
        type: "Gia vị",
        price: 7000,

        requestType: "request by stage",
        quantity: 3,
      },
    ],
  },
];

export default function RequestMaterialsByStage({ navigation }) {
  const [confirmRequest, setConfimRequest] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 20, // Prevent data from being cut off at the bottom
        }}
      >
        {data.map((dataItem) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  { color: "#222", fontSize: 20, fontWeight: "800" },
                  dataItem.status == "done" ? { color: "#707070" } : null,
                ]}
              >
                {dataItem.stage}
              </Text>
              <Button
                style={[
                  {
                    borderRadius: 5,
                    backgroundColor: "#7fb640",
                    width: 150,
                  },
                  dataItem.status == "done"
                    ? { backgroundColor: "#707070" }
                    : null,
                ]}
                mode="contained"
                onPress={() => setConfimRequest(true)}
                disabled={dataItem.status == "done"}
              >
                YÊU CẦU
              </Button>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                },
                dataItem.status == "done" ? { opacity: 0.5 } : null,
              ]}
            >
              {dataItem.materials.map((item) => (
                <MaterialItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  type={item.type}
                  price={item.price}
                  requestType={item.requestType}
                  quantity={item.quantity}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <ConfirmationModal
        visible={confirmRequest}
        onDismiss={() => setConfimRequest(false)}
        onConfirm={() => {
          Toast.show({
            type: "success",
            text1: "Đã gửi yêu cầu của bạn",
          });
          setConfimRequest(false);
          navigation.navigate("ThankYouScreen");
        }}
        title="Xác nhận "
        content="Yêu cầu nhận vật tư đợt này sẽ được gửi đi, chuyên gia sẽ giao cho bạn"
      />
    </View>
  );
}

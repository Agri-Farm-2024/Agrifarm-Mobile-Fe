import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import ContractContainer from "../LandLeaseScreen/ContractContainer/ContractContainer";
import ContractComponent from "../RequestListScreen/RequestContractDetailScreen/ContractComponent";
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent/ActivityIndicatorComponent";
import { useSelector } from "react-redux";

export default function ReviewContractScreen({ route }) {
  const { land, formData } = route.params;
  const user = useSelector((state) => state.userSlice.userInfo);

  console.log("ReviewContractScreen:");
  console.log("land: " + JSON.stringify(land));
  console.log("formData: " + JSON.stringify(formData));

  if (!land || !formData) return <ActivityIndicatorComponent />;

  const contract = {
    createAt: new Date().toISOString(),
    farmOwner: "Trang trại AgriFarm - quản lí trang trại: Trịnh Gia Hân",
    landrenter: user?.full_name,
    totalMonth: formData?.rentalMonths,
    purpose: formData?.purpose,
    area: land?.acreage_land,
    position: land?.name,
    pricePerMonth: land?.price_booking_per_month,
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <ContractComponent contract={contract} isDownload={false} />
      </ScrollView>
    </SafeAreaView>
  );
}

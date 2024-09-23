import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ContractContainer from "../ContractContainer/ContractContainer"; // Import the new component

export default function LandLeaseSign({ formData }) {
  console.log("LandLeaseSign: " + JSON.stringify(formData));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Điều khoản hợp đồng</Text>
      <ContractContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    height: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
});

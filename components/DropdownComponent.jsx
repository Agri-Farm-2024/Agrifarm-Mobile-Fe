import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ActivityIndicator } from "react-native-paper";

const DropdownComponent = ({
  label,
  placeholder,
  options,
  icon,
  value,
  setValue,
  styleValue,
  placeholderStyleValue,
  isDisabled,
  onScroll,
  isLoading,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "#7FB640" },
          isDisabled && { backgroundColor: "#D9D9D9" },
          styleValue,
        ]}
        onScroll={onScroll ? onScroll : null}
        scrollEventThrottle={400} // Set throttle to improve performance
        disable={isDisabled || isLoading}
        placeholderStyle={[styles.placeholderStyle, placeholderStyleValue]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={options || []}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder || "Select item"}
        value={value || ""}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() =>
          isLoading ? (
            <ActivityIndicator animating={true} color={"#7FB640"} size={20} />
          ) : (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "#7FB640" : "#707070"}
              name={"down"}
              size={15}
            />
          )
        }
        renderLeftIcon={() =>
          icon &&
          icon != "" && (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "#7FB640" : "black"}
              name={icon}
              size={20}
            />
          )
        }
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "#f5f5f5",
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  optionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    color: "black",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0", // Divider color
    marginTop: 5,
  },
});

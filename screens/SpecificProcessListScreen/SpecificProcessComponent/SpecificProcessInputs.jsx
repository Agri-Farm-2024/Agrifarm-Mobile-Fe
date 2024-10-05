import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, Icon } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function SpecificProcessInputs({
  processes,
  setProcesses,
  setHasUnsavedChanges,
}) {
  const handleRemove = (index) => {
    if (processes.length > 1) {
      const updatedProcesses = processes.filter((_, i) => i !== index);
      setProcesses(updatedProcesses);
    } else {
      Toast.show({
        type: "error",
        text1: "Phải có bước chuẩn bị",
      });
    }
  };

  return (
    <View>
      {processes.map((process, index) => (
        <View key={process.id} style={styles.input_prepare_container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={styles.label}>{index + 1}</Text>
            <TextInput
              mode="outlined"
              activeOutlineColor="#7FB640"
              textColor="black"
              inputMode="text"
              style={styles.input}
              value={process.title}
              onChangeText={(text) => {
                const updatedProcesses = [...processes];
                updatedProcesses[index].title = text;
                setProcesses(updatedProcesses);
                setHasUnsavedChanges(true);
              }}
            />
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              onPress={() => handleRemove(index)}
            >
              <Icon source="delete-outline" size={25} color="#d91515" />
            </TouchableOpacity>
          </View>
          <TextInput
            mode="outlined"
            activeOutlineColor="#7FB640"
            textColor="black"
            inputMode="text"
            style={[styles.input, { height: 95 }]}
            multiline={true}
            numberOfLines={5}
            value={process.description}
            onChangeText={(text) => {
              const updatedProcesses = [...processes];
              updatedProcesses[index].description = text;
              setProcesses(updatedProcesses);
              setHasUnsavedChanges(true);
            }}
          />
        </View>
      ))}

      <TouchableOpacity
        style={{ marginTop: 10, alignSelf: "flex-start" }}
        onPress={() => {
          const newProcess = {
            id: Math.floor(Math.random() * 100) + 1,
            title: "",
            description: "",
          };
          setProcesses([...processes, newProcess]);
        }}
      >
        <Icon source="plus-circle-outline" size={25} color="#7fb640" />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  input_prepare_container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 0,
  },
};

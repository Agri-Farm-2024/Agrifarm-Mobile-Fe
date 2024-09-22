// HelpScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { List, Text } from "react-native-paper";
import HelpRequestModal from "./HelpRequestModal"; // Import the modal component

export default function HelpScreen() {
  const [expanded, setExpanded] = useState(0);
  const [visible, setVisible] = useState(false);

  const faqList = [
    {
      question: "Tôi trộn các chất dinh dưỡng theo thứ tự nào?",
      answer:
        "Bạn nên trộn các chất dinh dưỡng theo hướng dẫn của nhà sản xuất để đảm bảo cây trồng được cung cấp đầy đủ dưỡng chất.",
    },
    {
      question: "Tôi có thể giữ dung dịch dinh dưỡng hỗn hợp trong bao lâu?",
      answer:
        "Dung dịch dinh dưỡng có thể được bảo quản trong một khoảng thời gian ngắn, thường không quá 1 tuần, tùy theo điều kiện môi trường.",
    },
    {
      question: "Khi nào tôi thêm bộ điều chỉnh pH?",
      answer:
        "Bộ điều chỉnh pH nên được thêm khi dung dịch dinh dưỡng có độ pH không phù hợp với yêu cầu của cây trồng.",
    },
    {
      question:
        "Các chất điều chỉnh tăng trưởng có được sử dụng trong các sản phẩm Planta không?",
      answer:
        "Các sản phẩm Planta chỉ sử dụng các chất điều chỉnh tăng trưởng được phê duyệt và an toàn cho cây trồng.",
    },
    {
      question: "Các sản phẩm Planta có phải là hữu cơ không?",
      answer:
        "Một số sản phẩm của Planta là hữu cơ, trong khi các sản phẩm khác có thể bao gồm thành phần tổng hợp.",
    },
  ];

  const handlePress = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleFormSubmit = (
    name,
    landCode,
    plantType,
    requestType,
    requestContent
  ) => {
    // Handle form submission here
    console.log("Form submitted:", {
      name,
      landCode,
      plantType,
      requestType,
      requestContent,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {faqList.map((faq, index) => (
          <List.Accordion
            key={index}
            title={<Text style={{ fontWeight: "bold" }}>{faq.question}</Text>}
            expanded={expanded === index}
            onPress={() => handlePress(index)}
            style={{ backgroundColor: "#f2f2f2" }}
            titleNumberOfLines={null}
          >
            <List.Item
              title={faq.answer}
              style={{ padding: 5 }}
              titleNumberOfLines={null}
            />
          </List.Accordion>
        ))}
      </ScrollView>

      {/* Button to open the modal */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Text style={styles.buttonText}>Yêu cầu hỗ trợ kĩ thuật</Text>
        </TouchableOpacity>
      </View>

      {/* Help Request Modal */}
      <HelpRequestModal
        visible={visible}
        onDismiss={hideModal}
        onSubmit={handleFormSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#7fb640",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
    textTransform: "uppercase",
  },
});

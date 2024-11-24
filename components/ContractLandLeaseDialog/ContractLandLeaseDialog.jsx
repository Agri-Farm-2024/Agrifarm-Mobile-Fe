import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function ContractLandLeaseDialog({ isVisible, onDismiss }) {
  const textSize = 14;
  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onDismiss}
        style={{
          backgroundColor: "white",
        }}
      >
        <Dialog.Title
          style={{ textAlign: "center", color: "#7FB640", fontWeight: "bold" }}
        >
          Hợp đồng thuê đất
        </Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView
            style={{ height: "85%", borderColor: "white" }}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            <Text style={[styles.subtitle, { fontSize: textSize }]}>
              Số: …..
            </Text>

            <Text style={[styles.centerText, { fontSize: textSize }]}>
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Text>
            <Text style={[styles.centerText, { fontSize: textSize }]}>
              Độc lập - Tự do - Hạnh phúc
            </Text>
            <Text style={[styles.dateText, { fontSize: textSize }]}>
              ————o0o————
            </Text>
            <Text style={[styles.dateText, { fontSize: textSize }]}>
              Ngày ….. tháng ….. năm …..
            </Text>

            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              Hôm nay, tại [Địa điểm lập hợp đồng], chúng tôi gồm:
            </Text>

            <Text style={[styles.subsection, { fontSize: textSize }]}>
              Bên A (Bên cung cấp dịch vụ):
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Tên công ty: [Tên công ty]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Mã số doanh nghiệp: [Mã số doanh nghiệp]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Địa chỉ trụ sở chính: [Địa chỉ công ty]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Đại diện: [Tên người đại diện]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Chức vụ: [Chức vụ người đại diện]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Số điện thoại liên hệ: [Số điện thoại]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Email: [Email]
            </Text>

            <Text style={[styles.subsection, { fontSize: textSize }]}>
              Bên B (Bên sử dụng dịch vụ):
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Họ và tên: [Họ và tên]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Địa chỉ thường trú: [Địa chỉ]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Số CMND/CCCD: [Số CMND/CCCD]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Ngày cấp: [Ngày cấp CMND/CCCD]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Nơi cấp: [Nơi cấp CMND/CCCD]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Số điện thoại liên hệ: [Số điện thoại]
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Email: [Email]
            </Text>

            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              Hai bên cùng thống nhất thỏa thuận và ký kết hợp đồng với các điều
              khoản sau:
            </Text>

            <Text style={[styles.subsection, { fontSize: textSize }]}>
              Điều 1: Nội dung dịch vụ
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              Bên A cung cấp cho Bên B các dịch vụ [Mô tả chi tiết nội dung dịch
              vụ] trong khoảng thời gian từ [Ngày bắt đầu] đến [Ngày kết thúc],
              hoặc theo các điều kiện được quy định tại hợp đồng này.
            </Text>

            <Text style={[styles.subsection, { fontSize: textSize }]}>
              Điều 2: Giá trị hợp đồng và phương thức thanh toán
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Tổng giá trị hợp đồng: [Số tiền] VNĐ.
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Phương thức thanh toán: [Thông tin chi tiết về cách thức thanh
              toán].
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Thời hạn thanh toán: [Thời hạn thanh toán].
            </Text>

            <Text style={[styles.subsection, { fontSize: textSize }]}>
              Điều 3: Quyền và nghĩa vụ của các bên
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Quyền và nghĩa vụ của Bên A: [Chi tiết các quyền và nghĩa vụ].
            </Text>
            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              - Quyền và nghĩa vụ của Bên B: [Chi tiết các quyền và nghĩa vụ].
            </Text>

            <Text style={[styles.paragraph, { fontSize: textSize }]}>
              Hai bên cam kết thực hiện nghiêm túc các điều khoản của hợp đồng.
              Trong trường hợp có tranh chấp, hai bên sẽ cùng nhau thương lượng
              giải quyết trên tinh thần hợp tác và thiện chí.
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Xong</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 5,
  },
  centerText: {
    textAlign: "center",
    marginBottom: 5,
  },
  dateText: {
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
  subsection: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

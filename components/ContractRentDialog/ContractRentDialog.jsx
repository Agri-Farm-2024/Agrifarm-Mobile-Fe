import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { formatDate, formatDateToVN, formatNumber } from "../../utils";

export default function ContractRentDialog({ isVisible, onDismiss, contract }) {
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
          Hợp đồng thuê thiết bị
        </Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView
            style={{ height: "85%", borderColor: "white" }}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <Text>
              <Text style={styles.bold}>Số:</Text> ……
            </Text>

            <Text style={[styles.center, styles.bold]}>
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Text>
            <Text style={styles.center}>Độc lập - Tự do - Hạnh phúc</Text>

            <Text style={styles.right}>
              <Text style={[styles.bold, styles.right]}>Đồng Nai, </Text>
              <Text style={styles.italic}>
                {new Date().toLocaleDateString()}
              </Text>
            </Text>

            <View style={styles.center}>
              <Text>
                Căn cứ Thông tư số 45/2013/TT-BTC của Bộ Tài Chính về “Hướng dẫn
                chế độ quản lý, sử dụng và trích khấu hao máy móc, thiết bị cố
                định”.
              </Text>
            </View>

            <View>
              <Text>
                <Text style={styles.bold}>Bên A - BÊN THUÊ:</Text>{" "}
                {contract?.landrenter?.full_name}
              </Text>
            </View>

            <View style={styles.marginTop}>
              <Text>
                <Text style={styles.bold}>Bên B - BÊN CHO THUÊ:</Text>{" "}
                {contract?.farmOwner}
              </Text>
            </View>

            <Text style={styles.heading}>
              Điều 1. QUY ĐỊNH KHI THUÊ THIẾT BỊ
            </Text>
            <View>
              <Text>Thiết bị thuê theo ngày.</Text>
              <Text>Giá cọc thiết bị do Manager quản lý.</Text>
              <Text>Nếu hư hại trong quá trình sử dụng, đền bù bằng cọc.</Text>
              <Text>Bên thuê đảm bảo lúc trả hàng không bị hư hao.</Text>
              <Text>
                Nếu thiết bị mất, phải đền bù giá trị của sản phẩm đó.
              </Text>
              <Text>
                Hai bên giao nhận thiết bị sau khi thanh toán hóa đơn.
              </Text>
              <Text>
                Thiết bị thuê phải đúng loại, số lượng, đúng thời gian và địa
                điểm đã thoả thuận, đảm bảo máy móc, thiết bị còn nguyên vẹn,
                đạt tiêu chuẩn chất lượng như đã quy định tại hợp đồng này.
              </Text>
            </View>

            <Text style={styles.heading}>
              Điều 2. NỘI DUNG, ĐỐI TƯỢNG VÀ GIÁ CẢ CỦA HỢP ĐỒNG
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>STT</Text>
                <Text style={styles.tableCell}>Tên máy móc, thiết bị</Text>
                <Text style={styles.tableCell}>Số lượng</Text>
                <Text style={styles.tableCell}>Thời gian thuê</Text>
                <Text style={styles.tableCell}>Giá thuê/ngày</Text>
              </View>

              {contract.productList.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                  <Text style={styles.tableCell}>{item?.name}</Text>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                  <Text style={styles.tableCell}>{contract?.rentDay} ngày</Text>
                  <Text style={styles.tableCell}>
                    {formatNumber(item?.price_of_rent)} VNĐ
                  </Text>
                </View>
              ))}
            </View>

            <Text style={styles.marginTop}>
              <Text style={styles.bold}>Giá thuê đã bao gồm VAT.</Text>
            </Text>
            <Text>
              <Text style={styles.bold}>
                Tiêu chuẩn chất lượng của máy móc, thiết bị:
              </Text>{" "}
              Tất cả máy móc phải đang hoạt động tốt, đạt công suất quy định của
              máy.
            </Text>

            <Text style={styles.heading}>Điều 3. MỤC ĐÍCH, THỜI HẠN THUÊ</Text>
            <Text>
              <Text style={styles.bold}>
                Mục đích thuê: Phục vụ để canh tác
              </Text>{" "}
              {contract.purpose}
            </Text>
            <Text>
              <Text style={styles.bold}>Thời hạn thuê:</Text>{" "}
              {contract?.rentDay} ngày
            </Text>

            <Text style={styles.heading}>
              Điều 4. THỜI HẠN VÀ PHƯƠNG THỨC THANH TOÁN
            </Text>
            <Text>
              <Text style={styles.bold}>Thời hạn thanh toán:</Text> Bên A thanh
              toán cho Bên B khi nhận được hoá đơn tài chính của Bên B.
            </Text>
            <Text>
              <Text style={styles.bold}>Phương thức thanh toán:</Text> Chuyển
              khoản Ngân hàng.
            </Text>

            <Text style={styles.heading}>Điều 6. QUYỀN VÀ NGHĨA VỤ</Text>
            <Text>
              <Text style={styles.bold}>Bên A có các nghĩa vụ sau đây:</Text>
            </Text>
            <View>
              <Text>Trả tiền thuê đúng và đủ theo quy định của hợp đồng.</Text>
              <Text>
                Không cho bên thứ ba thuê lại máy móc, thiết bị mà Bên B cho Bên
                A thuê trong thời hạn cho thuê, trừ khi có sự đồng ý của Bên B.
              </Text>
              <Text>
                Yêu cầu Bên B sửa chữa và bảo dưỡng định kỳ máy móc, thiết bị
                cho thuê trừ hư hỏng nhỏ.
              </Text>
            </View>

            <Text>
              <Text style={styles.bold}>Bên B có các nghĩa vụ sau đây:</Text>
            </Text>
            <View>
              <Text>
                Chịu trách nhiệm về tính sở hữu của máy móc, thiết bị cho thuê.
              </Text>
              <Text>
                Sửa chữa những hư hỏng, khuyết tật của máy móc, thiết bị cho
                thuê và bảo dưỡng định kỳ.
              </Text>
              <Text>
                Bồi thường thiệt hại nếu giao máy móc không đúng như đã thỏa
                thuận.
              </Text>
            </View>

            <Text style={styles.heading}>Điều 7. HIỆU LỰC CỦA HỢP ĐỒNG</Text>
            <Text>
              Hợp đồng có hiệu lực kể từ ngày ký. Trường hợp có bất kỳ điều
              khoản nào không thể thực hiện, các điều khoản còn lại vẫn có hiệu
              lực.
            </Text>

            <View style={styles.footer}>
              <Text>
                <Text style={styles.bold}>CHỮ KÝ BÊN A</Text>
              </Text>
              <Text>
                <Text style={styles.bold}>CHỮ KÝ BÊN B</Text>
              </Text>
            </View>
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
  container: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textButton: {
    backgroundColor: "#7fb640",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",

    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",

    marginTop: 10,
  },
  center: {
    textAlign: "center",
    marginTop: 10,
  },
  right: {
    textAlign: "right",

    marginTop: 10,
  },
  italic: {
    fontStyle: "italic",
    marginTop: 10,
  },
  marginTop: {
    marginTop: 30,
  },
  heading: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  tableHeader: {
    borderBottomWidth: 1,
    padding: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 8,
    textAlign: "center",
    flex: 1,
  },
  footer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

import React, { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  capitalizeFirstLetter,
  formatDateToDDMMYYYY,
  formatDateToVN,
  formatNumber,
} from "../../../utils";
import EmptyComponent from "../../../components/EmptyComponent/EmptyComponent";
import { DownloadPDF } from "../../../components/DownloadPDF/DownloadPDF";

const ContractComponent = ({ contract, isDownload }) => {
  const downLoadRef = useRef();
  const [textSize, setTextSize] = useState(16);
  console.log(contract);

  const tableHeaders = ["STT", "Sản phẩm", "Diện tích sản phẩm", "Đơn giá"];
  const tableData = [
    {
      id: 1,
      productName: contract?.productName,
      area: `${contract?.area} m2`,
      price: `${formatNumber(contract?.price)} VND`,
    },
  ];

  const renderTableRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.productName}</Text>
      <Text style={styles.cell}>{item.area}</Text>
      <Text style={styles.cell}>{item.price}</Text>
    </View>
  );

  if (!contract) return;
  <EmptyComponent message="Không có hợp đồng" />;

  return (
    <View>
      <View style={styles.buttonContainer}>
        {isDownload && (
          <Button
            mode="contained"
            onPress={() => {
              if (downLoadRef.current) {
                downLoadRef.current.handleDownloadPdf();
              }
            }}
            style={{
              borderColor: "orange",
              backgroundColor: "white",
              borderWidth: 1,
            }}
            textColor="orange"
          >
            Tải PDF
          </Button>
        )}
      </View>
      <ScrollView style={styles.container}>
        <Text style={[styles.textCenter, styles.header]}>HỢP ĐỒNG DỊCH VỤ</Text>
        <Text>
          <Text style={styles.bold}>Số:</Text> …..
        </Text>
        <Text style={styles.textCenter}>
          <Text style={styles.bold}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
          {"\n"}Độc lập - Tự do - Hạnh phúc
        </Text>
        <Text style={styles.textRight}>
          <Text style={styles.bold}>
            Đồng Nai,{" "}
            <Text style={styles.italic}>
              {formatDateToVN(contract?.createAt)}
            </Text>
          </Text>
        </Text>
        <Text>
          <Text style={styles.bold}>Căn cứ:</Text>
        </Text>
        <Text>• Bộ luật dân sự số 91/2015/QH13;</Text>
        <Text>• Luật Thương mại số 36/2005/QH11;</Text>
        <Text>• Thỏa thuận của các bên.</Text>
        <Text>
          Hôm nay, ngày {formatDateToVN(contract?.date || new Date())}, tại địa
          chỉ {contract?.location}, chúng tôi bao gồm:
        </Text>
        <Text>
          <Text style={styles.bold}>BÊN A (CANH TÁC):</Text>{" "}
          {contract?.landrenter?.full_name}
        </Text>
        <Text>Email: {contract?.landrenter?.email}</Text>
        <Text>
          <Text style={styles.bold}>BÊN B (DOANH NGHIỆP):</Text>{" "}
          {contract?.farmOwner}
        </Text>
        <Text>
          Dưới đây là nội dung điều khoản đã được bổ sung và hoàn chỉnh:
        </Text>
        <View>
          <Text style={styles.sectionHeader}>Điều khoản 1: Bao tiêu</Text>
          <Text style={styles.subSectionHeader}>
            Điều 1: Giá thành sản phẩm bao tiêu
          </Text>
          <Text>
            Bên A và bên B ký kết Hợp đồng bao tiêu sản phẩm theo đó, bên B ứng
            vốn, công nghệ và kỹ thuật để bên A sản xuất các mặt hàng sau đó
            giao bán lại cho bên B tiêu thụ đối với những sản phẩm như sau:
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>STT</Text>
              <Text style={styles.tableCell}>Sản phẩm</Text>
              <Text style={styles.tableCell}>Diện tích sản phẩm</Text>
              <Text style={styles.tableCell}>Đơn giá</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.italic]}>1</Text>
              <Text style={[styles.tableCell, styles.italic]}>
                {capitalizeFirstLetter(contract?.productName)}
              </Text>
              <Text style={[styles.tableCell, styles.italic]}>
                {contract?.area} m2
              </Text>
              <Text style={[styles.tableCell, styles.italic]}>
                {formatNumber(contract?.price)} VND
              </Text>
            </View>
          </View>
          <Text>
            <Text style={styles.bold}>
              Quy định giá thu mua và giá dịch vụ bao tiêu:
            </Text>
          </Text>
          <Text>
            • <Text style={styles.bold}>Giá thu mua:</Text>
          </Text>
          <Text>
            {" "}
            • Khấu trừ nhỏ hơn hoặc bằng 20% giá thu mua tại thời điểm mua dịch
            vụ.
          </Text>
          <Text> • Khấu trừ chất lượng tại thời điểm thu hoạch (≤ 10%).</Text>
          <Text>
            {" "}
            • Sản phẩm đạt chất lượng tốt (100%) sẽ không bị khấu trừ chất
            lượng.
          </Text>
          <Text>
            {" "}
            • Sản phẩm đạt chất lượng 95% (khấu trừ 5%), sản phẩm đạt 90% (khấu
            trừ 10%).
          </Text>
          <Text>
            • <Text style={styles.bold}>Giá dịch vụ bao tiêu:</Text> Bao gồm chi
            phí nhân công thu hoạch, đóng gói, vận chuyển.
          </Text>

          {/* Điều khoản 2 */}
          <Text style={styles.sectionHeader}>
            Điều khoản 2: Điều kiện thanh toán
          </Text>
          <Text>
            1. Bên B thanh toán cho Bên A toàn bộ số tiền đã thỏa thuận trong
            hợp đồng sau khi ký kết hợp đồng.
          </Text>
          <Text>
            2. Phương thức thanh toán: Thanh toán bằng chuyển khoản hoặc tiền
            mặt.
          </Text>
          <Text>
            3. Thời gian thanh toán sẽ được xác định trong các điều khoản bổ
            sung của hợp đồng.
          </Text>

          {/* Điều khoản 3 */}
          <Text style={styles.sectionHeader}>
            Điều khoản 3: Quyền và nghĩa vụ của các bên
          </Text>
          <Text>
            <Text style={styles.bold}>Bên A:</Text>
            {"\n"}• Đảm bảo chất lượng sản phẩm theo yêu cầu của bên B.
            {"\n"}• Thực hiện nghĩa vụ cung cấp sản phẩm đúng hạn.
          </Text>
          <Text>
            <Text style={styles.bold}>Bên B:</Text>
            {"\n"}• Thanh toán đầy đủ và đúng hạn theo hợp đồng.
            {"\n"}• Cung cấp thông tin và hỗ trợ bên A trong quá trình sản xuất.
          </Text>

          {/* Điều khoản 4 */}
          <Text style={styles.sectionHeader}>
            Điều khoản 4: Giải quyết tranh chấp
          </Text>
          <Text>
            1. Mọi tranh chấp phát sinh trong quá trình thực hiện hợp đồng sẽ
            được giải quyết thông qua thương lượng giữa các bên.
          </Text>
          <Text>
            2. Trong trường hợp không thể giải quyết được tranh chấp, các bên có
            thể yêu cầu giải quyết tranh chấp tại Tòa án có thẩm quyền.
          </Text>

          {/* Điều khoản 5 */}
          <Text style={styles.sectionHeader}>
            Điều khoản 5: Điều khoản chung
          </Text>
          <Text>
            1. Hợp đồng này có hiệu lực kể từ ngày ký và được thực hiện trong
            thời gian thỏa thuận giữa các bên.
          </Text>
          <Text>
            2. Mọi sửa đổi, bổ sung hợp đồng phải được lập thành văn bản và có
            sự đồng ý của cả hai bên.
          </Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>
              <Text style={styles.bold}>ĐẠI DIỆN BÊN A</Text>
              {"\n"}(Ký, ghi rõ họ tên)
            </Text>
            <Text>
              <Text style={styles.bold}>ĐẠI DIỆN BÊN B</Text>
              {"\n"}(Ký, ghi rõ họ tên)
            </Text>
          </View>
        </View>
      </ScrollView>
      <DownloadPDF ref={downLoadRef} />
    </View>
  );
};

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
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  header: { fontSize: 24, marginBottom: 16 },
  sectionHeader: { fontSize: 20, marginTop: 16, fontWeight: "bold" },
  subSectionHeader: { fontSize: 18, marginTop: 8, fontWeight: "bold" },
  table: { marginTop: 16, borderWidth: 1 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1 },
  tableCell: { flex: 1, padding: 8, borderRightWidth: 1 },
});

export default ContractComponent;

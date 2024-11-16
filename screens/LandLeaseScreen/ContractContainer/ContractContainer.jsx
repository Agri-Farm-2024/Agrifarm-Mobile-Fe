import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

export default function ContractContainer({ content }) {
  return (
    <ScrollView
      style={styles.contractContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <Text style={styles.contractText}>
        HỢP ĐỒNG THUÊ ĐẤT
        {"\n\n"}Số: ….. {"\n\n"}
        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM{"\n"}
        Độc lập - Tự do - Hạnh phúc {"\n\n"}
        ...., ngày..... tháng .....năm ....
        {"\n\n"}HỢP ĐỒNG THUÊ ĐẤT{"\n"}
        Căn cứ Luật Đất đai ngày 29 tháng 11 năm 2013;{"\n"}
        Căn cứ Nghị định số 43/2014/NĐ-CP ngày 15 tháng 5 năm 2014 của Chính phủ
        quy định chi tiết thi hành một số điều của Luật Đất đai;{"\n"}
        Căn cứ Thông tư số 30/2014/TT-BTNMT ngày 02 tháng 6 năm 2014 của Bộ
        trưởng Bộ Tài nguyên và Môi trường quy định về hồ sơ giao đất, cho thuê
        đất, chuyển mục đích sử dụng đất, thu hồi đất;{"\n"}
        Căn cứ Quyết định số………….ngày…tháng …năm…của Ủy ban nhân dân……..về việc
        cho thuê đất……………..{"\n"}
        Hôm nay, ngày ... tháng ... năm ... tại ………………., chúng tôi gồm:
        {"\n\n"}I. Bên cho thuê đất:{"\n"}
        …………………………………………{"\n"}
        …………………………………………{"\n"}
        {"\n"}II. Bên thuê đất là: .....................{"\n"}
        (Đối với hộ gia đình thì ghi tên chủ hộ, địa chỉ theo số chứng minh nhân
        dân/căn cước công dân/số định danh cá nhân …; đối với cá nhân thì ghi
        tên cá nhân, địa chỉ theo số chứng minh nhân dân/căn cước công dân/ định
        danh cá nhân, tài khoản (nếu có); đối với tổ chức thì ghi tên tổ chức,
        địa chỉ trụ sở chính, họ tên và chức vụ người đại diện, số tài
        khoản…..).{"\n\n"}
        III. Hai Bên thỏa thuận ký hợp đồng thuê đất với các điều, khoản sau
        đây:
        {"\n\n"}Điều 1. Bên cho thuê đất cho Bên thuê đất thuê khu đất như sau:
        {"\n"}
        1. Diện tích đất .............. m2 (ghi rõ bằng số và bằng chữ, đơn vị
        là mét vuông).{"\n"}
        Tại ... (ghi tên xã/phường/thị trấn; huyện/quận/thị xã/thành phố thuộc
        tỉnh; tỉnh/thành phố trực thuộc Trung ương nơi có đất cho thuê).{"\n\n"}
        2. Vị trí, ranh giới khu đất được xác định theo tờ trích lục bản đồ địa
        chính (hoặc tờ trích đo địa chính) số ..., tỷ lệ …….. do ..........lập
        ngày … tháng … năm ... đã được ... thẩm định.{"\n\n"}
        3. Thời hạn thuê đất ... (ghi rõ số năm hoặc số tháng thuê đất bằng số
        và bằng chữ phù hợp với thời hạn thuê đất), kể từ ngày ... tháng ... năm
        ... đến ngày ... tháng ... năm ...{"\n\n"}
        4. Mục đích sử dụng đất thuê:...............{"\n\n"}
        Điều 2. Bên thuê đất có trách nhiệm trả tiền thuê đất theo quy định sau:
        {"\n"}1. Giá đất tính tiền thuê đất là ... đồng/m2/năm (ghi bằng số và
        bằng chữ).{"\n"}
        2. Tiền thuê đất được tính từ ngày... tháng ... năm........{"\n"}
        3. Phương thức nộp tiền thuê đất: .....................{"\n"}
        4. Nơi nộp tiền thuê đất: ......................{"\n"}
        5. Việc cho thuê đất không làm mất quyền của Nhà nước là đại diện chủ sở
        hữu đất đai và mọi tài nguyên nằm trong lòng đất.{"\n\n"}
        Điều 3. Việc sử dụng đất trên khu đất thuê phải phù hợp với mục đích sử
        dụng đất đã ghi tại Điều 1 của Hợp đồng này.{"\n\n"}
        Điều 4. Quyền và nghĩa vụ của các bên
        {"\n"}1. Bên cho thuê đất bảo đảm việc sử dụng đất của Bên thuê đất
        trong thời gian thực hiện hợp đồng, không được chuyển giao quyền sử dụng
        khu đất trên cho bên thứ ba, chấp hành quyết định thu hồi đất theo quy
        định của pháp luật về đất đai;{"\n"}
        2. Trong thời gian thực hiện hợp đồng, Bên thuê đất có các quyền và
        nghĩa vụ theo quy định của pháp luật về đất đai.
        {"\n"}Trường hợp Bên thuê đất bị thay đổi do chia tách, sáp nhập, chuyển
        đổi doanh nghiệp, bán tài sản gắn liền với đất thuê.............. thì tổ
        chức, cá nhân được hình thành hợp pháp sau khi Bên thuê đất bị thay đổi
        sẽ thực hiện tiếp quyền và nghĩa vụ của Bên thuê đất trong thời gian còn
        lại của Hợp đồng này.{"\n"}
        3. Trong thời hạn hợp đồng còn hiệu lực thi hành nếu bên thuê đất có gia
        hạn hợp đồng:
        {"\n"} - Đối với hợp đồng không có tích chọn gia hạn từ đầu, yêu cầu gia
        hạn phải được gửi trước 2 tháng trước khi kết thúc hợp đồng. Bên cho
        thuê sẽ xem tình trạng đất có phù hợp cho gia hạn hay không (xử lí trong
        1 tuần từ ngày nhận đơn yêu cầu).{"\n"}- Nếu hợp đồng đã tích chọn gia
        hạn từ đầu, nếu muốn hủy gia hạn thì phải gửi yêu cầu trước 1 tháng và
        bị trừ 10% (tiền gia hạn).{"\n"}- Nếu muốn tiếp tục thuê đất sau khi hợp
        đồng kết thúc, yêu cầu phải được gửi trước 2 tháng. Trường hợp có bên
        thứ ba thuê sau khi hết hợp đồng thì sẽ gửi yêu cầu cho bên thuê đất
        thuê là có muốn thuê tiếp sau khi hết hợp đồng hay không.
        {"\n\n"}
        4. Bên thuê đất không có quyền chuyển nhượng đất cho bên thứ ba trong
        thời gian hợp đồng còn hiệu lực.{"\n"}
        5. Vi phạm hợp đồng: Nếu bên thuê đất làm hư đất canh tác thì phải đền
        bù theo quy định tiền do bên cho thuê quyết định.{"\n\n"}
        6. Thời gian thuê:{"\n"}- Nếu chọn quy trình chuẩn VietGap sẽ thuê ngắn
        hạn.{"\n"}- Nếu tự canh tác sẽ tùy thời gian thuê của người thuê đất.
        {"\n\n"}
        7. Thu tiền hợp đồng:{"\n"}- Hợp đồng từ 1 năm trở lên sẽ thu tiền theo
        mốc (6 tháng thu 1 lần).{"\n"}- Nếu hợp đồng 1 năm sẽ thu 1 lần.{"\n\n"}
        Điều 5. Hợp đồng thuê đất chấm dứt trong các trường hợp sau:
        {"\n"}1. Hết thời hạn thuê đất mà không được gia hạn thuê tiếp;{"\n"}
        2. Do đề nghị của một bên hoặc các bên tham gia hợp đồng và được cơ quan
        nhà nước có thẩm quyền cho thuê đất chấp thuận;{"\n"}
        3. Bên thuê đất bị phá sản hoặc bị phát mại tài sản hoặc giải thể;{"\n"}
        4. Bên thuê đất bị cơ quan nhà nước có thẩm quyền thu hồi đất theo quy
        định của pháp luật về đất đai.{"\n\n"}
        Điều 6. Việc giải quyết tài sản gắn liền với đất sau khi kết thúc Hợp
        đồng này được thực hiện theo quy định của pháp luật.{"\n\n"}
        Điều 7. Hai Bên cam kết thực hiện đúng quy định của hợp đồng này, nếu
        Bên nào không thực hiện thì phải bồi thường cho việc vi phạm hợp đồng
        gây ra theo quy định của pháp luật.
        {"\n"}Cam kết khác (nếu có): .................{"\n\n"}
        Điều 8. Hợp đồng này được lập thành 04 bản có giá trị pháp lý như nhau,
        mỗi Bên giữ 01 bản và gửi đến cơ quan thuế, kho bạc nhà nước nơi thu
        tiền thuê đất.
        {"\n"}Hợp đồng này có hiệu lực kể từ ngày………………....
        {"\n\n"}Bên thuê đất{"\n"}
        (Ký, ghi rõ họ, tên, đóng dấu (nếu có)){"\n"}
        {"\n"}Bên cho thuê đất{"\n"}
        (Ký, ghi rõ họ, tên và đóng dấu)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contractContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  contractText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});

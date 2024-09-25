import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

const actions = [
  {
    label: "Chuẩn bị đất",
    logo: "https://canadianfoodfocus.org/wp-content/uploads/2022/09/person-holding-soil.jpg",
  },
  {
    label: "Gieo trồng",
    logo: "https://png.pngtree.com/png-vector/20191018/ourlarge/pngtree-plant-seed-logo-design-png-image_1824179.jpg",
  },
  {
    label: "Xử lý dịch hại",
    logo: "https://westtermite.com/wp-content/uploads/2021/06/Termite-Icons-01-01.png",
  },
  {
    label: "Xử lý ra hoa và trái non",
    logo: "https://a-z-animals.com/media/2022/12/2560px-Syzygium_paniculatum_bloeiwyses_Tuks_b-1024x768.jpg",
  },
  {
    label: "Quản lý nước",
    logo: "https://img.freepik.com/premium-vector/water-droplet-logo-white-background_136558-36672.jpg",
  },
  {
    label: "Bón phân",
    logo: "https://i.ex-cdn.com/nongnghiep.vn/files/content/2023/07/06/anh-chup-man-hinh-2023-07-06-luc-101846-101951_553.jpeg",
  },
  {
    label: "Thu hoạch",
    logo: "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2023/12/Untitled-683-x-1024-px-2023-12-12T092533.238.jpg",
  },
];

const history = [
  {
    date: "12/09/2020",
    title: "Chuẩn bị đất",
  },
  {
    date: "13/09/2020",
    title: "Gieo hạt dưa hấu",
  },
  {
    date: "14/09/2020",
    title: "Tưới nước",
  },
  {
    date: "15/09/2020",
    title: "Phun thuốc trừ sâu",
  },
];

const DiaryHistory = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.header}>Chọn công việc</Text>
      <View style={styles.actionTypeContainer}>
        {actions.map((action, index) => (
          <TouchableRipple
            key={index}
            rippleColor="rgba(127, 182, 64, 0.2)"
            onPress={() => {
              navigation.navigate("WriteDiaryScreen");
            }}
            style={styles.actionWrapper}
          >
            <>
              <Image
                style={styles.actionLogo}
                source={{ uri: action.logo }}
              ></Image>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </>
          </TouchableRipple>
        ))}
      </View>
      <Text style={styles.header}>Lịch sử canh tác</Text>
      <FlatList
        data={history}
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        contentContainerStyle={{
          justifyContent: "space-between",
          gap: 10,
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableRipple
            style={styles.historyWrapper}
            rippleColor="rgba(127, 182, 64, 0.2)"
            onPress={() => navigation.navigate("UpdateDiaryScreen")}
          >
            <>
              <View style={styles.historyInfoContainer}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyTitle}>{item.title}</Text>
              </View>

              <MaterialIcons
                name="arrow-forward-ios"
                size={24}
                color="#707070"
              />
            </>
          </TouchableRipple>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionTypeContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  actionWrapper: {
    width: 80,
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 7,
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  actionLogo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    objectFit: "cover",
    objecPosition: "center",
    resizeMode: "cover",
  },
  actionLabel: {
    width: "100%",
    paddingHorizontal: 2,
    fontSize: 10,
    textAlign: "center",
    color: "#707070",
  },
  historyInfoContainer: {
    gap: 5,
    paddingVertical: 10,
  },
  historyWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 2,
  },
  historyDate: {
    color: "#707070",
    fontSize: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DiaryHistory;

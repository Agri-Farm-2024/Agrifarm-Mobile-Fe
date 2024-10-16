import React, { useState, useEffect, useRef } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

// Lấy kích thước chiều rộng của màn hình
const { width: screenWidth } = Dimensions.get("window");

export default function SlideImageComponent() {
  const [images] = useState([
    require("../../assets/discount.png"),
    require("../../assets/discount.png"),
    require("../../assets/discount.png"),
  ]);

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Chuyển đến slide tiếp theo, quay lại slide đầu tiên nếu đến slide cuối cùng
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
      carouselRef.current?.snapToItem(nextIndex);
    }, 3000); // Thời gian chuyển slide (3000ms = 3 giây)

    // Xóa interval khi component bị unmount
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setActiveIndex(index)} // Cập nhật index khi người dùng lướt
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 180,
    width: "100%",
    resizeMode: "cover",
  },
});

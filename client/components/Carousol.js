import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
const { width } = Dimensions.get("screen");

const Carousol = ({ image }) => {
  const [imgActive, setImageActive] = useState(0);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.round(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setImageActive(slide);
      }
    }
  };
  const scrollViewRef = useRef(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (imgActive + 1) % image.length;
      scrollViewRef.current.scrollTo({
        x: width * nextIndex,
        animated: true,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [imgActive]);
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        scrollEventThrottle={16}
      >
        {image.map((img, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            style={styles.imgContainer}
            onPress={() => alert(img._id)}
          >
            <Image source={{ uri: img?.bannerImage?.url }} style={styles.img} />
            {/* <Text>{img.txt}</Text> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {image.map((val, ind) => (
          <Text
            key={ind}
            style={imgActive === ind ? styles.dotActive : styles.dot}
          >
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Carousol;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    width: width,
    position: "relative",
    justifyContent: "center",
  },
  imgContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "95%",
    height: 200,
    objectFit: "cover",
    borderRadius: 5,
  },
  wrapDot: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    position: "absolute",
    zIndex: 1,
    bottom: 20,
  },
  dotActive: {
    margin: 3,
    color: "#973D00",
    marginTop: 20,
    fontSize: 20,
  },
  dot: {
    margin: 3,
    color: "gray",
    marginTop: 20,
    fontSize: 20,
  },
});

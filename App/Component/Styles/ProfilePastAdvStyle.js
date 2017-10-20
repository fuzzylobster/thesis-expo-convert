import { StyleSheet, Dimensions } from "react-native";
//import { Metrics, ApplicationStyles } from '../../Themes/'
const windowWidth = Dimensions.get("window").width;
const gutter = 16;
export const containerPadding = gutter * -2.25;
export const swiperWidth = windowWidth - gutter * 4;

export default StyleSheet.create({
  wrapper: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#000000",
    // overflow: "visible"
    // //width: swiperWidth
  },
  swiper: {
    overflow: "visible"
  },
  slide: {
    flex: 1,
    position: "relative",
    width: swiperWidth - gutter,
    backgroundColor: "#9DD6EB",
    alignSelf: "center",
    justifyContent: "center"
  },
  slide2: {
    flex: 1,
    position: "relative",
    width: swiperWidth - gutter,
    backgroundColor: "#97CAE5",
    alignSelf: "center",
    justifyContent: "center"
  },
  slide3: {
    flex: 1,
    position: "relative",
    width: swiperWidth - gutter,
    backgroundColor: "#92BBD9",
    alignSelf: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center"
  }
});

import { StyleSheet, Dimensions } from "react-native";
//import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: "#FFECEC"
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: "#FFECEC"
  },
  image: {
    flex: 1,
    alignSelf: "stretch"
  },
  text: {
    color: "#000000",
    alignSelf: "flex-end"
  },
  header: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    backgroundColor: "#6CBCBC",
    padding: 2
  },
  topHeader: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    backgroundColor: "#9E2626",
    padding: 2
  },
  profHeader: {
    backgroundColor: "#9E2626",
    color: "#FFFFFF"
  },
  photoContainer: {
    alignItems: "center",
    backgroundColor: "#FFECEC"
  },
  badges: {},
  photos: {},
  pastAdv: {}
});
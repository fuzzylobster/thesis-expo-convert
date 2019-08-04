import { StyleSheet } from "react-native";
//import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  body: {
    // backgroundColor: "#FFECEC"
  },
  headBody: {
    backgroundColor: "#9E2626"
  },
  signedInTxt: {
    color: "#FFFFFF"
  },
  selectButton: {
    padding: 10,
    backgroundColor: "#acc878"
  },
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#FFECEC"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  profilePicWrap: {
    width: 75,
    height: 75,
    borderRadius: 35,
    borderColor: "#306969",
    borderWidth: 5
  },
  profilePic: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 35,
    borderColor: "#fff",
    borderWidth: 2
  }
});

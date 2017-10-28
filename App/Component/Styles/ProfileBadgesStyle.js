import { StyleSheet } from "react-native";
//import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  text: {
    color: "#FFFFFF"
  },
  badgeContainer: {
    margin: 5
  },
  bar: {
    borderTopColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: "#ec2e4a",
    flexDirection: "row"
  },
  barSeparator: {
    borderRightWidth: 4
  },
  barItem: {
    flex: 1,
    padding: 18,
    alignItems: "center"
  },
  barTop: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  barBottom: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold"
  }
});

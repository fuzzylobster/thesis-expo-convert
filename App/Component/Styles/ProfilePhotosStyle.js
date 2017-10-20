import { StyleSheet } from "react-native";
//import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    height: 125
  },
  item: {
    height: 120,
    width: 120,
    margin: 2
  },
  photoBox: {
    backgroundColor: "#000000",
        justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modal: {
    flex: 1,
    padding: 40
  }
});

import { StyleSheet } from "react-native";
//import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  headerBackground: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    backgroundColor: "#000000"
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0, 0.5)"
  },
  profilePicWrap: {
    width: 180,
    height: 180,
    borderRadius: 180,
    borderColor: "rgba(0,0,0,0.4)",
    borderWidth: 16
  },
  profilePic: {
    flex: 1,
    width: null,
    // alignSelf: "stretch",
    borderRadius: 65,
    borderColor: "#6c1a1a",
    borderWidth: 5,
    margin: 5
  },
  name: {
    marginTop: 20,
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  pos: {
    fontSize: 14
  }
});

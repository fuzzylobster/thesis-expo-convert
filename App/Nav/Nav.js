import { StackNavigator } from "react-navigation";
import HomeScreenContainer from "../Containers/HomeScreenContainer";
import LoginContainer from "../Containers/LoginContainer";
import RoutesContainer from "../Containers/RoutesContainer";
import Profile from "../Containers/ProfileContainer";
import MapViewer from "../Component/MapView/MapViewer";
import testContainer from "../Containers/testContainer";
import ARContainer from "../Containers/ARContainer";
//import RouteViewer from "../ComponentViews/RouteViewer";
import styles from "./Styles/NavStyle";
import { connect } from "react-redux";
import App from "../Containers/App";

// Manifest of possible screens
export const Nav = StackNavigator(
  {
    HomeScreenContainer: { screen: HomeScreenContainer },
    RoutesContainer: { screen: RoutesContainer },
    LoginContainer: { screen: LoginContainer },
    Profile: { screen: Profile },
    MapViewer: { screen: MapViewer },
    testContainer: { screen: testContainer },
    ARContainer: { screen: ARContainer }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "LoginContainer",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default Nav;

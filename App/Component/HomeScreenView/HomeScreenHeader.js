import React, { Component } from "react";
import { 
  Platform, 
  StyleSheet, 
  Text,
  View, 
  Image,
  AsyncStorage
} from "react-native";
import { Button } from "native-base";
import FooterMenu from "../Footer";
import ProfilePastAdv from "../ProfileView/ProfilePastAdv";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./../Styles/HomeScreenStyle";

import jwtdecode from "jwt-decode";
import Api from "../../Services/Api";

var STORAGE_KEY = "jwtToken";

const userLogout = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log("AsyncStorage error: " + error.message);
  }
};

const getJWT = async () => {
  try {
    var token = await AsyncStorage.getItem(STORAGE_KEY);
    return token;
  } catch (error) {
    console.log("AsyncStorage error:" + error.message);
  }
};

export default class HomeScreen extends Component {

  async _showToken() {
    var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(TOKEN);
  }

  logout() {
    userLogout();
    this.props.navigation.navigate("LoginContainer");
  }

  getData() {
    getJWT().then(jwt => {
      // Decode
      const decoded = jwtdecode(jwt);
      // HTTP request
      const api = Api.create();
      api.findUserData(decoded.userID).then(Response => {
        this.props.set_Token(Response.data[0].id);
        console.log(Response);
      });

      return decoded.userID;
    });
    this.props.navigation.navigate("Profile");
  }


  render() {
    return (
      <Grid>
        <Row>
          <Col size={75}>
            <Row style={styles2.signedIn}>
              <Text>You are signed in as {this.props.user.name}</Text>
            </Row>
            <Row style={styles2.buttonsRow}>
              <Button
                style={styles2.buttonStyle}
                onPress={() => {
                  this.getData();
                }}
                title="Profile"
              >
                <Text style={styles2.buttonText}>View Profile</Text>
              </Button>
              <Button
                style={styles2.buttonStyle}
                onPress={() => {
                  this.logout();
                }}
              >
                <Text style={styles2.buttonText}>Log Out</Text>
              </Button>
              <Button
                style={styles2.buttonStyle}
                onPress={this._showToken}
                title="Experiment"
              >
                <Text style={styles2.buttonText}>Experiment</Text>
              </Button>
            </Row>
          </Col>
          <Col size={25} style={styles2.imageCol}>
            <View style={styles.profilePicWrap}>
              <Image
                style={styles.profilePic}
                source={{ uri: this.props.user.picture.data.url }}
              />
            </View>
          </Col>
        </Row>
      </Grid>

      // <Grid>
      //   <Row>
      //     <Row size={70}>
      //       <Col size={22} />
      //       <Col
      //         size={56}
      //         style={{
      //           justifyContent: "space-around",
      //           alignItems: "center",
      //           marginTop: 30
      //         }}
      //       >
      //         <Text>You are signed in as</Text>
      //         <Text>{this.props.user.name}.</Text>
      //         <Row style={{ marginTop: 10 }}>
      //           <Button
      //             onPress={() => this.props.navigation.navigate("Profile")}
      //             title="Profile"
      //             style={{ alignSelf: "center" }}
      //           />
      //           <Col size={5} />
      //           <Button
      //             title="MapView"
      //             style={{ alignSelf: "center" }}
      //             onPress={() =>
      //               this.props.navigation.navigate("RoutesContainer")}
      //           />
      //         </Row>
      //       </Col>
      //       <Col size={22}>
      //         <View style={styles.profilePicWrap}>
      //           <Image
      //             style={styles.profilePic}
      //             source={{ uri: this.props.user.picture.data.url }}
      //           />
      //         </View>
      //       </Col>
      //     </Row>
      //   </Row>
      //   <Row size={10} />
      // </Grid>
    );
  }
}

const styles2 = StyleSheet.create({
  signedIn: {
    justifyContent: "center",
    alignItems: "center"
  },

  imageCol: {
    alignItems: "flex-end"
  },

  buttonsRow: {
    justifyContent: "center"
  },

  buttonStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    height: 30,
    margin: 5,
    marginTop: 0
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

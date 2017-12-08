import React, { Component } from "react";
import { connect } from "react-redux";
import { Select_user } from "../../redux/actions";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";
import { SocialIcon } from "react-native-elements";
import { ImagePicker, AuthSession, Google } from "expo";
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Image
} from "react-native";

import styles from "./../Styles/LoginScreenStyle";
import { google, facebook } from "react-native-simple-auth";
import Api from "../../Services/Api";
// const api = Api.create();

var STORAGE_KEY = "jwtToken";

export default class LoginScreen extends Component {
  state = {
    image1: null
  };
  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }
  }

  blank() {
    this.props.onLogin({
      id: 1,
      name: "Dev Mode",
      First_name: "Dev",
      Last_name: "Mode",
      verified: "True",
      email: "DevMode.com",
      link: "www.google.com",
      picture: {
        data: {
          url:
            "https://www.allworship.com/wp-content/uploads/2015/06/bigstock-Work-In-Progress-Concept-73569091-640x582.jpg"
        }
      }
    });

    this.props.navigation.navigate("HomeScreenContainer");
  }

  iosSignIn = () => {
    Google.logInAsync({
      iosClientId:
        "959826721453-spi396f9irfbijrpt46mbfgcknr2cb7o.apps.googleusercontent.com"
    })
      .then(info => {
        console.log(info);
        let obj = {
          id: info.user.id,
          name: info.user.name,
          First_name: info.user.givenName,
          Last_name: info.user.familyName,
          verified: "True",
          email: info.user.email,
          link: info.user.email,
          picture: { data: { url: info.user.photoUrl } }
        };
        this.props.onLogin(obj);
        const api = Api.create();

        api
          .findUserData(info.user.id)
          .then(response => {
            this.props.stop(response);
            console.log("INITIAL LOGIN", JSON.stringify(response.data));
            this._onValueChange(STORAGE_KEY, response.data[0].jwtToken);
          })
          .catch(error => {
            console.log("error initial login", error);
            const api2 = Api.create();
            api2
              .postUserData({
                token: info.idToken,
                authType: "google"
              })
              .then(response => {
                this.props.stop(response);
                console.log("SECOND LOGIN", JSON.stringify(response.data));
                this._onValueChange(STORAGE_KEY, response.data.jwtToken);
              })
              .catch(error => {
                console.log("error second login", error);
              });
          });

        if (this.props.user.name) {
          this.props.navigation.navigate("HomeScreenContainer");
        }
      })
      .catch(error => {
        this.setState({ user: { error: error } });
      });
  };
  render() {
    return (
      <Image
        style={{
          flex: 1,
          alignSelf: 'stretch',
          width: undefined,
          height: undefined
        }}
        source={require('../../../gradient.png')}>
      <View style={styles.body}>
        <Image
          source={require("../../../assets/icons/odycity.png")}
          style={styles.logo}
          fadeDuration={1000}
        />
        <View style={styles.center}>
          <Button
            onPress={() => {
              this.iosSignIn();
            }}
            style={styles.googleButton}
          >
            <Text>Sign in with Google</Text>
          </Button>
        </View>
        {/* <TouchableOpacity>
          <Button
            style={{ backgroundColor: "red" }}
            onPress={() => {
              this.blank();
            }}>
            <Text>Sign in with dev mode</Text>
            </Button>
        </TouchableOpacity> */}
      </View>
      </Image>
    );
  }
}

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
  AsyncStorage
} from "react-native";

import styles from "./../Styles/LoginScreenStyle";
import { google, facebook } from "react-native-simple-auth";
import Api from "../../Services/Api";
const api = Api.create();

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
  newImage() {
    ImagePicker.launchImageLibraryAsync({}, response => {
      const image = {
        uri: response.uri,
        type: "image/jpeg",
        name: "myImage" + "-" + Date.now() + ".jpg"
      };
      const imgBody = new FormData();
      imgBody.append("image", image);

      api
        .postUserPhoto(imgBody)
        .then(res => {
          const source = { uri: res.imageUrl, isStatic: true };
          console.log(res);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  api = {};

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
  fbSignIn() {
    facebook({
      appId: "1906030709413245",
      callback: "fb1906030709413245://authorize"
    })
      .then(info => {
        this.props.onLogin(info.user);

        api
          .postUserData({
            token: info.credentials.id_token,
            authType: "facebook"
          })
          .then(response => response.json())
          .then(responseData => {
            // Alert.alert("Login Success!", "Fuck ya");
          })
          .done();
        if (this.props.user.name) {
          this.props.navigation.navigate("HomeScreenContainer");
        }
      })
      .catch(error => {
        this.setState({ user: { error: error } });
      });
  }
  googleSignIn() {
    let redirectUrl = AuthSession.getRedirectUrl();

    google({
      appId:
      "959826721453-9ee4bq4h7uvantvbeoj6da3lr91do8oa.apps.googleusercontent.com",
      callback:
      encodeURIComponent(redirectUrl)
    })
      .then(info => {
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
          .postUserData({
            token: info.credentials.id_token,
            authType: "google"
          })
          .then(response => {
            this.props.stop(response);
            console.log("Initial login", JSON.stringify(response.data));
            this._onValueChange(STORAGE_KEY, response.data.jwtToken);
          });

        if (this.props.user.name) {
          this.props.navigation.navigate("HomeScreenContainer");
        }
      })
      .catch(error => {
        this.setState({ user: { error: error } });
      });
  }
  iosSignIn = () => {

    Google.logInAsync({
      iosClientId: '959826721453-spi396f9irfbijrpt46mbfgcknr2cb7o.apps.googleusercontent.com',
    }
      // let redirectUrl = AuthSession.getRedirectUrl();
      // let result = await AuthSession.startAsync({
      //   authUrl:
      //   `https://accounts.google.com/o/oauth2/v2/auth` +
      //   `&client_id=959826721453-9ee4bq4h7uvantvbeoj6da3lr91do8oa.apps.googleusercontent.com` +
      //   `&redirect_uri=${encodeURIComponent(redirectUrl)}`

      //   `${url}?scope=${encodeURIComponent(scope)}&
      // redirect_uri=${encodeURIComponent(callback)}&
      // response_type=${responseType}&
      // client_id=${appId}`.replace(/\s+/g, ''),
    )
      .then(info => {
        console.log(info)
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
          .postUserData({
            token: info.idToken,
            authType: "google"
          })
          .then(response => {
            this.props.stop(response);
            console.log("INITIAL LOGIN", JSON.stringify(response.data));
            this._onValueChange(STORAGE_KEY, response.data.data.jwtToken);
          }).catch(error => {
            console.log('error initial login', error)
          });

        if (this.props.user.name) {
          this.props.navigation.navigate("HomeScreenContainer");
        }
      })
      .catch(error => {
        this.setState({ user: { error: error } });
      });
  }
  render() {
    return (
      <View style={styles.body}>
        {/* <TouchableOpacity>
          <Button
            title="Sign In With Facebook"
            style={{ backgroundColor: "blue" }}
            onPress={() => {
              this.fbSignIn();
            }}
          />
        </TouchableOpacity> */}
        <Image source={require('../../../assets/icons/odycity.png')}
          style={styles.logo}
          fadeDuration={1000} />
        <View style={styles.center}>
          <Button
            onPress={() => {
              this.blank();
            }}
            style={styles.googleButton}>
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
        {/* <TouchableOpacity>
          <Button
            title="Image Picker"
            style={{ backgroundColor: "red" }}
            onPress={() => {
              this.newImage();
            }}
          />
        </TouchableOpacity> */}
        <Button
        onPress={() => {
          this.props.navigation.navigate('ARContainer')
        }}
        >
          <Text>AR</Text>
                 </Button>
      </View>
    );
  }
}
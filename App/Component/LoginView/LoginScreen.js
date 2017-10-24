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
  Text
} from "native-base";
import { SocialIcon } from "react-native-elements";
import {ImagePicker} from "expo";
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage
} from "react-native";

import styles from "./../Styles/LoginScreenStyle";
import { google, facebook, twitter, tumblr } from "react-native-simple-auth";
import Api from "../../Services/Api";
const api = Api.create();

var STORAGE_KEY = "jwtToken";

export default class LoginScreen extends Component {
  newImage() {
    ImagePicker.launchImageLibraryAsync({  }, response => {
      const image = {
        uri: response.uri,
        type: "image/jpeg",
        name: "myImage" + "-" + Date.now() + ".jpg"
      };
      const imgBody = new FormData();
      imgBody.append("image", image);
      // const url = `http://your-api.com/image-upload`;
      // fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: imgBody
      //   })
      api.postUserPhoto({ body: imgBody });
      // .then(res => res.json())
      // .then(results => {
      //   // Just me assigning the image url to be seen in the view
      //   const source = { uri: res.imageUrl, isStatic: true };
      //   const images = this.state.images;
      //   images[index] = source;
      //   this.setState({ images });
      // })
      // .catch(error => {
      //   console.error(error);
      // });
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
    google({
      appId:
      "959826721453-9ee4bq4h7uvantvbeoj6da3lr91do8oa.apps.googleusercontent.com",
      callback:
      "com.googleusercontent.apps.959826721453-9ee4bq4h7uvantvbeoj6da3lr91do8oa:/oauth2redirect"
    })
      .then(info => {
        let obj = {
          id: info.user.id,
          name: info.user.name,
          First_name: info.user.given_name,
          Last_name: info.user.family_name,
          verified: info.user.verified_email,
          email: info.user.email,
          link: info.user.link,
          picture: { data: { url: info.user.picture } }
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
            // console.log(JSON.stringify(response.data));
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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity>
          <Button
            title="Sign In With Facebook"
            style={{ backgroundColor: "blue" }}
            onPress={() => {
              this.fbSignIn();
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Button
            title="Sign In With Google"
            style={{ backgroundColor: "red" }}
            onPress={() => {
              this.googleSignIn();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            title="Sign In With blank"
            style={{ backgroundColor: "red" }}
            onPress={() => {
              this.blank();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            title="Image Picker"
            style={{ backgroundColor: "red" }}
            onPress={() => {
              this.newImage();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            title="AR View"
            style={{ backgroundColor: "red" }}
            onPress={() => {
              this.props.navigation.navigate('ARContainer')
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

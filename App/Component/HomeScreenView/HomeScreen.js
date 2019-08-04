import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage
} from "react-native";
import FooterMenu from "../Footer";
import ProfilePastAdv from "../ProfileView/ProfilePastAdv";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./../Styles/HomeScreenStyle";
import { LinearGradient } from "expo";
import HomeScreenHeader from "./HomeScreenHeader";
import HomeScreenBody from "./HomeScreenBody";

import jwtdecode from "jwt-decode";
import Api from "../../Services/Api";

var STORAGE_KEY = "jwtToken";

const getJWT = async () => {
  try {
    var token = await AsyncStorage.getItem(STORAGE_KEY);
    return token;
  } catch (error) {
    console.log("AsyncStorage error:" + error.message);
  }
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const api = Api.create();

    getJWT().then(jwt => {
      //   // Decode
      const decoded = jwtdecode(jwt);
      console.log("decoded", decoded);
      // HTTP request
      // const api = Api.create();
      api
        .findUserData(decoded.userID)
        .then(Response => {
          console.log("RESPONSE User data", Response);
          this.props.set_Token(Response.data[0].id);
          this.props.set_user({
            id: Response.data[0].id,
            name: this.props.user.name,
            First_name: this.props.user.First_name,
            Last_name: this.props.user.Last_name,
            verified: "True",
            email: this.props.user.email,
            link: this.props.user.link,
            picture: { data: { url: this.props.user.picture.data.url } }
          });
          api.downloadUserPhotos(this.props.user.id).then(photos => {
            console.log("success photos", photos);
            if (photos.data.length) {
              this.props.Update_User_Photos(photos.data);
            }
          });
          this.props.Download_User_Adventures(this.props.user.id);
          this.props.set_Adv_Counter(Response.data[0].advCounter);
          this.props.set_Badges(Response.data[0].badges);
          this.props.set_miles(Response.data[0].miles);
          this.props.set_cities(Response.data[0].cities);
          //Response.data[0].id
        })
        .catch(err => {
          console.log("Error:", err);
        });

      // return decoded.userID;
    });
  }
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
      <Grid style={styles.body}>
        <Row size={12}>
          <HomeScreenHeader
            user={this.props.user}
            navigation={this.props.navigation}
            set_Token={this.props.set_Token}
            token={this.props.token}
            advCounter={this.props.advCounter}
            badges={this.props.badges}
          />
        </Row>
        <Row size={88}>
          {/*  */}
          <HomeScreenBody
            user={this.props.user}
            adventures={this.props.adventures}
            navigation={this.props.navigation}
            downloadedAdventures={this.props.downloadedAdventures}
            Download_Adventures={this.props.Download_Adventures}
            setAdventure={this.props.Set_Adventure}
          />
        </Row>
      </Grid>
      </Image>
    );
  }
}

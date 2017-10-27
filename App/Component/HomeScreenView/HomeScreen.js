import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image, AsyncStorage } from "react-native";
import FooterMenu from "../Footer";
import ProfilePastAdv from "../ProfileView/ProfilePastAdv";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./../Styles/HomeScreenStyle";

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
    let api = Api.create();
    api.downloadUserPhotos(this.props.user.id).then(photos => {
      console.log('success photos', photos);
      this.props.Update_User_Photos(photos.data);
    });
    this.props.Download_User_Adventures(this.props.user.id);
    getJWT().then(jwt => {
      // Decode
      const decoded = jwtdecode(jwt);
      console.log(decoded);
      // HTTP request
      const api = Api.create();
      api.findUserData(decoded.userID).then(Response => {
        console.log('RESPONSE', Response);
        this.props.set_Token(Response.data[0].id);
        this.props.set_Adv_Counter(Response.data[0].advCounter);
        this.props.set_Badges(Response.data[0].badges);
        this.props.set_miles(Response.data[0].miles || 0);
        //Response.data[0].id
      }).then(() => {
        
      }).catch(err => {
        console.error('Error:', err);
      });

      return decoded.userID;
    });
  }
  render() {
    return (
      <Grid>
        <Row size={10}>
          <HomeScreenHeader
            user={this.props.user}
            navigation={this.props.navigation}
            set_Token={this.props.set_Token}
            token={this.props.token}
            advCounter={this.props.advCounter}
            badges={this.props.badges}
          />
        </Row>
        <Row size={90} >
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
    );
  }
}

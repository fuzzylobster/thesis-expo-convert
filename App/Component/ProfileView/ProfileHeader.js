import React, { Component } from "react";
import { Platform, Text, View, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";


import styles from "./../Styles/ProfileHeaderStyle";

export default class ProfileHeader extends Component {
  render() {
    return (
      <Image
        style={styles.profilePic}
        source={{ uri: this.props.user.picture.data.url }}
        resizeMode={"cover"}
      />
    );
  }
}

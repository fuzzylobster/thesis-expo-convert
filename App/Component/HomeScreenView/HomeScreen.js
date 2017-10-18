import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import FooterMenu from "../Footer";
import ProfilePastAdv from "../ProfileView/ProfilePastAdv";
import { Col, Row, Grid } from "react-native-easy-grid";
// import Carousel from "react-native-snap-carousel";
import styles from "./../Styles/HomeScreenStyle";

import HomeScreenHeader from "./HomeScreenHeader";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <HomeScreenHeader user={this.props.user} navigation={this.props.navigation}/>;
  }
}

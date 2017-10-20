import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { Header } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./../Styles/ProfilePastAdvStyle";
import CardImage from "../CardImage";

export default class ProfilePastAdv extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Swiper style={styles.wrapper}>
        {this.props.adventures.map((adventure, i) => (
            <CardImage style={styles.slide} adventure={adventure} user={this.props.user} key={i}/>
        ))}
      </Swiper>
    );
  }
}

{/* <View style={styles.slide} key={i} adventure={adventure}> */}
          // </View >   
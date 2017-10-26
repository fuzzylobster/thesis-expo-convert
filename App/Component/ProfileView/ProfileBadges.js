import React, { Component } from "react";
import { Platform, Text, View, TouchableHighlight } from "react-native";

import styles from "./../Styles/ProfileBadgesStyle";

export default class ProfileBadges extends Component {
  milesTrekked() {
    // let miles = 0;
    // for (var i = 0; i < this.props.adventures; i++) {
    //   miles += this.props.adventures[i].distance;
    // }
    return this.props.miles.toFixed(2);
  }
  cities() {
    // let numCities = [];
    // for (var i = 0; i < this.props.adventures; i++) {
    //   if (numCities.indexOf(this.props.adventures[i].city) === -1) {
    //     numCities.push(this.props.adventures[i].city);
    //   }
    // }
    return this.props.cities.length;
  }
  badges() {
    let badges = this.props.badges;
    // for (var i = 0; i < this.props.adventures; i++) {
    //   for (var j = 0; j < this.props.adventures[i].badges; j++) {
    //     if (numCities.indexOf(this.props.adventures[i].badges[j]) === -1) {
    //       numCities.push(this.props.adventures[i].badges[j]);
    //     }
    //   }
    // }
    return badges.length;
  }
  render() {
    return (
      <View style={[styles.bar, styles.badgeContainer]}>
        <View style={[styles.barItem, styles.barSeparator]}>
          <Text style={styles.barTop}>{this.props.advCounter}</Text>
          {/** Adventures completed*/}
          <Text style={styles.barBottom}>Adventures completed</Text>
        </View>
        <View style={[styles.barItem, styles.barSeparator]}>
          <Text style={styles.barTop}>{this.milesTrekked()}</Text>
          {/** Miles trekked*/}
          <Text style={styles.barBottom}>Miles Trekked</Text>
        </View>
        <View style={[styles.barItem, styles.barSeparator]}>
          <Text style={styles.barTop}>{this.cities()}</Text>
          {/** Cities Conquered*/}
          <Text style={styles.barBottom}>Cities Conquered</Text>
        </View>
        <View style={[styles.barItem, styles.barSeparator]}>

        
          <Text style={styles.barTop}>{this.badges()}</Text>
          {/** Badges Completed*/}
          <Text style={styles.barBottom}>Badges Earned</Text>
        
        </View>
      </View>
    );
  }
}

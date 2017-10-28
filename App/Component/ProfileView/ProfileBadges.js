import React, { Component } from "react";
import { Platform, Text, View, TouchableHighlight } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";


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
      <Grid style={styles.badgeContainer}>
        <Row>
          <Col>
            <View>
              <Text style={styles.text}>{this.props.advCounter} Adventures completed</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <View>
              <Text style={styles.text}>{this.milesTrekked()} Miles Trekked</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text style={styles.text}>{this.cities()} Cities Conquered</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text style={styles.text}>{this.badges()} Badges Earned</Text>
          </Col>
        </Row>
      </Grid>
    );
  }
}

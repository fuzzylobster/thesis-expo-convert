import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import FooterMenu from "../Footer";
import ProfilePastAdv from "../ProfileView/ProfilePastAdv";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./../Styles/HomeScreenStyle";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Grid>
        <Row size={15}>
          <Row size={70}>
            <Col size={22} />
            <Col
              size={56}
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 30
              }}
            >
              <Text>You are signed in as</Text>
              <Text>{this.props.user.name}.</Text>
              <Row style={{ marginTop: 10 }}>
                <Button
                  onPress={() => this.props.navigation.navigate("Profile")}
                  title="Profile"
                  style={{ alignSelf: "center" }}
                />
                <Col size={5} />
                <Button
                  title="MapView"
                  style={{ alignSelf: "center" }}
                  onPress={() =>
                    this.props.navigation.navigate("RoutesContainer")}
                />
              </Row>
            </Col>
            <Col size={22}>
              <View style={styles.profilePicWrap}>
                <Image
                  style={styles.profilePic}
                  source={{ uri: this.props.user.picture.data.url }}
                />
              </View>
            </Col>
          </Row>
        </Row>
        <Row size={10} />
        <Row size={40} />
        <Button
          title="AR View"
          style={{ alignSelf: "center" }}
          onPress={() => {

            this.props.navigation.navigate('ARContainer');
          }
          }
        />
        <Row size={30} />
      </Grid>
    );
  }
}

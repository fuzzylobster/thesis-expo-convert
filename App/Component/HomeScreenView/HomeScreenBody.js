import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button, Card, DeckSwiper, Body, CardItem } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Swiper from "react-native-swiper";
import CardImage from "../CardImage";
import ProfilePastAdv from "../ProfileView/ProfilePastAdv";

const windowWidth = Dimensions.get("window").width;
const gutter = 16;
export const containerPadding = gutter * -2.25;
export const swiperWidth = windowWidth - gutter * 4;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.downloadedAdventures.length) {

    return (
      <Grid>
        <Row style={styles.greetingRow} size={10}>
          <Text style={styles.greetingText}>Welcome, {this.props.user.name}!</Text>
        </Row>
        <Row style={styles.greetingRow} size={5}>
          <Text style={styles.greetingText2}>What adventure should we take today?</Text>
        </Row>
        <Row size={70}>
          <Swiper style={styles.wrapper}>
            {this.props.adventures.map((adventure, i) => ( 
              
                <CardImage 
                height={200} 
                style={styles.slide} 
                adventure={adventure} 
                key={i} 
                user={this.props.user}
                downloadAdventures={this.props.Download_Adventures}
                navigation={this.props.navigation}
                />
              
            ))} 
      </Swiper>
        </Row>
        <Row style={styles.select} size={10}>
          <Button style={styles.selectButton} onPress={() => {
              this.props.navigation.navigate('RoutesContainer')
            }}>
            <Text style={styles.selectText}>I like this one!</Text>
          </Button>
        </Row>
      </Grid>
    );
    } else {
      return (
        <Grid>
          <Row style={styles.greetingRow} size={10}>
            <Text style={styles.greetingText}>Welcome, {this.props.user.name}!</Text>
          </Row>
          <Row style={styles.greetingRow} size={5}>
            <Text style={styles.greetingText2}>Which route do you want to go on?</Text>
          </Row>
          <Row size={70}>
            <Swiper style={styles.wrapper}>
              {this.props.downloadedAdventures.map((adventure, i) => (

                <CardImage
                  height={200}
                  style={styles.slide}
                  downloadedAdventure={adventure}
                  adventure={adventure}
                  key={i}
                  user={this.props.user}
                  setAdventure={this.props.setAdventure}
                  navigation={this.props.navigation}
                />

              ))}
            </Swiper>
          </Row>
          <Row style={styles.select} size={10}>
            <Button style={styles.selectButton} onPress={() => {
              this.props.navigation.navigate('RoutesContainer')
            }}>
              <Text style={styles.selectText}>I like this one!</Text>
            </Button>
          </Row>
        </Grid>
      );
    }
  }
}

const styles = StyleSheet.create({
  greetingRow: {
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  greetingText: {
    fontSize: 25
  },
  greetingText2: {
    fontSize: 15
  },
  cardStyle: {
    width: 75
  },
  cardHeader: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  select: {
    justifyContent: 'space-around'
  },
  selectButton: {
    padding: 10
  },
  selectText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
    wrapper: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // overflow: "visible"
  },
  swiper: {
    overflow: "visible"
  },
  slide: {
    flex: 1,
    position: "relative",
    width: swiperWidth - gutter,
    alignSelf: "center",
    justifyContent: "center"
  },
});
import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

export default class CardImage extends Component {
  constructor(props) {
    super(props);
  }
  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }
  render() {
    return (
      <Container>
        <Content>
          <Card style={styles.card} style={styles.cardWBorder}>
            <CardItem style={styles.card}>
              {/* <Left>
                <Thumbnail source={{ uri: this.props.user.picture.data.url }} /> */}
                <Body style={styles.cardHeader}>
                  <Text style={styles.adventureType}>{this.props.adventure.name}</Text>
                  <Text note>{this.props.adventure.city}</Text>
                </Body>
              {/* </Left> */}
            </CardItem>
            <CardItem cardBody style={styles.card}>
              <Image
                source={{ uri: this.props.adventure.photoURL }}
                style={{ height: 215, width: 215, borderRadius: 107.5, borderWidth: 7, borderColor: "#ACC878" }}
              />
            </CardItem>
            {/* {this.renderIf(
              this.props.adventure.likes,
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>{this.props.adventure.likes} Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>{this.props.adventure.comments} Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            )} */}
            {/* {this.renderIf(
              !this.props.adventure.likes,
              <CardItem>
                <Text>{this.props.adventure.type}</Text>
              </CardItem>
            )} */}
            {this.renderIf(
              !this.props.adventure.likes && !this.props.downloadedAdventure,
              <CardItem style={styles.buttonContainer} style={styles.card}>
                <Button style={styles.selectButton} onPress={() => {
                  if (this.props.adventure.name === "Plot Your Own Path") {
                    this.props.navigation.navigate('RoutesContainer');
                  } else {
                    this.props.downloadAdventures()
                  }
                  }}>
                  <Text style={styles.selectText}>I like this one!</Text>
                </Button>
              </CardItem>
            )}
            
            {this.renderIf(
              this.props.downloadedAdventure,
              <CardItem style={styles.buttonContainer}>
                <Button style={styles.selectButton} onPress={() => {
                  this.props.setAdventure(this.props.downloadedAdventure, this.props.user.id);
                  this.props.navigation.navigate('testContainer')
                
                }}>
                  <Text style={styles.selectText}>Let's Go!</Text>
                </Button>
              </CardItem>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 25,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  cardWBorder: {
    borderColor: "#6CBCBC",
    backgroundColor: "#FFFFFF",
    borderWidth: 15,
    borderRadius: 25
  },
  cardHeader: {
    alignItems: "center",
    justifyContent: "center"
  },
  adventureType: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#6CBCBC"
  },
  buttonContainer: {
    justifyContent: "space-around"
  },
  selectButton: {
    height: 35,
    backgroundColor: "#6CBCBC"
  },
  selectText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});
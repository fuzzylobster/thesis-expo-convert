import React, { Component } from "react";
import { Image } from "react-native";
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
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: this.props.user.picture.data.url }} />
                <Body>
                  <Text>{this.props.adventure.name}</Text>
                  <Text note>{this.props.adventure.city}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: this.props.adventure.cover }}
                style={{ height: 150, width: null, flex: 1 }}
              />
            </CardItem>
            {this.renderIf(
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
            )}
            {this.renderIf(
              !this.props.adventure.likes,
              <CardItem>
                <Text>{this.props.adventure.type}</Text>
              </CardItem>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}
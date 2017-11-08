import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Animation from "./Animation";
export default class CustomCallout extends Component {
  render() {
    console.log(this.props.photo(this.props.mark));
    return (
      <Grid style={{ width: 300, height: undefined, flex: 1 }}>
        <Row style={{ marginBottom: 10 }}>
          <Left style={{ alignItems: "center" }}>
            <Thumbnail source={{ uri: this.props.user.picture.data.url }} />
            <Text>{this.props.mark.venue.name}</Text>
          </Left>
        </Row>
        <Row>
          <Image
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignSelf: "center",
              width: 150,
              height: 150
            }}
            source={{ uri: this.props.photo(this.props.mark) }}
          />
        </Row>
        <Row>
          <Text style={{ marginTop: 10, flexWrap: "wrap" }}>
            {this.props.tip}
          </Text>
        </Row>
      </Grid>
    );
  }
}
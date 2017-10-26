import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  Dimensions,
  PermissionsAndroid
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  FooterTab,
  Item,
  Input,
  Button,
  Label,
  Footer
} from "native-base";
import styles from "./styles";
const TOPICS = ["food", "drinks", "coffee", "shops", "sights", "arts"];
const BottomTopics = ({ onTopicSelect }) => (
  <FooterTab>
    {TOPICS.map(topic => (
      <Button
        onPress={() => onTopicSelect(topic)}
        key={topic}
        styleName="muted"
      >
        <Text>{topic}</Text>
      </Button>
    ))}
  </FooterTab>
);
export { BottomTopics };
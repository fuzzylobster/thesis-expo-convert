import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from "react-native";

import styles from "./../Styles/ProfilePhotosStyle";

export default class ProfilePhotos extends Component {
  constructor(props) {
    super(props);
  }
  _keyExtractor = (item, index) => item.id;

  _camRoll() {
    let combinedPhotos = [];
    this.props.photos.forEach(function(photo) {
      combinedPhotos.push(photo);
    });
    if (combinedPhotos.length < 10) {
      let count = 0;
      while (combinedPhotos.length < 10) {
        combinedPhotos.push(this.props.stockPhotos[count]);
        count++;
      }
    }
    return combinedPhotos;
  }

  _renderItem(item) {
    return (
      <TouchableHighlight
        key={item.id}
        onPress={() => {
          this.props.modalChange(true, item.image);
        }}
      >
        <Image style={styles.item} source={{ uri: item.image }} />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.photoBox}
        horizontal
        renderItem={({ item }) => this._renderItem(item)}
        data={this._camRoll()}
        keyExtractor={({ item }) => this._keyExtractor}
      />
    );
  }
}

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
    this.props.photos.forEach(function(photo, index) {
      combinedPhotos.push(
        {
          image: photo.url,
          key: index
        }
      );
    });
    if (combinedPhotos.length < 10) {
      let count = 0;
      while (combinedPhotos.length < 10) {
        combinedPhotos.push(
          {
            image: this.props.stockPhotos[count].image,
            key: combinedPhotos.length
          }
        );
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
        contentContainerStyle={styles.photoBox}
        horizontal
        renderItem={({ item }) => this._renderItem(item)}
        data={this._camRoll()}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

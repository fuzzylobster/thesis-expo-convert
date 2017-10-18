'use strict';

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import Camera from 'react-native-camera';

export default class ARScreenAndroid extends Component {

  render() {
    let landmarkText = '';
    return (

      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        type={Camera.constants.Type.back}
        aspect={Camera.constants.Aspect.fill}>
        <Text style={styles.capture}>{this.props.currentStop.name}</Text>
        <Button
          title="Collect Badge"
          style={{ alignSelf: "center" }}
          onPress={() => {
            this.props.addBadge(this.props.currentStop.name);
            this.props.navigation.navigate('HomeScreenContainer');
          }
          }
        />

      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    backgroundColor: 'white',

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
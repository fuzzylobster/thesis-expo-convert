import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  Dimensions,
  Button
} from "react-native";

import styles from "../Styles/MapViewStyle";
import MapView from "react-native-maps";
import Expo, {Constants, Location, Permissions} from 'expo'

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapViewer extends Component {
  watchID = null;

  componentWillMount() {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted) {
          // this.watchLocation1();
          this.watchLocation2();
        }
      });
    } else {
      // this.watchLocation1();
      this.watchLocation2();
    }
  }

  watchLocation1() {
    watchId = navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.props.setLocation(initialRegion);
        this.props.setGps(initialRegion);
      },
      error => this.watchLocation1(),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 0.0000000000000001
      }
    );
  }

  watchLocation2() {
    this.watchID = Location.watchPositionAsync({enableHighAccuracy: true, distanceInterval: 0.0000000001},
      position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.props.setLocation(lastRegion);
      this.props.setGps(lastRegion);
    });
  }
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
    this.watchID.remove()
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.props.location}>
          <MapView.Marker coordinate={this.props.waypoint.location} >
            <MapView.Callout>
            <Text>Hey There</Text>
             <Button
              title={this.props.waypoint.name}
              style={{ alignSelf: "center" }}
              onPress={() => {

                this.props.navigation.navigate('ARContainer');
              }
              }
            /> 
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  Dimensions,
  PermissionsAndroid,
  Button
} from "react-native";

import styles from "../Styles/MapViewStyle";
import Expo, {MapView, Constants, Location, Permissions} from 'expo'

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapViewer extends Component {
  watchID = null;
  isInRadius = "Nope not in radius";
  potentialGeofence;
  markerLocation = this.props.waypoint.location;
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
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      Location.setApiKey('AIzaSyCKcl-dg86GzlkBh5HDX-d6MZzThGbHKpA')
      this.watchLocation1();
    }

  //  let location = await Location.getCurrentPositionAsync({});
 //   this.setState({ location });
  }

  watchLocation1() {
    watchId = Location.getCurrentPositionAsync({distanceInterval: 1}).then(
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
    this.watchID = Location.watchPositionAsync({enableHighAccuracy: true, distanceInterval: 1},
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

      this.potentialGeofence = (this.markerLocation.latitude + this.markerLocation.longitude) - (lat + long)
      if (this.potentialGeofence <= 0.015 && this.potentialGeofence >= -0.015) {
        this.isInRadius = "Yep it's in the radius";
      }
    });
  }
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
    this.watchID = null
  }
  render() {
    
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.props.loc}>
          {this.props.markers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.location.lat,
                longitude: marker.location.lng
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
          
        </MapView>
      </View>
    );
  }
}

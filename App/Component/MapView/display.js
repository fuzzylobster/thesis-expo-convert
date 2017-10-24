import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  Text,
  PermissionsAndroid,
  Dimensions
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SocialIcon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";


import styles from "./../Styles/MapViewStyle";
import Polyline from "@mapbox/polyline";
import Expo, { MapView, Constants, Location, Permissions } from 'expo';
import { NavigationActions } from 'react-navigation'

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const test = {};
export default class display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: []
    };
  }

  watchID = null;
  isInRadius = "Nope not in radius";
  potentialGeofence;
  markerLocation = this.props.waypoint.location;
  // componentWillMount() {
  //   if (Platform.OS === "android") {
  //     PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     ).then(granted => {
  //       if (granted) {
  //         // this.watchLocation1();
  //         this.watchLocation2();
  //       }
  //     });
  //   } else {
  //     // this.watchLocation1();
  //     this.watchLocation2();
  //   }
  // }

  

  watchLocation2() {
    this.watchID = Location.watchPositionAsync({ enableHighAccuracy: true, distanceInterval: 1 },
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

        // this.potentialGeofence = (this.markerLocation.lat + this.markerLocation.lng) - (lat + long)
        // if (this.potentialGeofence <= 0.015 && this.potentialGeofence >= -0.015) {
        //   this.isInRadius = "Yep it's in the radius";
        // }
        if (
          (lat <= this.markerLocation.lat + 0.0015 || lat >= this.markerLocation.lat - 0.0015) && 
          (long <= this.markerLocation.lng + 0.0015 || long >= this.markerLocation.lng - 0.0015)) {
          this.isInRadius = "Yep it's in the radius";
          // this.potentialGeofence = `lat: ${lat} lng: ${long} marklat: ${this.markerLocation.lat} marklng: ${this.markerLocation.lng}`
          }
          
        
      });
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
    this.watchLocation2();
    this.getDirections(
      `"${this.props.loc.latitude}, ${this.props.loc.longitude}"`,
      `"${this.props.waypoint.location.lat}, ${this.props.waypoint.location.lng}"`
    );

  }

  componentWillUnmount() {
    this.watchID = null;
    
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords });
      return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }
  render() {
    const initialRegion = {
      latitude: this.props.loc.latitude,
      longitude: this.props.loc.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: LONGITUDE_DELTA
    };
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>

            <MapView.Marker
              coordinate={{
                latitude: this.props.loc.latitude,
                longitude: this.props.loc.longitude
              }}
              title={"This is us"}
              
            />
          

           <MapView.Marker coordinate={{
             latitude: this.props.waypoint.location.lat,
             longitude: this.props.waypoint.location.lng
             
             }} >
            <MapView.Callout>
            <Text>{this.isInRadius}</Text>
            <Text>{this.potentialGeofence}</Text>
            <View>

             <Button
              title={`${this.props.waypoint.name} AR Event`}
              style={{ alignSelf: "center" }}
              onPress={() => {
                  if (this.isInRadius === "Yep it's in the radius") { 
                  let badgeName = this.props.waypoint.name
                  this.props.navigation.navigate('ARContainer', {
                    refresh: () => {
                      this.setState({coords: []})
                      this.getDirections(
                        `"${this.props.loc.latitude}, ${this.props.loc.longitude}"`,
                        `"${this.props.waypoint.location.lat}, ${this.props.waypoint.location.lng}"`);
                        this.render();
                    }
                  })
                } else {
                  this.isInRadius = "Keep looking!"
                } 
              }
              }
            /> 
            </View>
            </MapView.Callout>
          </MapView.Marker>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />

        </MapView>
      </View>
    );
  }
}
// <MapViewer
// changeLocation={this.props.set_location}
// changeGps={this.props.set_gps_marker}
// changeStop={this.props.set_waypoint}
// getLocation={this.props.loc}
// getGps={this.props.gps}
// getStop={this.props.waypoint}
// getRoute={this.props.route}
// markers={this.props.markers}
// />

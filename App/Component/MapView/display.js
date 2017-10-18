import React, { Component } from "react";
import { View, Image, Button, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SocialIcon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import MapViewer from "./MapViewer";
import MapView from "react-native-maps";
import styles from "./../Styles/MapViewStyle";

export default class display extends Component {
  render() {
    const initialRegion = {
      latitude: 29,
      longitude: -90,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.initialRegion}>
          {this.props.markers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng
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

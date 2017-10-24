import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid"

import FooterNav from "../Footer";
import MapViewer from "./MapViewer";
import PlaceSearch from "./PlaceSearch";
import styles from "./../Styles/HomeScreenStyle";

export default class RouteViewer extends Component {
    state = {
      tempAdventure: {
        name: "tempAdventure",
        markerLocations: [

        ]
      }
    }
  render() {
    const { navigate } = this.props.navigation;
    const change = {
      location: this.props.set_location,
      gps: this.props.set_gps_marker,
      stop: this.props.set_waypoint
    };
    const info = {
      route: this.props.route,
      waypoint: this.props.waypoint,
      loc: this.props.loc,
      gps: this.props.gps
    };

    return (
      <Grid >
        <Row size={30}>

        <PlaceSearch
          setMarker={(newMarker) => {
            this.setState({tempAdventure: {name: "tempAdv", markerLocations: this.state.tempAdventure.markerLocations.concat(newMarker)}});
          }}
          markers={this.props.markers}
          setAdventure={() => {
            this.props.set_Adventure(this.state.tempAdventure, true)
          }}
          tempAdventure={this.state.tempAdventure}
          setWaypoint={() => {
            this.props.set_waypoint(this.state.tempAdventure.markerLocations[0]);
          }}
          navigation={this.props.navigation}

        />
        </Row>
        <Row size={70}>

        <MapViewer
          setLocation={this.props.set_location}
          setGps={this.props.set_gps_marker}
          gps={this.props.gps}
          loc={this.props.loc}
          navigation={this.props.navigation}
          waypoint={this.props.waypoint}
          markers={this.state.tempAdventure.markerLocations}
        />
        </Row>
        
      </Grid>
    );
  }
}

// <PlaceSearch
// setMarker={this.props.add_marker}
// markers={this.props.markers}
// navigation={this.props.navigation}
// />

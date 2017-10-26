import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Drawer,
  Input,
  Label
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FooterNav from "../Footer";
import MapViewer from "./MapViewer";
import PlaceSearch from "./PlaceSearch";
import styles from "./../Styles/HomeScreenStyle";
import OdysseyList from "./OdysseyList";
export default class RouteViewer extends Component {
  state = {
    tempAdventure: {
      name: "tempAdventure",
      markerLocations: [],
      cities: [],
      miles: 0,
      tip: "",
      contact: ""
    },
    test: ["test 1", "test 2"]
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  setMarker = (newMarker, city, miles) => {
    // console.log(JSON.stringify(newMarker));
    this.setState({
      tempAdventure: {
        name: "tempAdv",
        markerLocations: this.state.tempAdventure.markerLocations.concat(
          newMarker
        ),
        cities: this.state.tempAdventure.cities.concat(city),
        miles: this.state.tempAdventure.miles + miles
      }
    });
  };
  componentDidMount() {
    console.log(this.state.tempAdventure.markerLocations);
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
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <OdysseyList
            navigation={this.props.navigation}
            setAdventure={() => {
              this.props.set_Adventure(this.state.tempAdventure, true, 1)
              }}
            list={this.state.tempAdventure}
            enableEmptySections={true}
            deleteMarker={newMarker => {
              this.setState({
                tempAdventure: {
                  name: "tempAdv",
                  markerLocations: newMarker,
                  cities: this.state.tempAdventure.cities,
                  miles: this.state.tempAdventure.miles,
                }
              });
            }}
            testDelete={() => {
              this.setState({ test: "it Worked" });
            }}
          />
        }
        onClose={() => this.closeDrawer()}
      >
        <MapViewer
          user={this.props.user}
          setLocation={this.props.set_location}
          setGps={this.props.set_gps_marker}
          gps={this.props.gps}
          loc={this.props.loc}
          markers={this.state.tempAdventure.markerLocations}
          mapRecommendations={this.props.mapRecommendations}
          set_recommendations={this.props.set_recommendations}
          openDrawer={this.openDrawer.bind(this)}
          setMarker={this.setMarker}
          searchBool={this.state.search}

        />
      </Drawer>
    );
  }
}
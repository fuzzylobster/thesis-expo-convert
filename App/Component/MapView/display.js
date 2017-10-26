import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  PermissionsAndroid,
  Dimensions,
  Platform
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SocialIcon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import {ImagePicker} from "expo";
import {
  Container,
  Header,
  Form,
  FooterTab,
  Button,
  Footer,
  Spinner,
  Icon,
  Content
} from "native-base";

import styles from "./../Styles/MapViewStyle";
import Polyline from "@mapbox/polyline";
import Expo, { MapView, Constants, Location, Permissions } from 'expo';
import { NavigationActions } from 'react-navigation'
import { stringify as queryString } from "query-string";


const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const test = {};
export default class display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [],
    };
  }

  newImage() {
    ImagePicker.launchCameraAsync( response => {
      const image = {
        uri: response.uri,
        type: "image/jpeg",
        name: "myImage" + "-" + Date.now() + ".jpg"
      };
      const imgBody = new FormData();
      imgBody.append("image", image);
      api
        .postUserPhoto(imgBody)
        .then(res => {
          const source = { uri: res.imageUrl, isStatic: true };
          console.log(res);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  watchID = null;
  isInRadius;
  isInRadiusText;
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
    }
  }

  

  watchLocation2() {
    this.watchID = Location.watchPositionAsync({ enableHighAccuracy: true, distanceInterval: 5 },
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
        this.onRegionChange(lastRegion, position.coords.accuracy)

        this.getDirections(
          `"${position.coords.latitude}, ${position.coords.longitude}"`,
          `"${this.props.waypoint.location.lat}, ${this.props.waypoint.location.lng}"`
        );
        
      });
  }
  onRegionChange(region, gpsAccuracy) {
    const CLIENT_ID = "NWSH4V1UKUFIVAP2QY15LOMDVIZ5HMY1WAYL31VFECAHNZTN";
    const CLIENT_SECRET = "U2TGSQJK4YYQT1NI25HAKQWW3QMSMEO42AVS0LQ2CU0TPMOH";
    const FOURSQUARE_ENDPOINT = "https://api.foursquare.com/v2/venues/";
    const API_DEBOUNCE_TIME = 2000;
    const VENUE_ID = this.props.waypoint.location.venueID
    let query = queryString({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      v: 20170305,
      ll: `${region.latitude}, ${region.longitude}`,
      llAcc: this.state.gpsAccuracy,
    })
    fetch(`${FOURSQUARE_ENDPOINT}${VENUE_ID}?${query}`)
      .then(fetch.throwErrors)
      .then(res => res.json())
      .then(json => {
        console.log('foursquareQuery:', json.response.venue.location);
        this.potentialGeofence = json.response.venue.location.distance;
        console.log('geofence', this.potentialGeofence)
        if (this.potentialGeofence <= 50) {

        this.isInRadius = true;
        this.isInRadiusText = "In range! Click me to go to the AR Event!"
        } else {
          this.isInRadius = false;
          this.isInRadiusText = "Keep looking!"
        }

      })

    this.setState({
      mapRegion: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    });
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
    this.watchLocation2();
    

  }

  componentWillUnmount() {
    this.watchID = null;
    
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode=walking`
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
      console.log(error);
      // this.getDirections(startLoc, destinationLoc);
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

    if (this.state.coords.length) {

      return (
        <Container>
          <Header></Header>
          <Content contentContainerStyle={styles.container}>

        
          <MapView style={styles.map} initialRegion={this.state.mapRegion}>

              <MapView.Circle
                center={this.props.gps}
                radius={this.state.gpsAccuracy * 1.5}
                strokeWidth={0.5}
                strokeColor="rgba(66, 180, 230, 1)"
                fillColor="rgba(66, 180, 230, 0.2)"
              />

              <MapView.Circle
                center={this.props.gps}
                radius={3}
                strokeWidth={0.5}
                strokeColor="rgba(66, 180, 230, 1)"
                fillColor="rgba(66, 180, 230, 1)"
              />
            
              

              <MapView.Marker coordinate={{
                latitude: this.props.waypoint.location.lat,
                longitude: this.props.waypoint.location.lng
                
                }} 
                image={require('../../../assets/icons/184.png')}
                style={{width: 100, height: 100}}
                >
              <MapView.Callout
                  onPress={() => {
                    if (this.isInRadius === true) {
                      let badgeName = this.props.waypoint.name
                      this.props.navigation.navigate('ARContainer', {
                        refresh: () => {
                          this.setState({ coords: [] })
                          this.getDirections(
                            `"${this.props.loc.latitude}, ${this.props.loc.longitude}"`,
                            `"${this.props.waypoint.location.lat}, ${this.props.waypoint.location.lng}"`);
                          this.render();
                        }
                      })
                    }
                  }
                  }
              >
              <Text>{this.isInRadiusText}</Text>
              <Text>{this.potentialGeofence}</Text>
              

                <Button
                title={' AR Event'}
                style={{ alignSelf: "center" }}
                
              /> 
              
              </MapView.Callout>
            </MapView.Marker>
            <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={2}
              strokeColor="red"
            />

          </MapView>
        
          </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.newImage}>
              <Icon name="camera" />
            </Button>
          </FooterTab>
        </Footer>
        </Container>
          );
    } else {
      this.getDirections(
        `"${this.props.loc.latitude}, ${this.props.loc.longitude}"`,
        `"${this.props.waypoint.location.lat}, ${this.props.waypoint.location.lng}"`
      );
      return (
        <View style={{ flex: 1 }}>
          <Spinner
            visible={this.state.visible}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      );
    }
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

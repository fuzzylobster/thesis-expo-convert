import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  Dimensions,
  PermissionsAndroid
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  FooterTab,
  Item,
  Icon,
  Input,
  Right,
  Button,
  Label,
  Footer,
  Spinner
} from "native-base";
import styles from "./styles";
import { MapView, Location } from "expo";
import RecommendationsMap from "./RecommendationsMap";
import { BottomTopics } from "./Topics";
import { stringify as queryString } from "query-string";
import OdysseyList from "./OdysseyList";
import Animation from "./Animation";

const CLIENT_ID = "NWSH4V1UKUFIVAP2QY15LOMDVIZ5HMY1WAYL31VFECAHNZTN";
const CLIENT_SECRET = "U2TGSQJK4YYQT1NI25HAKQWW3QMSMEO42AVS0LQ2CU0TPMOH";
const FOURSQUARE_ENDPOINT = "https://api.foursquare.com/v2/venues/explore";
const API_DEBOUNCE_TIME = 2000;

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const mapStyle = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      },
      {
        hue: "#0066ff"
      },
      {
        saturation: 74
      },
      {
        lightness: 100
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      },
      {
        weight: 0.6
      },
      {
        saturation: -85
      },
      {
        lightness: 61
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      },
      {
        color: "#5f94ff"
      },
      {
        lightness: 26
      },
      {
        gamma: 5.86
      }
    ]
  }
];

export default class MapViewer extends Component {
  state = {
    mapRegion: null,
    gpsAccuracy: null,
    recommendations: [],
    loc: {}
  };
  watchID = null;

  componentWillMount() {
    this.watchID = Location.watchPositionAsync(
      { enableHighAccuracy: true, distanceInterval: 1 },
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };

        let loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };
        this.setState({ gps: loc });

        this.onRegionChange(region, position.coords.accuracy);
      }
    );
  }

  componentWillUnmount() {
    this.watchID = null;
  }

  onRegionChange(region, gpsAccuracy) {
    if (this.lookingFor) {
      this.fetchVenues(region);
    }

    this.setState({
      mapRegion: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    });
  }

  fetchVenues(region, lookingFor) {
    if (!this.shouldFetchVenues(lookingFor)) return;
    if (lookingFor) {
      const query = this.venuesQuery(region, lookingFor);

      fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
        .then(fetch.throwErrors)
        .then(res => res.json())
        .then(json => {
          if (json.response.groups) {
            // console.log(json.response.groups);
            this.setState({
              recommendations: json.response.groups.reduce(
                (all, g) => all.concat(g ? g.items : []),
                []
              ),
              headerLocation: json.response.headerLocation,
              last4sqCall: new Date()
            });
            this.props.set_recommendations(this.state.recommendations);
            // console.log(this.state.recommendations);
          }
          // console.log(this.props.mapRecommendations);
          this.setState({ lookingFor: null });
        })
        .catch(err => console.log(err));
    }
  }

  shouldFetchVenues(lookingFor) {
    return (
      lookingFor != this.state.lookingFor ||
      this.state.last4sqCall === null ||
      new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME
    );
  }

  venuesQuery({ latitude, longitude }, lookingFor) {
    return queryString({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      v: 20170305,
      ll: `${latitude}, ${longitude}`,
      llAcc: this.state.gpsAccuracy,
      section: lookingFor || this.state.lookingFor || "food",
      limit: 10,
      openNow: 1,
      venuePhotos: 1
    });
  }

  onTopicSelect(lookingFor) {
    this.fetchVenues(this.state.mapRegion, lookingFor);

    this.setState({
      lookingFor: lookingFor
    });
  }

  render() {
    const { mapRegion, lookingFor } = this.state;

    if (mapRegion) {
      return (
        <Container>
          <Header>
            <Right>
              <Button transparent onPress={() => this.props.openDrawer()}>
                <Icon name="menu" />
              </Button>
            </Right>
          </Header>

          <RecommendationsMap
            {...this.state}
            onRegionChange={this.onRegionChange.bind(this)}
            user={this.props.user}
            setMarker={this.props.setMarker}
          />

          <Footer>
            {<BottomTopics onTopicSelect={this.onTopicSelect.bind(this)} />}
          </Footer>
        </Container>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Animation />
        </View>
      );
    }
  }
}

// <FooterTab>
// <Button>
//   <Text>Food</Text>
// </Button>
// <Button>
//   <Text>Drinks</Text>
// </Button>
// <Button active>
//   <Text>Shops</Text>
// </Button>
// <Button>
//   <Text>Coffee</Text>
// </Button>
// <Button active>
//   <Text>Sights</Text>
// </Button>
// <Button>
//   <Text>Events</Text>
// </Button>
// </FooterTab>

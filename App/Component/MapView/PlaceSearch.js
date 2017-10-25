import React, { Component } from "react";
import { View, Image, Button, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SocialIcon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class PlaceSearch extends Component {
  render() {
    return (
      <View>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.props.setMarker({
              name: details.formatted_address,
              location: details.geometry.location
            }, details.address_components[3].short_name, 100);
            console.log(data, details);
          }}
          getDefaultValue={() => ""}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyCcfSlaeZ2qVUAx9ljITvFZtePzABBCChs",
            language: "en" // language of the results,
            //types: "(establishment)" // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: "100%"
            },
            description: {
              fontWeight: "bold"
            },
            predefinedPlacesDescription: {
              color: "#1faadb"
            }
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance",
            types: "food"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "establishment"
            // "administrative_area_level_3"
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          //predefinedPlaces={[this.homePlace, this.workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={() => (
            <Button
              title="Default adventure"
              onPress={() => {
                this.props.navigation.navigate('testContainer');
                {/* this.props.setAdventure(); */}
              }}
            />
          )}
          renderRightButton={() => (
            <Button
              title="Let's go!"
              onPress={() => {
                if (!this.props.tempAdventure.markerLocations.length) {
                  alert("You haven't made any stops yet!")
                } else {
                  
                  this.props.setAdventure();
                  {/* this.props.setWaypoint(); */}
                  this.props.navigation.navigate("testContainer");
                }
              }}
            />
          )}
        />
      </View>
    );
  }
}

import React, { Component } from "react";

import MapView from "react-native-maps";
//import { Card, Image, View, Subtitle, Text, Caption } from '@shoutem/ui';

class Recommendation extends Component {
  // get photo() {
  //     const photo = this.props.venue.photos.groups[0].items[0];

  //     return `${photo.prefix}300x500${photo.suffix}`;
  // }

  render() {
    const { venue, tips } = this.props;

    return (
      <MapView.Marker
        coordinate={{
          latitude: venue.location.lat,
          longitude: venue.location.lng
        }}
      />
    );
  }
}

export default Recommendation;

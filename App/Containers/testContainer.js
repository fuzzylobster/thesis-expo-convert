import { connect } from "react-redux";
import {
  Current_adventure,
  Current_location,
  Current_Stop,
  Gps_Marker,
  Marker_locations,
  leg_Distance
} from "../redux/actions";
import display from "../Component/MapView/display";

const mapStateToProps = state => {
  return {
    route: state.people.adventure,
    loc: state.people.location,
    waypoint: state.people.CurrentStop,
    gps: state.people.gps,
    markers: state.people.adventure.markerLocations,
    userID: state.people.user.id,
    RouteID: state.people.RouteID,
    LegDistance: state.people.LegDistance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLocation: loc => {
      dispatch(Current_location(loc));
    },

    set_waypoint: loc => {
      dispatch(Current_Stop(loc));
    },

    set_Adventure: loc => {
      dispatch(Current_adventure(loc));
    },

    setGps: gps => {
      dispatch(Gps_Marker(gps));
    },
    add_marker: gps => {
      dispatch(Marker_locations(gps));
    },
    leg_Distance: distance => {
      dispatch(leg_Distance(distance))
    }
  };
};

const testContainer = connect(mapStateToProps, mapDispatchToProps)(display);

export default testContainer;

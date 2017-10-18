import { connect } from "react-redux";
import {
  Current_adventure,
  Current_location,
  Current_Stop,
  Gps_Marker,
  Marker_locations
} from "../redux/actions";
import display from "../Component/MapView/display";

const mapStateToProps = state => {
  return {
    route: state.people.adventure,
    loc: state.people.location,
    waypoint: state.people.CurrentStop,
    gps: state.people.gps,
    markers: state.people.markerLocations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_location: loc => {
      dispatch(Current_location(loc));
    },

    set_waypoint: loc => {
      dispatch(Current_Stop(loc));
    },

    set_Adventure: loc => {
      dispatch(Current_adventure(loc));
    },

    set_gps_marker: gps => {
      dispatch(Gps_Marker(gps));
    },
    add_marker: gps => {
      dispatch(Marker_locations(gps));
    }
  };
};

const testContainer = connect(mapStateToProps, mapDispatchToProps)(display);

export default testContainer;

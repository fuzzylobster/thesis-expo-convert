import { connect } from "react-redux";
import { Add_Badge, Current_Stop, Current_adventure } from "../redux/actions";
import { Platform } from 'react-native';
import ARScreen from "../Component/ARView/ARScreen";
// import ARScreenAndroid from '../Component/ARView/ARScreenAndroid'

const mapStateToProps = state => {
  return { 
    currentStop: state.people.CurrentStop,
    hasCameraPermission: true,
    currentStopIndex: state.people.CurrentStopIndex,
    currentRoute: state.people.adventure.markerLocations
  };
};

const mapDispatchToProps = dispatch => {

  return {
    addBadge: badge => {
      dispatch(Add_Badge(badge));
      // const api = Api.create();
      // api.updateProfileData({
      //   badges: state.people.badges
      // });
    },
    updateStop: (route, nextIndex) => {
      
        dispatch(Current_Stop(route[nextIndex]))
      
    },
    endRoute: () => {
      dispatch(Current_adventure({}))
    }
  };
};

let ARContainer;
if (Platform.OS === 'android') {
  ARContainer = connect(mapStateToProps, mapDispatchToProps)(
    ARScreenAndroid
  );
} else {
  ARContainer = connect(mapStateToProps, mapDispatchToProps)(
    ARScreen
  );
}

export default ARContainer;
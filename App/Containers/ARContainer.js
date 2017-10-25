import { connect } from "react-redux";
import { Add_Badge, Current_Stop, Current_adventure } from "../redux/actions";
import { Platform } from 'react-native';
import ARScreen from "../Component/ARView/ARScreen";
import Api from "../Services/Api"
// import ARScreenAndroid from '../Component/ARView/ARScreenAndroid'

const mapStateToProps = state => {
  return { 
    currentStop: state.people.CurrentStop,
    hasCameraPermission: true,
    currentStopIndex: state.people.CurrentStopIndex,
    currentRoute: state.people.adventure.markerLocations,
    currentBadges: state.people.badges,
    advCount: state.people.AdvCounter,
    miles: state.people.miles,
    routeDistance: state.people.adventure.miles
  };
};

const mapDispatchToProps = dispatch => {

  return {
    addBadge: (badge) => {
      dispatch(Add_Badge(badge));
      // const api = Api.create();
      // api.updateProfileData({
      //   badges: state.people.badges
      // });
      
    },
    updateBadges: (badges) => {
      let api = Api.create();
      api.addBadge(badges);
    },
    updateStop: (route, nextIndex) => {
      
        dispatch(Current_Stop(route[nextIndex]))
      
    },
    updateMiles: (miles) => {
      let api = Api.create();
      api.updateMiles(miles);
    },
    endRoute: (newAdvCount) => {
      let api = Api.create();
      api.endRoute(newAdvCount);
      

      
    }
  };
};

let ARContainer;

  ARContainer = connect(mapStateToProps, mapDispatchToProps)(
    ARScreen
  );


export default ARContainer;
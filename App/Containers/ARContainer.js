import { connect } from "react-redux";
import { Add_Badge, Current_Stop, Current_adventure, Set_Adv_Counter, Set_miles, Download_Adventures } from "../redux/actions";
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
    routeDistance: state.people.adventure.miles,
    userPicUrl: state.people.user.picture.data.url,
    user: state.people.user,
    LegDistance: state.people.LegDistance
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
    updateBadges: (badges, userID) => {
      console.log('updating profile badges', badges);
      let api = Api.create();
      api.addBadge(badges, userID);
    },
    updateStop: (route, nextIndex) => {
      
        dispatch(Current_Stop(route[nextIndex]))
      
    },
    updateMiles: (newMiles, oldMiles, userID) => {
      console.log('trying to update miles', newMiles, oldMiles)
      let combinedMiles = newMiles + oldMiles;
      let api = Api.create();
      api.updateMiles(combinedMiles, userID);
      dispatch(Set_miles(combinedMiles))
    },
    endRoute: (newAdvCount, userID) => {
      let api = Api.create();
      api.endRoute(newAdvCount, userID);
      dispatch(Download_Adventures([]));
      dispatch(Set_Adv_Counter(newAdvCount));
      

      
    }
  };
};

let ARContainer;

  ARContainer = connect(mapStateToProps, mapDispatchToProps)(
    ARScreen
  );


export default ARContainer;
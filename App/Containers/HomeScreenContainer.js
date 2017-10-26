import { connect } from "react-redux";
import { Select_user, Token, Set_Adv_Counter, Set_Badges, Set_miles, Download_Adventures, Current_adventure } from "../redux/actions";
import HomeScreen from "../Component/HomeScreenView/HomeScreen";
import Api from "../Services/Api"

const mapStateToProps = state => {
  return { 
    user: state.people.user, 
    token: state.people.CurrentStop, 
    adventures: state.people.adventureType, 
    token: state.people.token,
    advCounter: state.people.AdvCounter,
    badges: state.people.badges,
    downloadedAdventures: state.people.downloadedAdventures
   };
};

const mapDispatchToProps = dispatch => {
  return {
    set_Token: token => {
      dispatch(Token(token));
    },
    set_Adv_Counter: advCounter => {
      dispatch(Set_Adv_Counter(advCounter));
    },
    set_Badges: badges => {
      dispatch(Set_Badges(badges));
    },
    set_miles: miles => {
      dispatch(Set_miles(miles));
    },
    Download_Adventures: () => {
      const api = Api.create();
      adventures = api.downloadAdventures().then(adventures => {
        console.log(adventures);

      dispatch(Download_Adventures(adventures))
      })
    },
    Set_Adventure: (adventure) => {
      const newAdventure = {
        name: adventure.name,
        markerLocations: adventure.locs,
        cities: adventure.cities
      }
      dispatch(Current_adventure(newAdventure))
    }
  };
};

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(
  HomeScreen
);

export default HomeScreenContainer;

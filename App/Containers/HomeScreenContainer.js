import { connect } from "react-redux";
import { Select_user, 
  Token, 
  Set_Adv_Counter, 
  Set_Badges,
   Set_miles,
    Download_Adventures,
     Current_adventure,
    Update_User_Photos,
  Update_Past_Adventures,
  Set_cities 
} from "../redux/actions";
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
    set_cities: (cities) => {
      dispatch(Set_cities(cities));
    },
    Download_Adventures: () => {
      const api = Api.create();
      api.downloadAdventures().then(response => {
        console.log('adventures',adventures);
        let adventures = response.data.data;
        dispatch(Download_Adventures(adventures))
      })
    },
    Download_User_Adventures: (userID) => {
      const api = Api.create();
      api.downloadUserAdventures(userID).then(response => {
        let userAdventures = response.data.data
        console.log('user adventures', userAdventures);
        dispatch(Update_Past_Adventures(userAdventures))
      })
    },
    Set_Adventure: (adventure, userID) => {
      const newAdventure = {
        name: adventure.name,
        markerLocations: adventure.locs,
        cities: adventure.cities
      }
      const api = Api.create();
      api.saveCities(adventure.cities, userID);
      dispatch(Current_adventure(newAdventure))
    },
    Update_User_Photos: (photos) => {
      dispatch(Update_User_Photos(photos));
    },
    set_user: (user) => {
      dispatch(Select_user(user));
    }
  };
};

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(
  HomeScreen
);

export default HomeScreenContainer;

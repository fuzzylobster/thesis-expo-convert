import { connect } from "react-redux";
import { Select_user, Token, Set_Adv_Counter, Set_Badges, Set_miles } from "../redux/actions";
import HomeScreen from "../Component/HomeScreenView/HomeScreen";

const mapStateToProps = state => {
  return { 
    user: state.people.user, 
    token: state.people.CurrentStop, 
    adventures: state.people.adventureType, 
    token: state.people.token,
    advCounter: state.people.AdvCounter,
    badges: state.people.badges
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
    }
  };
};

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(
  HomeScreen
);

export default HomeScreenContainer;

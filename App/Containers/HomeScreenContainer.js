import { connect } from "react-redux";
import { Select_user } from "../redux/actions";
import HomeScreen from "../Component/HomeScreenView/HomeScreen";

const mapStateToProps = state => {
  return { user: state.people.user, token: state.people.CurrentStop, adventures: state.people.adventureType, adventure: state.people.adventure };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(
  HomeScreen
);

export default HomeScreenContainer;

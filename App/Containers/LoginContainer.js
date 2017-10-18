import { connect } from "react-redux";
import { Select_user } from "../redux/actions";
import LoginScreen from "../Component/LoginView/LoginScreen";

const mapStateToProps = state => {
  return { user: state.people.user };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => {
      dispatch(Select_user(user));
    }
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(
  LoginScreen
);

export default LoginContainer;

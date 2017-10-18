import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";

// Styles
import styles from "./Styles/RootContainerstyles";

class RootContainer extends Component {
  render() {
    return (
      <View style={styles.applicationView}>
        {/* <StatusBar barStyle='light-content' /> */}
        <Nav user={this.props.user} />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapStateToProps = state => ({ user: state.people.user });
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

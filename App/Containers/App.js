import React, { Component } from "react";
import { Provider } from "react-redux";
import RootContainer from "./RootContainer";
import configureStore from "../redux/createStore";

// create our store
export const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

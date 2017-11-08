import React, { Component } from "react";
import { Provider } from "react-redux";
import RootContainer from "./RootContainer";
import configureStore from "../redux/createStore";
import {AppLoading, Asset, Font} from 'expo'


// create our store
export const store = configureStore();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      
      require('../../assets/icons/app-icon.png'),
      
    ]);

    const fontAssets = cacheFonts([{Roboto_medium: require('./Styles/Roboto-Medium.ttf')}]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
  
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

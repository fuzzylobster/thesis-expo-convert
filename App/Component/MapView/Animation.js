import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing
} from "react-native";
export default class Animation extends Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.spin();
  }
  //   componentWillUnMount() {
  //     Animated.timing(this.spinValue).stop();
  //   }
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start(() => this.spin());
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <View style={styles.container}>
        <Image
          style={{
            flex: 1
          }}
          source={require("../../../assets/icons/30b.png")}
          resizeMode={"center"}
          style={{
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <View>
            <Animated.Image
              style={{
                width: 150,
                height: 150,
                transform: [{ rotate: spin }]
              }}
              source={require("../../../assets/icons/20.png")}
            />
          </View>
        </Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

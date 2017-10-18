import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableHighlight
 } from 'react-native';
import Expo, { Camera, Permissions, Accelerometer, Gyroscope, BlurView, Modal } from 'expo';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Api from "../../Services/Api";

console.disableYellowBox = true;

export default class ARScreen extends React.Component {
  state = {
    hasCameraPermission: true,
    clicked: false
  }

  componentWillMount() {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: true});
    

    // this.material = new THREE.MeshBasicMaterial({ 
    //   map: await ExpoTHREE.createTextureAsync({
    //     asset: Expo.Asset.fromModule(require('../../assets/icons/morpheus.jpg')),
    //   })
    // });
    
    const panGrant = (_, gestureState) => {
      // this.material.color.setHex(0x00ff00);
    };
    const panRelease = (_, gestureState) => {
      // this.material.color.setHex(0xff0000);
      this.props.addBadge(this.props.currentStop.name);
      if (this.props.currentStopIndex === this.props.currentRoute.length - 1){
        this.props.endRoute();
        this.props.navigation.navigate("HomeScreenContainer");
      } else {
        this.props.updateStop(this.props.currentRoute, this.props.currentStopIndex + 1);
        this.props.navigation.navigate("RoutesContainer");
      }
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: panGrant,
      onPanResponderRelease: panRelease,
      onPanResponderTerminate: panRelease,
      onShouldBlockNativeResponder: () => false,
    });
  }

  // componentDidMount() {
  //   this._toggle();

  // }

  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  // _toggle = () => {
  //   if (this._subscription) {
  //     this._unsubscribe();
  //   } else {
  //     this._subscribe();

  //   }
  // }

  // _slow = () => {
  //   Accelerometer.setUpdateInterval(1000);
  //   Gyroscope.setUpdateInterval(1000);

  // }

  // _fast = () => {
  //   Accelerometer.setUpdateInterval(16);
  //   Gyroscope.setUpdateInterval(16);

  // }

  // _subscribe = () => {
  //   this._subscriptionA = Accelerometer.addListener((result) => {
  //     this.setState({ AccelerometerData: result });
  //   });
  //   this._subscriptionB = Gyroscope.addListener((result) => {
  //     this.setState({ GyroscopeData: result });
  //   });
  // }

  // _unsubscribe = () => {
  //   this._subscription && this._subscription.remove();
  //   this._subscription = null;
  // }

  render() {
    const { hasCameraPermission } = this.state;

    // let { x: Ax, y: Ay, z: Az } = this.state.AccelerometerData;
    // let { x: Gx, y: Gy, z: Gz } = this.state.GyroscopeData;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (

        // <View style={styles.sensor}>
        //   <Text>Accelerometer:</Text>
        //   <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
        // </View>

        /* <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View> */
        <View style={{ flex: 1 }}>
          
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
            
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
            
            <Expo.GLView
                {...this.panResponder.panHandlers}
                ref={(ref) => this._glView = ref}
                style={{
                  flex: 1, backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}
                onContextCreate={this._onGLContextCreate} 
              />
            
              
            
            </View>
            
          </Camera>
        </View>

      );
    }
  }
  
  

  _onGLContextCreate = async (gl) => {
    const arSession = await this._glView.startARSessionAsync();
    const scene = new THREE.Scene();
    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    )
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
    //simple box
    const geometry = new THREE.BoxBufferGeometry(0.07, 0.07, 0.07);
    const material = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../../assets/icons/vr.jpg')),
      })
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = -0.4;
    scene.add(cube);
    
    // CUSTOM SHAPE, in progress.
    // var geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //   new THREE.Vector3(0, -10, -1),
    //   new THREE.Vector3(-10, 10, 0),
    //   new THREE.Vector3(-5, 8, 0.5),
    //   new THREE.Vector3(0, 10, 1),
    //   new THREE.Vector3(5, 8, 0.5),
    //   new THREE.Vector3(10, 10, 0),
    //   new THREE.Vector3(0, -10, -1)      
    // )
    // geometry.faces.push(
    //   new THREE.Face3(0, 1, 2);
    // )
    // var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.z = -3;
    // scene.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.02;
      // cube.position.x = round(this.state.AccelerometerData.x) - firstPosition.x;
      // cube.position.y = round(this.state.AccelerometerData.y) - firstPosition.y;
      // cube.position.z = firstPosition.z + round(this.state.AccelerometerData.z) ;
      // cube.position.set(
      //   -this.state.AccelerometerData.x, 
      //   -this.state.AccelerometerData.y,
      //   -this.state.AccelerometerData.z - 5 
      // )
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
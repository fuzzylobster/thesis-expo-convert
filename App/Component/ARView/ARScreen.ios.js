import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableHighlight
 } from 'react-native';
import Expo, { Camera, Permissions, BlurView, Modal } from 'expo';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Api from "../../Services/Api";

console.disableYellowBox = true;

export default class ARScreen extends React.Component {
  state = {
    hasCameraPermission: true,
    clicked: false
  }
  firstView() {
    if (true) {

    return (
    <Expo.GLView
      {...this.panResponder.panHandlers}
      ref={(ref) => this._glView = ref}
      style={{
        flex: 1, backgroundColor: 'transparent',
        flexDirection: 'row',
      }}
      onContextCreate={this._onGLContextCreate}
    />
    )
    }
  }
  componentWillMount() {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: 'granted'});
    // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const panGrant = (_, gestureState) => {
      // this.material.color.setHex(0x00ff00);
      this.props.addBadge(this.props.currentStop.name);
        this.props.updateStop(this.props.currentRoute, this.props.currentStopIndex + 1);
        
    };
    const panRelease = (_, gestureState) => {
      // this.material.color.setHex(0xff0000);
      if (this.props.currentStopIndex === this.props.currentRoute.length){
        alert(`Congratulations! You've finished the route and earned ${this.props.currentRoute.length} badges along the way.`)
        this.props.endRoute();
        this.props.navigation.navigate("HomeScreenContainer");
      } else {
        this.props.navigation.state.params.refresh();
      alert(`You've added the ${this.props.currentRoute[this.props.currentStopIndex - 1].name} badge!
        ${this.props.currentRoute.length - (this.props.currentStopIndex) } more left for this adventure!
      `)
        this.props.navigation.goBack();
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

  componentWillUnmount() {
    this.setState({
      hasCameraPermission: false
    })
    // this.panResponder = null;
  }

  render() {
    const { hasCameraPermission } = this.state;
    
    
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (

        
        <View style={{ flex: 1 }}>
          
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
            
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
            
            {this.firstView()}
            
              
            
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
    cube.position.z = Math.random() * -3;
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
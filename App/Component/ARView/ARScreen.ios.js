import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableHighlight
 } from 'react-native';
import Expo, { Permissions, BlurView, Modal } from 'expo';
import {NavigationActions} from 'react-navigation';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Api from "../../Services/Api";
import YellowBox from 'react-native/Libraries/ReactNative/YellowBox';
YellowBox.ignoreWarnings(['THREE', "ExpoTHREE"]);

console.disableYellowBox = true;

export default class ARScreen extends React.Component {
  state = {
    hasCameraPermission: true,
    clicked: false,
    yPosition: 0,
    xPosition: 0
  }

  routeIsComplete = false;

  componentWillMount() {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ 
      hasCameraPermission: 'granted',
      yPosition: 0,
      xPosition: 0
    });

    const panGrant = (_, gestureState) => {
      // this.material.color.setHex(0x00ff00);
    };
    const panRelease = (_, gestureState) => {
      // this.material.color.setHex(0xff0000);
      
    if(this.state.yPosition >= -0.95 && this.state.yPosition <= -0.7) {
      if (this.props.currentStopIndex === this.props.currentRoute.length - 1) {
        this.routeIsComplete = true;
        this.props.addBadge(this.props.currentStop.name);
        this.props.updateBadges(this.props.currentBadges.concat(this.props.currentStop.name), this.props.user.id);
        this.props.updateMiles(Math.round((this.props.LegDistance / 1609) * 1e2) / 1e2, this.props.miles, this.props.user.id);
      } else {
        this.props.addBadge(this.props.currentStop.name);
        this.props.updateBadges(this.props.currentBadges.concat(this.props.currentStop.name), this.props.user.id);
        this.props.updateMiles(Math.round((this.props.LegDistance / 1609) * 1e2) / 1e2, this.props.miles, this.props.user.id);
        this.props.updateStop(this.props.currentRoute, this.props.currentStopIndex + 1);
      } 
      
      if (this.routeIsComplete){
        alert(`Congratulations! You've finished the route and earned ${this.props.currentRoute.length} badges along the way.`)
        
        this.props.endRoute(this.props.advCount + 1, this.props.user.id);
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'HomeScreenContainer'})
          ]
        }));
        
      } else {
        this.props.navigation.state.params.refresh();
        alert(`You've added the ${this.props.currentRoute[this.props.currentStopIndex].name} badge!
          ${this.props.currentRoute.length - (this.props.currentStopIndex + 1) } more left for this adventure!
        `)
        this.props.navigation.goBack();
      }
    } else {
      this.setState({
        hasCameraPermission: true,
        yPosition: 0,
        xPosition: this.randomXPosition
      })
    }
    };
    const panMove = (_, gestureState) => {
      
        this.setState({
          hasCameraPermission: true,
          yPosition: -gestureState.dy / 250, 
          xPosition: this.state.xPosition,
          containerMaterial: this.state.containerMaterial 
        })
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: panGrant,
      onPanResponderRelease: panRelease,
      onPanResponderTerminate: panRelease,
      onPanResponderMove: panMove,
      onShouldBlockNativeResponder: () => false,
    });
  }

  componentWillUnmount() {
    this.setState({
      hasCameraPermission: false
    })
    this.panResponder = null;
  }

  render() {
    const { hasCameraPermission } = this.state;
    
    
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View
          style={{
            flex: 1, backgroundColor: 'transparent',
            flexDirection: 'column',
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
      100
    )
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

    const geometry = new THREE.BoxBufferGeometry(0.07, 0.07, 0.07);

    this.material = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../../assets/icons/2017-Scavenger-Hunt-from-Clickin-Moms.jpg')),
      })
    });
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
      color: 0x000000
    }))
    const cube = new THREE.Mesh(geometry, this.material);

    let forwardBack = [-5, 5];
    let leftRight = [-3, 3];
    let randomZPosition = Math.random() * forwardBack[Math.floor(Math.random() * 2)]
    if (randomZPosition < 0) {
      this.reverseX = true;
    } else {
      this.reverseX = false;
    }
    cube.position.z = randomZPosition;
    line.position.z = randomZPosition;
    this.randomXPosition = Math.random() * leftRight[Math.floor(Math.random() * 2)]
    cube.position.x = this.randomXPosition;
    line.position.x = this.randomXPosition;
    
    
    
    scene.add(cube);
    scene.add(line);
    
    const container = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
 
    const containerMaterial = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../../assets/icons/184.png'))
      })
    })
    this.setState({
      hasCameraPermission: true,
      yPosition: 0,
      xPosition: this.randomXPosition,
      containerMaterial: containerMaterial
    })
    const containerMesh = new THREE.Mesh(container, containerMaterial);
    containerMesh.position.z = randomZPosition;
    containerMesh.position.x = this.randomXPosition;
    containerMesh.position.y = cube.position.y -0.75;
    scene.add(containerMesh);

    var dir = new THREE.Vector3(0, -0.5, 0);

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = new THREE.Vector3(0, 0, 0);
    var length = 0.4;
    var hex = 0xffff00;

    var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex, 0.1, 0.05);
    arrowHelper.position.z = randomZPosition;
    arrowHelper.position.x = this.randomXPosition;
    arrowHelper.position.y = cube.position.y - 0.25
    scene.add(arrowHelper);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.02;
      line.rotation.y += 0.02;

      cube.position.y = this.state.yPosition;
      line.position.y = this.state.yPosition;
      cube.position.x = this.state.xPosition;
      line.position.x = this.state.xPosition;
      
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
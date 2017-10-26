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
    yPosition = 0;
    xPosition = 0;
  componentWillMount() {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: 'granted',
  yPosition: 0,
xPosition: 0});
    // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const panGrant = (_, gestureState) => {
      // this.material.color.setHex(0x00ff00);
    
    };
    const panRelease = (_, gestureState) => {
      // this.material.color.setHex(0xff0000);
      
    if(this.state.yPosition >= -0.95 && this.state.yPosition <= -0.7) {
      if (this.props.currentStopIndex === this.props.currentRoute.length - 1) {
        this.routeIsComplete = true;
        this.props.addBadge(this.props.currentStop.name);
        this.props.updateBadges(this.props.currentBadges.concat(this.props.currentStop.name));
      } else {
      this.props.addBadge(this.props.currentStop.name);
      this.props.updateBadges(this.props.currentBadges.concat(this.props.currentStop.name));
      

        this.props.updateStop(this.props.currentRoute, this.props.currentStopIndex + 1);
      } 
      
      if (this.routeIsComplete){
        alert(`Congratulations! You've finished the route and earned ${this.props.currentRoute.length} badges along the way.`)
        
        this.props.updateMiles(this.props.routeDistance / 1609);
        this.props.endRoute(this.props.advCount + 1);
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
        xPosition: 0
      })
    }
    };
    const panMove = (_, gestureState) => {
      if (this.state.yPosition >= -0.95 && this.state.yPosition <= -0.7) {
        this.setState({
          hasCameraPermission: true,
          yPosition: -gestureState.dy / 200,
          xPosition: gestureState.dx / 250,
          containerMaterial:  this.material
        })
      } else {
      this.setState({
        hasCameraPermission: true,
        yPosition: -gestureState.dy / 200, 
      xPosition: gestureState.dx / 250,
      containerMaterial: this.state.containerMaterial 
      
    })

      }
      
      
      // this.xPosition = gestureState.x0;
    }
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
            {/* <Text>{this.state.yPosition}</Text> */}

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
    //simple box
    // var x = camera.position.x, y = camera.position.y;

    // var heartShape = new THREE.Shape();

    // heartShape.moveTo(x + 5, y + 5);
    // heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    // heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    // heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    // heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    // heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    // heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    // var geometry = new THREE.ShapeGeometry(heartShape);
    const geometry = new THREE.BoxBufferGeometry(0.07, 0.07, 0.07);
  // const geometry = new THREE.TorusGeometry(2, 1, 4, 6);
  // const geometry = new THREE.RingGeometry()
  
    // const material = new THREE.MeshBasicMaterial({
      // color: 0xffff00
    // })
    this.material = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../../assets/icons/2017-Scavenger-Hunt-from-Clickin-Moms.jpg')),
      })
    });
    // const edges = new THREE.EdgesGeometry(geometry);
    // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    //   color: 0x000000
    // }))
    const cube = new THREE.Mesh(geometry, this.material);
    // line.position.z = -1;
    
    
    // this.yPosition = line.position.y;
    let forwardBack = [-5, 5]
    let randomPosition = Math.random() * forwardBack[Math.floor(Math.random() * 2)]
    cube.position.z = randomPosition;
    // cube.position.y = -1;
    
    
    
    // scene.add(line);
    scene.add(cube);
    
    const container = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
    // var loader = new THREE.CubeTextureLoader();
    // loader.setPath('../../../assets/icons/');

    // var textureCube = loader.load([
    //   'crate.gif', 'crate.gif',
    //   'crate.gif', 'crate.gif',
    //   'crate.gif', 'crate.gif'
    // ]);
    // const containerMaterial = new THREE.MeshBasicMaterial({
    //   envMap: textureCube
    // })
    const containerMaterial = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../../assets/icons/app-icon.png'))
      })
    })
    this.setState({
      hasCameraPermission: true,
      yPosition: 0,
      xPosition: 0,
      containerMaterial: containerMaterial
    })
    const containerMesh = new THREE.Mesh(container, containerMaterial);
    containerMesh.position.z = randomPosition;
    containerMesh.position.y = cube.position.y -0.75;
    scene.add(containerMesh);

    var dir = new THREE.Vector3(0, -0.5, 0);

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = new THREE.Vector3(0, 0, 0);
    var length = 0.4;
    var hex = 0xffff00;

    var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex, 0.1, 0.05);
    arrowHelper.position.z = randomPosition;
    arrowHelper.position.y = cube.position.y - 0.25
    scene.add(arrowHelper);
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
      cube.rotation.y += 0.02;
      // cube.rotation.y += 0.02;
      // line.rotation.y += 0.02;
      // line.rotation.y += 0.02
      cube.position.y = this.state.yPosition
      cube.position.x = this.state.xPosition
      // containerMesh.position.z = - 0.8
      // containerMesh.position.y = 
      
      // line.position.y = this.yPosition
      
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
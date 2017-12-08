import React, { Component } from "react";
import { ListView, Image, Dimensions, Modal } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ActionSheet,
  ListItem,
  Text,
  View
} from "native-base";
import Expo from 'expo'
const datas = [""];
const { width, height } = Dimensions.get("window");
export default class OdysseyList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.list.markerLocations
    };
    console.log(this.state.listViewData);
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.list.markerLocations];
    newData.splice(rowId, 1);
    this.props.deleteMarker(newData);
    //this.setState({ listViewData: this.props.list.markerLocations });
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <View style={{
        flex: 1,
        width: width - 40,
        height: height/5,
        alignItems: "center",
        justifyContent: "center"
      }}>
    

          <ListView
            horizontal
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.list.markerLocations)}
            renderRow={data => (
             
              <Modal 
                style={{
                  width: width - 40,
                  height: height/5
                }}
              >
              <View>
                <Text> {data.name} </Text>
                </View>
              </Modal>
              
            )}
            />
      </View>
           
          
     
    )
  };
}

// alert(JSON.stringify(data))
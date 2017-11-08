import React, { Component } from "react";
import { ListView, Image } from "react-native";
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
      <Container>
        <Header>
          <Text>
            Current Destinations
          </Text>
        </Header>
        <Content>
        

          <List
            
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.list.markerLocations)}
            renderRow={data => (
              <ListItem 
                style={{
                  alignSelf: 'center'
                }}
              >
                <Text> {data.name} </Text>
              </ListItem>
            )}
            renderLeftHiddenRow={data => (
              <Button full onPress={() => alert(JSON.stringify(data))}>
                <Icon active name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={_ => this.deleteRow(secId, rowId, rowMap)}
              >
                <Icon active name="trash" />
              </Button>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
          <Button
          style={{
            alignSelf: "stretch"
          }}
            onPress={() => {
              if (!this.props.list.markerLocations.length) {
                alert("You haven't made any stops yet!")
              } else {

                this.props.setAdventure();
                {/* this.props.setWaypoint(); */ }
                this.props.navigation.navigate("testContainer");
              }
            }}
          >
            <Text>Start Your Odycity!</Text>
          </Button>
            
            
          
        </Content>
      </Container>
    );
  }
}

// alert(JSON.stringify(data))
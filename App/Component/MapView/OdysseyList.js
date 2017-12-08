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
  Left,
  Thumbnail, 
  Text,
  Card,
  CardItem,
  View,
  Body
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
      <View style={{width: width - 20}} >
    

          <ListView
            horizontal
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.list.markerLocations)}
            renderRow={data => (
             
              <Container>
                <Header />
                <Content>
                  <Card onLongPress={() => console.log(data)} style={{ flex: 1 }}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{ uri: '/Users/Aaronmatheney/Graduation/thesis-expo-convert/assets/icons/compassRose.png' }} />
                        <Body>
                          <Text>{data.name}</Text>
                          <Text note>April 15, 2016</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Image source={{ uri: '/Users/Aaronmatheney/Graduation/thesis-expo-convert/assets/icons/compassRose.png' }} style={{ height: 200, width: 200, flex: 1 }} />
                        <Text>
                        //Your text here
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent textStyle={{ color: '#87838B' }}>
                          <Icon name="logo-github" />
                          <Text>1,926 stars</Text>
                        </Button>
                      </Left>
                    </CardItem>
                  </Card>
                </Content>
              </Container>
              
            )}
            />
      </View>
           
          
     
    )
  };
}

// alert(JSON.stringify(data))
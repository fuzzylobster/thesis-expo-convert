import React, { Component } from "react";
import { Platform, Text, View, Image, Modal } from "react-native";
import { Container, Header, Content } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Orientation from "react-native-orientation";
import FooterMenu from "../Footer";
import ProfileHeader from "./ProfileHeader";
import ProfileBadges from "./ProfileBadges";
import ProfilePastAdv from "./ProfilePastAdv";
import ProfilePhotos from "./ProfilePhotos";
import ProfileUserPhoto from "./ProfileUserPhoto";

import styles from "./../Styles/ProfileViewStyle";

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    modalImage:
      "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/10447708_10105496802291065_3147331436798292945_n.jpg?oh=ff797fce9d955f7447e90ee529022d1c&oe=5A420D4C"
  };

  setModalVisible(visible, image) {
    this.setState({ modalVisible: visible });
    this.setState({ modalImage: image });
  }
  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Grid>
        <Modal
          transparent
          style={styles.modal}
          animationType="fade"
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.modal}>
            <Image
              style={styles.image}
              source={{ uri: this.state.modalImage }}
              resizeMode="contain"
            />
            <Text
              style={styles.text}
              onPress={() => {
                this.closeModal();
              }}
            >
              Close
            </Text>
          </View>
        </Modal>
        <Row size={30}>
          <View style={styles.container}>
            <ProfileHeader
              user={this.props.user}
              background={this.props.background}
            />
          </View>
        </Row>
        <Row  size={10}>
            <View style={styles.container}>

            <ProfileBadges  
              advCounter={this.props.advCounter} 
              badges={this.props.badges}
              miles={this.props.miles}
              cities={this.props.cities}/>
            </View>

            
        </Row>
        <Row size={12}>
          <View>
            <ProfilePhotos
              modalChange={this.setModalVisible.bind(this)}
              photos={this.props.photos}
              stockPhotos={this.props.stockPhotos}
            />
          </View>
        </Row>
        <Row size={48}>
          <ProfilePastAdv
            user={this.props.user}
            adventures={this.props.adventures}
          />
        </Row>
      </Grid>
    );
  }
}

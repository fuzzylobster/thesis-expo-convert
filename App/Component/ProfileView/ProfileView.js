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
        <Row size={20}>
          <View style={styles.container}>
            <Grid>
              <Row size={25} style={styles.topHeader}>
                <Col>
                  <Text style={styles.topHeader}>{this.props.user.name}</Text>
                </Col>
              </Row>
              <Row size={80} style={styles.profHeader}>
                <Col size={35}>
                  <ProfileHeader
                    user={this.props.user}
                    background={this.props.background}
                  />
                </Col>
                <Col size={65}>
            <ProfileBadges  
              advCounter={this.props.advCounter} 
              badges={this.props.badges}
              miles={this.props.miles}
              cities={this.props.cities}/>
                </Col>
              </Row>
            </Grid>
          </View>
        </Row>
        <Row size={25}>
          <Grid>
            <Row size={20} style={styles.header}>
              <Col>
                <Text style={styles.header}>Your Photos</Text>
              </Col>
            </Row>
            <Row size={80} style={styles.photoContainer}>
              <Col>
                <View>
            <ProfilePhotos
              modalChange={this.setModalVisible.bind(this)}
              photos={this.props.photos}
              stockPhotos={this.props.stockPhotos}
            />
          </View>
              </Col>
            </Row>
          </Grid>
        </Row>
        <Row size={40}>
          <Grid>
            <Row size={13} style={styles.header}>
              <Col>
                <Text style={styles.header}>Your Adventures</Text>
              </Col>
            </Row>
            <Row size={87} style={styles.advs}>
              <Col>
          <ProfilePastAdv
            user={this.props.user}
            adventures={this.props.adventures}
          />
              </Col>
            </Row>
          </Grid>
        </Row>
      </Grid>
    );
  }
}

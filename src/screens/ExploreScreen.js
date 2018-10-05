import React, { Component } from "react";
import { StyleSheet } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
import { Container, Content, Icon, Input, Item, Spinner } from "native-base";

import stylesd from '../stylesd';
import User from "../components/User";

class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: ""
    };
  }
  
  componentDidMount() {
    this.retrieveDataUsers();
    
  }

  retrieveDataUsers = async () => {

    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    const dbUsers = await db
      .collection("users")
      .get();
    const users = [];
    dbUsers.forEach( user => {
      users.push(user.data());
    })
    this.setState({ users });
  }

  render() {
    const { search, users } = this.state;
    const { navigation } = this.props;

    return (
      <Container style={styles.container}>
        <Item style={styles.itemInput} rounded>
          <Icon name="search" />
          <Input
            value={search}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="name-phone-pad"
            placeholder="busca por nome e/ou instrumento"
            onChangeText={text => this.setState({ search:text })}
          />
        </Item>
        <Content contentContainerStyle={styles.content}>
          { 
            users.map( user => ( <User key={user.username} user={user} navigation={navigation} /> ))
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo
  },
  itemInput: {
    backgroundColor: "#fff"
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  spinner: {
    flex:1, 
    alignItems:'center'
  }
});

export default ExploreScreen;

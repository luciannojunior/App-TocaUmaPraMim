import React from "react";
import * as firebase from 'firebase';
require("firebase/firestore");

/**
 * Initiates Facebook's login flow
 */
const _loginWithFacebook = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '2207895276121269',
    { permissions: ['public_profile'] }
  );

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(({ user })=>{
      _verifyUser(user);
    }).catch((error) => {
      Alert.alert('Houve um erro ao tentar logar')
      console.log(error);
    });
  } else {
    Alert.alert('Houve um erro ao tentar logar')
  }
}

/**
 * Verifies if this uid is registered in the app. If not, redirect the user to the RegisterScreen.
 * If it is, redirects him/her to the Main Screen.
 * 
 * @param {String} uid 
 */
const _verifyUser = async (user) => { 
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})
  const response = await db.collection('users').where('authId', '==', user.uid).get()
  if (response.empty){
    // Redirect to Register Screen
    // Pass params 
  } else {
    // Redirect to Main App
  }
}

export default (WrappedComponent) => {
  class withAuth extends React.Component {
    render() {
      return (
        <WrappedComponent loginWithFacebook={_loginWithFacebook} {...this.props} />
      );
    }
  }

  return withAuth;
}

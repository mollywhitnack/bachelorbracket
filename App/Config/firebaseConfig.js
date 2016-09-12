'use strict'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { dispatch } from '../../index.ios'

import firebase from 'firebase'
import Types from '../Actions/Types.js'

  var config = {
    apiKey: "AIzaSyDO5Cdnf7AcB1YwqZ8pdeUVP8lYNUEVEgc",
    authDomain: "bachelorbracket-5b74a.firebaseapp.com",
    databaseURL: "https://bachelorbracket-5b74a.firebaseio.com",
    storageBucket: "bachelorbracket-5b74a.appspot.com",
  };  

firebase.initializeApp(config) 

let db = firebase.database()

let firebaseRef = db.ref('brackets')

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    setUserBracketsListener(user);
    console.log('loged in, going home');
    NavigationActions.home()
  } else {
    dispatch({type: Types.LOGOUT})
    NavigationActions.presentationScreen()
  }
})

function setUserBracketsListener(user) {
  let uid  = user.uid;//firebase.auth().currentUser.v
    var data = db.ref(`${uid}`);
    data.on('value', function(snapshot){
      console.log('Getting brackets');
      console.log('snapshot.val()', snapshot.val());
      //dispatch({type: Types.GET_USER_BRACKETS, brackets: snapshot.val()})
    })
}

export {
  db
}

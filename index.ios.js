import * as firebase from 'firebase';
import React from 'react'
import { AppRegistry } from 'react-native'
import Root from './App/Root'
import './App/Config/ReactotronConfig'
import configureStore from './App/Store/Store'

// Initialize Firebase
/*const firebaseConfig = {
    apiKey: "AIzaSyDO5Cdnf7AcB1YwqZ8pdeUVP8lYNUEVEgc",
    authDomain: "bachelorbracket-5b74a.firebaseapp.com",
    databaseURL: "https://bachelorbracket-5b74a.firebaseio.com",
    storageBucket: "bachelorbracket-5b74a.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);*/

// Handling store here to avoid hot-reloading issues
const store = configureStore()
class RNBase extends React.Component {
  render () {
    return <Root {...this.props} store={store} />
  }
}

AppRegistry.registerComponent('bracket', () => RNBase)

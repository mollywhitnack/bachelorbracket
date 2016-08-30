import React, {PropTypes} from 'react'
import { ScrollView, Text, Image, View, TextInput, TouchableHighlight } from 'react-native'
import { Images, Colors } from '../Themes'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
//var ResponsiveImage = require('react-native-responsive-image');
import Icon from 'react-native-vector-icons/FontAwesome'
//import I18n from '../I18n/I18n.js'

// Styles
import styles from './Styles/PresentationScreenStyle'
import * as Firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDO5Cdnf7AcB1YwqZ8pdeUVP8lYNUEVEgc",
    authDomain: "bachelorbracket-5b74a.firebaseapp.com",
    databaseURL: "https://bachelorbracket-5b74a.firebaseio.com",
    storageBucket: "bachelorbracket-5b74a.appspot.com",
  };  

  var firebaseApp = Firebase.initializeApp(config);
  var rootRef = Firebase.database().ref();
  /*function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("\nUser is logged out");
  }
} 
firebaseApp.auth().onAuthStateChanged(user =>{
  if(!user){
    console.log('loged out:', user);
  }
  else{
    console.log('loged in as: ', user);
  }
});*/

class PresentationScreen extends React.Component {

  static propTypes = {
    componentExamples: PropTypes.func,
    usageExamples: PropTypes.func,
    home: PropTypes.func,
    apiTesting: PropTypes.func,
    theme: PropTypes.func,
    deviceInfo: PropTypes.func,
    //newBracket: PropTypes.func
  }

  render () {
    
    console.log('here');
    firebaseApp.auth().onAuthStateChanged(user =>{
      if(!user){
      console.log('loged out:', user);
    }
      else{
        console.log('loged in as: ', user);
        this.props.home()
      }
    });

    return (
        <View style={styles.splashContainer}>
          <View style={styles.imgContainer}>
                {/*<Image source={Images.roses} />*/}
                <Image source={Images.bachelorette} style={styles.bachelorette} />
            </View>
            <View style = {styles.container}>
            <TextInput style = {styles.input} 
                        placeholder = "email" 
                        onChangeText = {(text) => this.setState({email: text})}
                        /> 
            <TextInput style = {styles.input} placeholder = "password" secureTextEntry = {true} onChangeText = {(text) => this.setState({password: text})} /> 

            <TouchableHighlight 
              onPress = {this.onLoginPressed.bind(this)}
              style = {styles.button}>
              <Text style = {styles.buttonText}> Log in</Text>
            </TouchableHighlight>
          </View>
          {/*<RoundedButton backgroundColor={Colors.facebook} onPress={() => window.alert('How to play')} >
            How To Play
          </RoundedButton>*/}

        </View>
     )
  }


    onLoginPressed(){
      console.log('attempt to log in with email: ',  this.state.email );
      let email = this.state.email;
      let password = this.state.password;
      console.log('this.props 1:', this.props)
      let nav = this.props;
      //createUserWithEmailAndPassword(email, password)
      Firebase.auth().signInWithEmailAndPassword(email, password).then(
        function(res){
          console.log('res:', res);
          console.log('nav:', nav)
          nav.home();
        },
        function (err){
        console.log('err: ', err);
        if(err.code === 'auth/invalid-email'){

        }
        if(err.code === 'auth/user-disabled'){

        }
        if(err.code === 'auth/user-not-found'){
          console.log('create user:', email)//, this.state.email);

          Firebase.auth().createUserWithEmailAndPassword(email, password).then(
            function(res){
              console.log('res:', res);
              console.log('create new user with email:', email)
            }, 
            function(err){
              console.log('err:', err);
              if(err.code === 'auth/email-already-in-use'){}
              if(err.code === 'auth/invalid-email'){}
              if(err.code === 'auth/operation-not-allowed'){}
              if(err.code === 'auth/weak-password'){}
            }
          )
        }
        if(err.code === 'auth/wrong-password'){

        }
      });
      //this.setState({showProgress: true});

      //var authService = require('./AuthService');
    /*
      authService.login({
        username: this.state.username,
        password: this.state.password
      }, (results) =>{
        this.setState(Object.assign({
          showProgress: false
        }, results));
        if(results.success && this.props.onLogin){
          this.props.onLogin();
        }
      });*/
   } 
  }

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    componentExamples: NavigationActions.componentExamples,
    usageExamples: NavigationActions.usageExamples,
    home: NavigationActions.home,
    apiTesting: NavigationActions.apiTesting,
    theme: NavigationActions.theme,
    deviceInfo: NavigationActions.deviceInfo,
    //newBracket: NavigationActions.newBracket

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)

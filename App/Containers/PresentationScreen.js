import React, {PropTypes} from 'react'
import { Text, View, Alert, Image, TextInput,TouchableOpacity,  TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import * as firebase from 'firebase';
import { Images, Colors } from '../Themes'
import { db } from '../Config/firebaseConfig.js'

//import { Container, Header, Button, Title, Content, Input, InputGroup, Icon } from 'native-base'
// import karmaTheme from '../../node_modules/native-base/Components/Themes/light'
//import karmaTheme from '../NativeBase/karmaTheme'


// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {

  static propTypes = {
    home: PropTypes.func,
    register: PropTypes.func,
  }

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    //this.props.home();
  }

  login () {
    console.log('login pressed');
    //this.props.home();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
         console.log('success');
         this.props.home();
    })
    .catch(error => {
        Alert.alert('One small problem...', error.message)
    })
  }

  register () {
    //this.setState({ submitted: true })
    /*if (this.state.password === this.state.passwordConfirmation) {*/
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          this.props.home();
          //user.updateProfile({ displayName: this.state.displayName })
          //let userToAdd = {}
          //userToAdd.displayName = this.state.displayName
          //userToAdd.currentKarma = 30
          //userToAdd.totalKarma = 30
          //let ref = db.ref(`users/${user.uid}`)
          //ref.set(userToAdd)
        })
        .catch(error => {
          this.setState({ submitted: false })
          Alert.alert('One small problem...', error.message)
        })
    } /*else {
      this.setState({ submitted: false })
      Alert.alert('Error', 'Passwords don\'t match')
    }*/
  

  changeEmail (email) {
    console.log('email:', email);
    this.setState({email})
  }

  changePassword (password) {
    this.setState({password})
  }

  render () {
    console.log('this.state:', this.state);
    console.log('this.props:', this.props);
    console.log('firebase:', firebase.auth());
    console.log('db', db);
    //let user =  firebase.auth().currentUser;
    //console.log('user:', user);
    //this.props.home();
    return (
        <View style={styles.splashContainer}>
          <View style={styles.imgContainer}>
                {/*<Image source={Images.roses} />*/}
                <Image source={Images.bachelor} style={styles.bachelor} />
          </View>

          <View >
            <TextInput
              style = {styles.input}
              onChangeText={this.changeEmail}
              placeholder='Email'
            />
          </View>

          <View >
            <TextInput
              style = {styles.input}
              onChangeText={this.changePassword}
              placeholder='Password'
              secureTextEntry
            />
          </View>

            <View>
              <TouchableOpacity style = {styles.button} onPress={this.login} >
                <Text> Sign In</Text>
              </TouchableOpacity>

              <View style={styles.links}>
                <TouchableOpacity style = {styles.button}>
                  <Text> Forgot Password </Text>
                </TouchableOpacity>

                <TouchableOpacity  style = {styles.button} onPress={this.register}>
                  <Text> Register </Text>
                </TouchableOpacity>
            </View>
          </View>

        </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //register: NavigationActions.register,
    home: NavigationActions.home,
    register: NavigationActions.register,
  }
}

export default connect(null, mapDispatchToProps)(PresentationScreen)
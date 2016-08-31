import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput ,TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Colors, Images, Metrics } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
// Enable when you have configured Xcode
// import PushNotification from 'react-native-push-notification'
import I18n from '../I18n/I18n.js'
import * as Firebase from 'firebase';
import uuid from 'uuid'
// Styles
import styles from './Styles/NewBracketScreenStyle'
class NewBracketScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      inviteEmails: []
    }
  }

  static propTypes = {
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    temperature: PropTypes.number,
    player: PropTypes.string,
    inviteEmails: PropTypes.array,
    city: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
    requestTemperature: PropTypes.func,
    listviewExample: PropTypes.func,
    listviewGridExample: PropTypes.func,
    mapviewExample: PropTypes.func,
    weekOne: PropTypes.func
  }

  componentWillReceiveProps (nextProps) {
    // Request push premissions only if the user has logged in.
    const { loggedIn } = nextProps
    if (loggedIn) {
    }
  }

  // fires when we tap the rocket!
  handlePressRocket = () => {
    this.props.requestTemperature('Boise')
  }

  // fires when tap send
  addPlayer = () => {
    //this.props.requestTemperature('Toronto')
    console.log('this.state:', this.state)
    this.setState({inviteEmails: this.state.inviteEmails.concat([this.state.player])});
    //might be wrong? ''
    this.setState({player: '' })

  }

  // fires when tap star
  handlePressStar = () => {
    this.props.requestTemperature('New Orleans')
  }

  renderLoginButton () {
    return (
      <RoundedButton onPress={this.props.login}>
        {I18n.t('signIn')}
      </RoundedButton>
    )
  }

  renderLogoutButton () {
    return (
      <RoundedButton onPress={this.props.logout}>
        {I18n.t('logOut')}
      </RoundedButton>
    )
  }

  renderHeader (title) {
    return (
      <View style={styles.componentLabelContainer}>
        <Text style={styles.componentLabel}>{title}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.newBracketContainer}>
        <Text>Name Your Bracket:</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder = "Bracket Name"
        onChangeText={(BracketName) => this.setState({BracketName})}
        value={this.state.BracketName}
        />
        <Text>Invite Friends to bracket by Email</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder = "Player"
        onChangeText={(player) => this.setState({player})}
        value={this.state.player}
        />

        <TouchableOpacity onPress={this.addPlayer}>
            <Icon name='plus' size={Metrics.icons.medium} color={Colors.error} />
          </TouchableOpacity>
        <Text>{this.state.inviteEmails}</Text>
        <RoundedButton text='Submit Bracket' onPress={this.writeUserData.bind(this)}/>
        </ScrollView>
      </View>
    )
  }

  writeUserData() {

    let uid  = Firebase.auth().currentUser.v

    console.log('uid:', uid);
    console.log('new bracket', newBracket)

    var newBracketKey = firebase.database().ref().child('brackets').push().key;
    //var newUserBracketKey = firebase.database().ref().child('user-brackets').push().key;

    let newName = this.state.BracketName;
    let newInvites = this.state.inviteEmails;
      
    let newUserBracket = {
        id: newBracketKey,
        name: newName,
        inviteEmails: newInvites,
    }

    let newBracket = {
      name: this.state.BracketName,
      inviteEmails: this.state.inviteEmails,
    }

      var updates = {};
      updates['/brackets/' + newBracketKey] = newBracket;
      //var brackets = [];
      /*firebase.database().ref('brackets/' + currbracket).child(`${uid}`).set({
        weekOne: this.state.weekOne
      })*/

      firebase.database().ref(`${uid}/${newBracketKey}`).set({
        name: newName,
        inviteEmails: newInvites,
      })

      //updates['/user-brackets/' + uid ] = newUserBracket;
      console.log('ref updates:', firebase.database().ref().update(updates))
      
      this.props.weekOne();
  }

}


const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null,
    temperature: state.weather.temperature,
    city: state.weather.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: NavigationActions.login,
    logout: () => dispatch(Actions.logout()),
    requestTemperature: (city) => dispatch(Actions.requestTemperature(city)),
    listviewExample: NavigationActions.listviewExample,
    listviewGridExample: NavigationActions.listviewGridExample,
    mapviewExample: NavigationActions.mapviewExample,
    weekOne: NavigationActions.weekOne
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBracketScreen)

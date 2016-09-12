import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput ,TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { bindActionCreators } from 'redux';
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
      inviteEmails: [],
      bracketId: ''
    }
  }

  static propTypes = {
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    player: PropTypes.string,
    inviteEmails: PropTypes.array,
    login: PropTypes.func,
    logout: PropTypes.func,
    listviewExample: PropTypes.func,
    listviewGridExample: PropTypes.func,
    weekOne: PropTypes.func,
    bracketId: PropTypes.string
  }

  componentWillReceiveProps (nextProps) {
    // Request push premissions only if the user has logged in.
    const { loggedIn } = nextProps
    if (loggedIn) {
    }
  }

  addPlayer = () => {
    //this.props.requestTemperature('Toronto')
    console.log('this.state:', this.state)
    this.setState({inviteEmails: this.state.inviteEmails.concat([this.state.player])});
    //might be wrong? ''
    this.setState({player: '' })

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
        <Text style = {{paddingTop: 30}}>Invite Friends to bracket by Email</Text>
        <View style = {styles.inline}>
          <TextInput
          style={{height: 40, width: 320, borderColor: 'gray', borderWidth: 1, marginRight: 10  }}
          placeholder = "Player"
          onChangeText={(player) => this.setState({player})}
          value={this.state.player}
          />

          <TouchableOpacity onPress={this.addPlayer}  >
              <Icon name='plus' size={Metrics.icons.medium} color={Colors.error} />
          </TouchableOpacity>
        </View>
        <Text>{this.state.inviteEmails}</Text>
        <RoundedButton text='Submit Bracket' onPress={this.writeUserData.bind(this)} style = {styles.submit}/>
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

      firebase.database().ref(`${uid}/${newBracketKey}`).set({
        name: newName,
        inviteEmails: newInvites,
      })

      console.log('ref updates:', firebase.database().ref().update(updates))
      //dispatch current bracket id on component did mount?
      this.setState({bracketId: newBracketKey})
      this.props.weekOne();
  }

}


const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null,
    bracketId: state.bracketId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //actions: bindActionCreators(bracketActions, dispatch),
    login: NavigationActions.login,
    logout: () => dispatch(Actions.logout()),
    listviewExample: NavigationActions.listviewExample,
    listviewGridExample: NavigationActions.listviewGridExample,
    weekOne: NavigationActions.weekOne
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBracketScreen)

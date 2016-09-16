import React, { PropTypes } from 'react'
import { View, ScrollView, TextInput,Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
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
import { db } from '../Config/firebaseConfig.js'
// Styles
import styles from './Styles/HomeScreenStyle'
import * as firebase from 'firebase';

class HomeScreen extends React.Component {

  constructor (props) {
    super(props)
    console.log('this.props:', this.props);
    console.log('firebaseConfig:', db);
      this.state = {
        userBrackets: [],
      }
    }
  
  static propTypes = {
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func,
    listviewExample: PropTypes.func,
    listviewGridExample: PropTypes.func,
    getUserBrackets: PropTypes.func,
    newBracket: PropTypes.func,
    userBrackets: PropTypes.func
  }

  componentDidMount () {
    let currUser = firebase.auth().currentUser
    // this.props.getUserBrackets(currUser)
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
    //console.log('user in home:', Firebase.auth().currentUser)
    console.log('db:', db);
    let user =  firebase.auth().currentUser;
    console.log('user:', user);
    return (
      <View style={styles.mainContainer}>
            <View style={styles.imgContainer}>
                {/*<Image source={Images.roses} />*/}
                <Image source={Images.bachelor} style={styles.bachelor} />
            </View>
      
        <View>
          <RoundedButton text='New Bracket' onPress={this.props.newBracket} />
        </View>
        <View>
          <RoundedButton text='My Brackets' onPress={this.props.userBrackets} />
        </View>
        <View style = {styles.container}>
         <TextInput
          style={{height: 40, width: 270, borderColor: 'gray', borderWidth: 1, marginRight: 10  }}
          placeholder = " Search Brackets"
          onChangeText={(player) => this.setState({player})}
          value={this.state.player}
          />
          <RoundedButton onPress={this.addPlayer}  >
            {/*}  <Icon name='search' size={Metrics.icons.medium} color={Colors.error} />*/}
            <Text>Search</Text>
          </RoundedButton>
        </View>
        <Text style={styles.user}>user</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null,
    /*currUserBrackets: state.userBrackets*/
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: NavigationActions.login,
    logout: () => dispatch(Actions.logout()),
    setUserBrackets: (brackets) => dispatch(Actions.setUserBrackets(brackets)),
    listviewExample: NavigationActions.listviewExample,
    listviewGridExample: NavigationActions.listviewGridExample,
    newBracket: NavigationActions.newBracket,
    userBrackets: NavigationActions.userBrackets,
    getUserBrackets: (currUser) => {
      dispatch(Actions.getUserBrackets(currUser))
    }  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

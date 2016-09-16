import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import HomeScreen from '../Containers/HomeViewScreen'
import NewBracketScreen from '../Containers/NewBracketScreen'
import WeekOneScreen from '../Containers/WeekOneScreen'
import WeekTwoScreen from '../Containers/WeekTwoScreen'
import WeekThreeScreen from '../Containers/WeekThreeScreen'
import WeekFourScreen from '../Containers/WeekFourScreen'
import WeekFiveScreen from '../Containers/WeekFiveScreen'
import WeekSixScreen from '../Containers/WeekSixScreen'
import WeekSevenScreen from '../Containers/WeekSevenScreen'
import WeekEightScreen from '../Containers/WeekEightScreen'
import BracketScreen from '../Containers/BracketScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import UserBracketsScreen from '../Containers/UserBracketsScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title='Ignite' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
            <Scene key='register' component={RegisterScreen} title='Register' />
            <Scene key='userBrackets' component={UserBracketsScreen} title='UserBrackets' />
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
            <Scene key='home' component={HomeScreen} title='Home' rightTitle='Example' />
            <Scene key='newBracket' component={NewBracketScreen} title='NewBracket' />
            <Scene key='bracket' component={BracketScreen} title='Bracket' />
            <Scene key='weekOne' component={WeekOneScreen} title='WeekOne' />
            <Scene key='weekTwo' component={WeekTwoScreen} title='WeekTwo' />
            <Scene key='weekThree' component={WeekThreeScreen} title='WeekThree' />
            <Scene key='weekFour' component={WeekFourScreen} title='WeekFour' />
            <Scene key='weekFive' component={WeekFiveScreen} title='WeekFive' />
            <Scene key='weekSix' component={WeekSixScreen} title='WeekSix' />
            <Scene key='weekSeven' component={WeekSevenScreen} title='WeekSeven' />
            <Scene key='weekEight' component={WeekEightScreen} title='WeekEight' />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
            <Scene key='theme' component={ThemeScreen} title='Theme' />
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter

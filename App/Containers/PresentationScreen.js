import React, {PropTypes} from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images, Colors } from '../Themes'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
//var ResponsiveImage = require('react-native-responsive-image');
import Icon from 'react-native-vector-icons/FontAwesome'
import I18n from '../I18n/I18n.js'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {

  static propTypes = {
    componentExamples: PropTypes.func,
    usageExamples: PropTypes.func,
    home: PropTypes.func,
    apiTesting: PropTypes.func,
    theme: PropTypes.func,
    deviceInfo: PropTypes.func
  }

  render () {
    return (
        <View style={styles.splashContainer}>
          <View style={styles.imgContainer}>
              {/*<Image source={Images.roses} />*/}
              <Image source={Images.bachelorette} style={styles.bachelorette} />
          </View>
          <RoundedButton onPress={this.props.home}>
            Log in with Facebook
          </RoundedButton>
          <RoundedButton backgroundColor={Colors.facebook} onPress={() => window.alert('How to play')} >
            How To Play
          </RoundedButton>

        </View>
        )
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
    deviceInfo: NavigationActions.deviceInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)

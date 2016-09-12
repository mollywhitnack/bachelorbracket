import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  loginBox: {
    padding: Metrics.doubleBaseMargin
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    color: Colors.silver
  },
  componentLabelContainer: {
    ...ApplicationStyles.darkLabelContainer
  },
  componentLabel: {
    ...ApplicationStyles.darkLabel
  },
  locale: {
    ...Fonts.style.h4,
    color: Colors.snow
  },
  groupContainer: {
    ...ApplicationStyles.groupContainer
  },
  container:{
    margin: 30,
    flexWrap: 'wrap',   
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  imgContainer: {
    paddingTop: 100,
    paddingBottom: 50,
   flexDirection: 'row',
  },
  bachelorette:{
   resizeMode: 'cover',
   width: null,
   height: 80,
   flex:1
  },
  bachelor:{
   resizeMode: 'cover',
   width: null,
   height: 100,
   flex:1
  },
  user:{
    paddingTop: 80,
  }
})

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  splashContainer:{
    paddingTop: 200
  },
  centered: {
    alignItems: 'center'
  },  
  imgContainer: {
   flexDirection: 'row',
   flex:1
  },
  roses: {
    justifyContent: 'center',
    alignItems: 'stretch',
    resizeMode: 'stretch',
    width: null,
    height: 100,
    flex:1
  },
  bachelorette:{
   resizeMode: 'cover',
   width: null,
   height: 100,
   flex:1
  }
})

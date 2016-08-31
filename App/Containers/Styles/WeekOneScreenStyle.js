import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: Colors.background
  },
  header:{
    marginTop: 50,
    backgroundColor: 'red'
  },
  scroll:{
    marginTop: 20,
  },
  row: {
    width: 120,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center'
  },
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image:{
   resizeMode: 'contain',
   width: 100,
   height: 110,
  },
  pink:{
    backgroundColor: 'pink'

  },
  none:{
    backgroundColor: 'black'
  },

  overlay: {
    backgroundColor:'rgba(80,94,104,0.7)',
  }

})

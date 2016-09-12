import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: 14,
    backgroundColor: 'white'
  },
  header:{
    marginTop: 50,
    backgroundColor: 'red'
  },
  scroll:{
    marginTop: 20,
  },
  row: {
    width: 160,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
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
   width: 160,
   height: 140,

  },
  pink:{
    backgroundColor: 'pink'
  },
  none:{
    borderRadius: 5,
    paddingBottom: 10,
    backgroundColor: 'grey'
  },

  overlay: {
    backgroundColor:'rgba(80,94,104,0.7)',
  }

})

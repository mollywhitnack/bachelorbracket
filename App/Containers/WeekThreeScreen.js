import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, ListView,TextInput ,TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'

// Styles
import styles from './Styles/WeekOneScreenStyle'

class WeekThreeScreen extends React.Component {

  constructor (props) {
    super(props)

    const dataObjects = [
      {title: '1', description: 'First Description', image: 'http://cdn1.edgedatg.com/aws/v2/abc/TheBachelorette/person/1643372/f57dda0053fbea301812a5d515fd3a16/330x330-Q90_f57dda0053fbea301812a5d515fd3a16.jpg'},
      {title: '2', description: 'Second Description'},
      {title: '3', description: 'Third Description'},
      {title: '4', description: 'Fourth Description'},
      {title: '5', description: 'Fifth Description'},
      {title: '6', description: 'Sixth Description'},
      {title: '7', description: 'Seventh Description'},
      {title: '8', description: '8 Description'},
      {title: '9', description: '9 Description'},
      {title: '10', description: '10 Description'},
      {title: '11', description: '11 Description'},
      {title: '12', description: '12 Description'},
      {title: '13', description: '13 Description'},
      {title: '14', description: '14 Description'},
      {title: '15', description: '15 Description'},
      {title: '16', description: '16 Description'},
      {title: '17', description: '17 Description'},
      {title: '18', description: '18 Description'},
      {title: '19', description: '19 Description'},
      {title: '20', description: '20 Description'},
    ]


    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
  }

  static propTypes = {
    weekFour: PropTypes.func,
  }

  /* ***********************************************************
  * STEP 3
  * `_renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress = {this.selectContestant}>
          <View>
            <Text style={styles.boldLabel}>{rowData.title}</Text>
            <Image style={styles.image}  source={Images.jojo} /> 
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View>
        <Text>Week 1</Text>
        <Text>Select 15</Text>
          <ScrollView style={styles.container} >
            <View >
              <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              />
            </View>
        </ScrollView>
      <RoundedButton text='Week 4 ->' onPress={this.props.weekFour} />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    weekFour: NavigationActions.weekFour
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(WeekThreeScreen)

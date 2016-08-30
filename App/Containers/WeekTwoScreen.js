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

class WeekTwoScreen extends React.Component {

  constructor (props) {
    super(props)

    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
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

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
  }

  static propTypes = {
    weekThree: PropTypes.func,
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
        <TouchableOpacity onPress = {this.selectContestant} >
          <View>
            <Text style={styles.boldLabel}>{rowData.title}</Text>
            <Image style={styles.image}  source={Images.jojo} /> 
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
     <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Week 2</Text>
          <Text  style={styles.subtitle}>Select 12</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        </ScrollView>
        <RoundedButton text='Week 3 ->' onPress={this.props.weekThree} />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    weekThree: NavigationActions.weekThree
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(WeekTwoScreen)

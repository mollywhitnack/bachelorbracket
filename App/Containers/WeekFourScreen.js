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

class WeekFourScreen extends React.Component {

  constructor (props) {
    super(props)

    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = [
      {title: 'First Title', description: 'First Description', image: 'http://cdn1.edgedatg.com/aws/abc/TheBachelorette/person/person-person_5fb3626e-febf-4d42-8eda-2d22ab4a72dd_943x943_source-330x330-Q90_1461705442423.jpg'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'},
      {title: '8 Title', description: '8 Description'},
      {title: '9 Title', description: '9 Description'},
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
    weekFive: PropTypes.func,
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

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View>
        <Text>Week 1</Text>
        <Text>Select 15</Text>
        <ScrollView >
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
      </ScrollView>
      <RoundedButton text='Week 5 ->' onPress={this.props.weekFive} />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    weekFive: NavigationActions.weekFive
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(WeekFourScreen)

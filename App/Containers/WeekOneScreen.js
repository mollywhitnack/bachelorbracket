import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, ListView,TextInput ,TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'

// Styles
import styles from './Styles/WeekOneScreenStyle'

class WeekOneScreen extends React.Component {

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
      {title: '10 Title', description: '10 Description'},
      {title: '11 Title', description: '11 Description'},
      {title: '12 Title', description: '12 Description'},
      {title: '13 Title', description: '13 Description'},
      {title: '14 Title', description: '14 Description'},
      {title: '15 Title', description: '15 Description'},
      {title: '16 Title', description: '16 Description'},
      {title: '17 Title', description: '17 Description'},
      {title: '18 Title', description: '18 Description'},
      {title: '19 Title', description: '19 Description'},
      {title: '20 Title', description: '20 Description'},
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
    bracket: PropTypes.func,
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
        <Text style={styles.boldLabel}>{rowData.title}</Text>
        <Text style={styles.label}>{rowData.description}</Text>
        <Image style={styles.image}  source={{uri: 'http://cdn1.edgedatg.com/aws/abc/TheBachelorette/person/person-person_5fb3626e-febf-4d42-8eda-2d22ab4a72dd_943x943_source-330x330-Q90_1461705442423.jpg' }} /> 
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
      <RoundedButton text='Bracket/Week 2 ->' onPress={this.props.bracket} />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    bracket: NavigationActions.bracket
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(WeekOneScreen)

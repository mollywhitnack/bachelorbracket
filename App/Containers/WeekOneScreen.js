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

class WeekOneScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      weekOne: []
    }

    this._renderRow.bind(this);

    const dataObjects = [
      {title: '1', added : false , description: 'First Description', image: 'http://cdn1.edgedatg.com/aws/v2/abc/TheBachelorette/person/1643372/f57dda0053fbea301812a5d515fd3a16/330x330-Q90_f57dda0053fbea301812a5d515fd3a16.jpg'},
      {title: '2', added : false, description: 'Second Description'},
      {title: '3', added : false ,description: 'Third Description'},
      {title: '4', added : false, description: 'Fourth Description'},
      {title: '5', added : false, description: 'Fifth Description'},
      {title: '6', added : false, description: 'Sixth Description'},
      {title: '7', added : false, description: 'Seventh Description'},
      {title: '8', added : false, description: '8 Description'},
      {title: '9', added : false, description: '9 Description'},
      {title: '10', added : false, description: '10 Description'},
      {title: '11', added : false, description: '11 Description'},
      {title: '12', added : false, description: '12 Description'},
      {title: '13', added : false, description: '13 Description'},
      {title: '14', added : false, description: '14 Description'},
      {title: '15', added : false, description: '15 Description'},
      {title: '16', added : false, description: '16 Description'},
      {title: '17', added : false, description: '17 Description'},
      {title: '18', added : false, description: '18 Description'},
      {title: '19', added : false, description: '19 Description'},
      {title: '20', added : false, description: '20 Description'},
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
    weekTwo: PropTypes.func,
    weekOne: PropTypes.array,
    selectContestant: PropTypes.func,
  }

//cahnged title

  /*() => {
          //this._pressRow(rowID);
          //highlightRow(sectionID, rowID);
          console.log('clicked, ', rowData)
          rowData.added = !rowData.added;
          //console.log('this.state:', this.state)//.weekOne)
          //console.log('this:', this.props)//.weekOne)
          //this.setState({weekOne: this.state.weekOne.concat([rowData])});
         }}>*/

  _onHideUnderlay(){
    console.log('hide: ', this);
  }

  _renderRow (rowData) {
    let highlight  = styles.none
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {
          //this._pressRow(rowID);
          //highlightRow(sectionID, rowID);
          console.log('clicked, ', rowData)
          rowData.added = !rowData.added;

          if(rowData.added === true){
            highlight = styles.pink;
          }
          //console.log('this.state:', this.state)//.weekOne)
          //console.log('this:', this.props)//.weekOne)
          //this.setState({weekOne: this.state.weekOne.concat([rowData])});
         }}>

          <View style={highlight} >
            <Text style={styles.boldLabel}>{rowData.title}</Text>
            <Image style={styles.image}  source={Images.jojo} /> 
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  selectContestant(){
    //this.props.requestTemperature('Toronto')
    console.log('clicked:');
    console.log('this:', this)
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    console.log('this.state.weekone:', this.state.weekOne)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Week 1</Text>
          <Text  style={styles.subtitle}>Select 15</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        </ScrollView>
        <RoundedButton text='Week 2 ->' onPress={this.props.weekTwo} />
      </View>
    )
  }
}

WeekOneScreen.propTypes = {
  text: PropTypes.string.isRequired,
};




const mapStateToProps = (state) => {
  return {
    weekTwo: NavigationActions.weekTwo
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(WeekOneScreen)

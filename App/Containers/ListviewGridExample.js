import React from 'react'
import { View, Text, ListView, RecyclerViewBackedScrollView } from 'react-native'
import { connect } from 'react-redux'

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'

// Styles
import styles from './Styles/ListviewGridExampleStyle'
import * as firebase from 'firebase';

class ListviewGridExample extends React.Component {

  constructor (props) {
    console.log('1. in constructor')
    super(props)
    let uid  = firebase.auth().currentUser.v

    var data = firebase.database().ref(`${uid}`);
    data.on('value', function(snapshot) {
      console.log('2. getting brackets');
      makeBracketElements(snapshot.val())
    });

    const dataObjects = []

    function makeBracketElements(brackets){
      console.log('3. brackets:', brackets)
        for(var bracket in brackets){
          let obj = {
            title: brackets[bracket].name,
            players: brackets[bracket].inviteEmails
          }
          dataObjects.push(obj);
        }
        console.log('dataObjects:', dataObjects);
    }

    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
  }


  _renderRow (rowData) {
    console.log('4. render rows');
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.title}</Text>
        <Text style={styles.label}>{rowData.players}</Text>
      </View>
    )
  }


  _noRowData () {
    console.log('5 .no row data');
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
   console.log('6.render');
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(ListviewGridExample)

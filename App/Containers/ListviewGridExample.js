import React from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'

// Styles
import styles from './Styles/ListviewGridExampleStyle'
import * as firebase from 'firebase';

class ListviewGridExample extends React.Component {

  constructor (props) {
    super(props)
    let uid  = firebase.auth().currentUser.v

    var data = firebase.database().ref('user-brackets/' + uid );
    data.on('value', function(snapshot) {
    //  updateStarCount(postElement, snapshot.val());
      console.log('snapshot: ', snapshot)
      console.log('snapshot.val(): ', snapshot.val())

      makeBracketElements(snapshot.val())
    });

    const dataObjects = []

    function makeBracketElements(brackets){
      console.log('brackets:', brackets)
        for(let i =0; i< brackets.length; i++){
          let obj = {
            title: brackets[i].name,
            players: brackets[i].inviteEmails
          }
          console.log('obj:', obj);
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
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.title}</Text>
        <Text style={styles.label}>{rowData.players}</Text>
      </View>
    )
  }


  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
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

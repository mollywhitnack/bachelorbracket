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
    super(props)

    const dataObjects = [];
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.setState({dataSource: ds.cloneWithRows(dataObjects)});

    this.state = {
      dataSource: [],
      load: false,
      userBrackets: [],
    }

    /*function makeBracketElements(brackets){
      console.log('3. brackets:', brackets)
        for(var bracket in brackets){
          let obj = {
            title: brackets[bracket].name,
            players: brackets[bracket].inviteEmails
          }
          dataObjects.push(obj);
        }
        console.log('dataObjects:', dataObjects);
    }*/

    //const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    //const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state

  }


  _renderRow (rowData) {
    console.log('4. render rows');
    console.log('this.state.load:', this.state.load)
    if(!this.state.load){
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.title}</Text>
        <Text style={styles.label}>{rowData.players}</Text>
      </View>
    )
    }
    else{
      return (
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{this.state.userBrackets}</Text>
          <Text style={styles.label}>{rowData.players}</Text>
        </View>
      )
    }
  }

  componenWillMount(){
    let uid  = firebase.auth().currentUser.v
    let test = [];
    var data = firebase.database().ref(`${uid}`);
    data.on('value', function(snapshot) {
      console.log('2. getting brackets');
      console.log('snapshot.val()', snapshot.val());
      //makeBracketElements(snapshot.val())
      test = snapshot.val();
      //this.setState({userBrackets: snapshot.val() });
    });
    console.log('\ntest:', test);
    this.setState({load: true})
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.setState({dataSource: ds.cloneWithRows(test)});
    console.log('this.state:', this.state);
  }


  _noRowData () {
    console.log('5 .no row data');
    return true;  //this.state.dataSource.getRowCount() === 0
  }

  render () {
   console.log('6.render, props', this.props);
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

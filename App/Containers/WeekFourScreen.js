'use strict';
import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, ListView,TextInput ,TouchableHighlight, RecyclerViewBackedScrollView} from 'react-native'
import { connect } from 'react-redux'
var update = require('react-addons-update');
import { Images, Colors } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

import AlertMessage from '../Components/AlertMessageComponent'

import styles from './Styles/WeekOneScreenStyle'
import * as Firebase from 'firebase';

class WeekFourScreen extends React.Component {

  static propTypes = {
    weekFive: PropTypes.func,
    weekFourPicks: PropTypes.array,
    selectContestant: PropTypes.func,
    bracketId: PropTypes.string
    }
  
  
  constructor (props) {
    super(props)
    console.log('this.props: ', this.props)

    //this._renderRow.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this.selectContestant = this.selectContestant.bind(this);
    this.attemptNextScreen = this.attemptNextScreen.bind(this);

//move this
    const dataObjects = [
            {title: '1', added : false , description: 'First Description', image: 'cont1' },
            {title: '2', added : false, description: 'Second Description', image: 'cont2'},
            {title: '3', added : false ,description: 'Third Description', image: 'cont3'},
            {title: '4', added : false, description: 'Fourth Description', image: 'cont4'},
            {title: '5', added : false, description: 'Fifth Description', image: 'cont5'},
            {title: '6', added : false, description: 'Sixth Description', image: 'cont6'},
            {title: '7', added : false, description: 'Seventh Description', image: 'cont7'},
            {title: '8', added : false, description: '8 Description', image: 'cont8'},
            {title: '9', added : false, description: '9 Description', image: 'cont9'},
            {title: '10', added : false, description: '10 Description', image: 'cont10'},
            {title: '11', added : false, description: '11 Description', image: 'cont11'},
            {title: '12', added : false, description: '12 Description', image: 'cont12'},
            {title: '13', added : false, description: '13 Description', image: 'cont13'},
            {title: '14', added : false, description: '14 Description', image: 'cont14'},
            {title: '15', added : false, description: '15 Description', image: 'cont15'},
            {title: '16', added : false, description: '16 Description', image: 'cont16'},
            {title: '17', added : false, description: '17 Description', image: 'cont17'},
            {title: '18', added : false, description: '18 Description', image: 'cont18'},
            {title: '19', added : false, description: '19 Description', image: 'cont19'},
            {title: '20', added : false, description: '20 Description', image: 'cont20'},
            {title: '21', added : false, description: '21 Description', image: 'cont21'},
            {title: '22', added : false, description: '22 Description', image: 'cont22'},
            {title: '23', added : false, description: '23 Description', image: 'cont23'},
            {title: '24', added : false, description: '24 Description', image: 'cont24'},
            {title: '25', added : false, description: '25 Description', image: 'cont25'},
            {title: '26', added : false, description: '26 Description', image: 'cont26'},
      ]

    const rowHasChanged = (r1, r2) => r1 !== r2
    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})
    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      weekFourPicks: []
    }

  }

  _onHideUnderlay(){
    console.log('hide: ', this);
  }

  _renderRow (rowData) {
    let highlight  = 'none'
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {
            this.selectContestant(rowData);
          }
        }>
          <View style={styles[highlight]} >
            <Text style={styles.boldLabel}>{rowData.title}</Text>
            <Image style={styles.image}  source={Images[rowData.image]} /> 
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  selectContestant(contestant){
    //this.props.requestTemperature('Toronto')
    console.log('clicked:', contestant);
    console.log('this.state:', this.state)
    console.log('this.props:', this.props)
    contestant.added = !contestant.added
    if(contestant.added){
      contestant.added = true;
      this.setState({weekFourPicks: this.state.weekFourPicks.concat([contestant.title])});
    }
    else{
      for(let i =0; i<this.state.weekFourPicks.length; i++){
        if(this.state.weekFourPicks[i] === contestant.title){
          this.setState({
            weekFourPicks: update(this.state.weekFourPicks, {$splice: [[i, 1]]})
          })
        }
      }
    }

  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  attemptNextScreen () {
    if(this.state.weekFourPicks.length >= 4){
      //write to databse
      let currbracket = '-KQafDdpleLD1sxKH2wd'
      let uid  = Firebase.auth().currentUser.v
      firebase.database().ref('brackets/' + currbracket + `/${uid}`).child('weekFourPicks').set({
        0 : this.state.weekFourPicks[0],
        1 : this.state.weekFourPicks[1],
        2 : this.state.weekFourPicks[2],
        3 : this.state.weekFourPicks[3],
      })

      this.props.weekFive();
    }
    else{
      //alert here
      console.log('please select 4 contestants')
    }
  }

  render () {
    console.log('this.state.weekone:', this.state.weekOnePick)
    console.log('this in render', this)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Week 4</Text>
          <Text  style={styles.subtitle}>Select 15... {this.state.weekFourPicks.length}/15</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <ListView
            removeClippedSubviews = {false}
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          />
        </ScrollView>
        <RoundedButton text='Week 5 ->' onPress={this.attemptNextScreen} />
      </View>
    )
  }
}

/*WeekOneScreen.propTypes = {
  text: PropTypes.string.isRequired,
};*/

const mapStateToProps = (state) => {
  return {
    weekFive: NavigationActions.weekFive
   // weekFourPicks: NavigationActions.weekFive
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: NavigationActions.login,
    logout: () => dispatch(Actions.logout()),
    listviewExample: NavigationActions.listviewExample,
    listviewGridExample: NavigationActions.listviewGridExample,
  }
}

export default connect(mapStateToProps)(WeekFourScreen)

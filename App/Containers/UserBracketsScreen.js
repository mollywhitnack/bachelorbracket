import React from 'react'
import { View, ScrollView, TextInput,Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
//import JobCard from '../Components/JobCard'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'

import AlertMessage from '../Components/AlertMessageComponent'
//import Metrics from '../Themes/Metrics'
//import karmaTheme from '../NativeBase/karmaTheme'

import firebase from 'firebase'


class UserBracketsScreen extends React.Component {
  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds
    }

    this._renderItem = this._renderItem.bind(this)
  }

  componentDidMount () {
    let currUser = firebase.auth().currentUser.uid
    let uid  = firebase.auth().currentUser.v

    console.log('currUser:', currUser);
    console.log('uid:', uid);
    this.props.getBrackets(uid)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.brackets || {})
    })
  }

  render () {
    return (
      <Text>User Brackets</Text>
      )
  }
    /*<Container theme={karmaTheme} style={{ marginTop: 64, backgroundColor: cyan }}>
          <Content>
            <Tabs>
              <ListView
                tabLabel={'List'}
                removeClippedSubviews={false}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem}
                enableEmptySections
              />
              <MapView tabLabel={'Map'} />
          </Tabs>
          </Content>
        </Container>*/
      
  
  // <View style={styles.container}>
  //   <AlertMessage title='No Jobs in your area' show={this._noRowData()} />
  // </View>

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _renderItem (item, version, id) {
    const job = Object.assign({}, item, { id })
    return (
     {/* <JobCard
        handleClick={this.props.viewDetails}
        item={job}
        currLocation={this.props.currLocation}
      />*/}
    )
  }
}

const mapStateToProps = (state) => {
  return {
    brackets: state.brackets,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewDetails: job => {
      //dispatch(Actions.selectBracket(bracket))
      NavigationActions.bracketScreen()
    },
    getBrackets: (currUser) => {
      dispatch(Actions.userBracketsRequest(currUser))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBracketsScreen)
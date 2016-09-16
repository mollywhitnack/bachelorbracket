import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db } from '../Config/FirebaseConfig.js'
//import { dispatch } from '../../index.ios'

export default () => {
  function * worker (currUser) {
  console.log('in worker for ', currUser);

    yield put(Actions.clearBrackets())

      let ref = db.ref(`brackets/${currUser}`)
      console.log('ref: ', ref);
      ref.once('value', data => {
        console.log('data:', data);
        /*data = data.val()
        job.poster = data.poster
        if (currUser !== data.poster) {
          job.description = data.description
          job.title = data.title
          job.cost = data.cost
          job.posterName = data.posterName

        }*/
        dispatch(Actions.receiveBrackets(data))
      })
  }

  function * watcher () {
    console.log('in watcher');

    while (true) {
      console.log('yield user brackt request');
      const action = yield take(Types.USER_BRACKETS_REQUEST)

      const { currUser } = action
      yield call(worker, currUser)
    }
  }

  return {
    watcher,
    worker
  }
}
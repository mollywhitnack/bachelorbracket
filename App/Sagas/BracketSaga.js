import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db } from '../Config/firebaseConfig.js'
//import { dispatch } from '../../index.ios'

export default () => {
  function * worker (currUser) {
  console.log('in worker for ', currUser);

   // yield put(Actions.clearBrackets())
      console.log('currUser:', currUser );
      let ref = db.ref(`${currUser}`)
      console.log('ref: ', ref);

      let bracketArr = [];
      ref.once('value', snapshot => {
        console.log('snapshot:', snapshot);
        let brackets = snapshot.val();
        console.log('snapshot.val():', snapshot.val());

        for(let id in brackets){
          console.log('id:', id);
          let info = {
            name: brackets[id].name,
            emails: brackets[id].inviteEmails
          }
          bracketArr.push(info);
        }
      })
      console.log('bracketArr:', bracketArr)
      //yield put(Actions.receiveBrackets(bracketArr))
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
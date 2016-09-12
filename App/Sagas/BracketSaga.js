import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

export default (api) => {
  function * worker (input) {
    console.log('worker input: ', input);
    const response = yield call(api.lookup, input)

    console.log(response)
    if (response.ok) {
      const results = response.data
      yield put(Actions.receiveLookup({ results }))
    } else {
      yield put(Actions.receiveLookupFailure())
    }
  }

  function * watcher () {
    console.log('in watcher');
    while (true) {
      const { input } = yield take(Types.USERBRACKETS)
      yield call(worker, input)
    }
  }

  return {
    watcher,
    worker
  }
}
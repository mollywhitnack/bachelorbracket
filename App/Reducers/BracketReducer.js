import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  bracket: null,
  fetching: null,
  error: null,
})

// request temp
const request = (state, action) =>
  state.merge({
    fetching: true,
    bracket: null
  })

// receive currbracket
const receive = (state, action) =>
  state.merge({
    fetching: false,
    error: null,
    bracket: action.bracket
  })

// temp failure
const failure = (state, action) =>
  state.merge({
    fetching: false,
    error: true,
    bracket: null
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.BRACKET_REQUEST]: request,
  [Types.BRACKET_RECEIVE]: receive,
  [Types.BRACKET_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

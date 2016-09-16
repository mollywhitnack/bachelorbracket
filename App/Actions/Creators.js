import Types from './Types'

const attemptLogin = (username, password) =>
  ({ type: Types.LOGIN_ATTEMPT, username, password })

const loginSuccess = (username) =>
  ({ type: Types.LOGIN_SUCCESS, username })

const loginFailure = (errorCode) =>
  ({ type: Types.LOGIN_FAILURE, errorCode })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

//for user brackets screen
const userBracketsRequest = (currUser) =>{
  console.log('in get user brackets in actions for :', currUser);
  return ({
    currUser,
    type: Types.USER_BRACKETS_REQUEST
  })
}


const receiveBrackets = (brackets) => ({
  type: Types.BRACKETS_RECIEVE,
  brackets
})

const selectBracket = (bracket) => ({
  bracket,
  type: Types.SELECT_BRACKET_FOR_DETAILS
})

/*const bracketsRequest = (currUser) => {
  return ({
    currUser,
    type: Types.BRACKETS_REQUEST
  })
}*/


export default {
  userBracketsRequest,
  receiveBrackets,
  attemptLogin,
  loginSuccess,
  loginFailure,
  logout,
  startup,
  selectBracket,
}

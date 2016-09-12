import Types from './Types'

const attemptLogin = (username, password) =>
  ({ type: Types.LOGIN_ATTEMPT, username, password })

const loginSuccess = (username) =>
  ({ type: Types.LOGIN_SUCCESS, username })

const loginFailure = (errorCode) =>
  ({ type: Types.LOGIN_FAILURE, errorCode })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

const getUserBrackets = (currUser) =>{
  return ({
    currUser,
    type: Types.GET_USER_BRACKETS
  })
}

export default {
  getUserBrackets,
  attemptLogin,
  loginSuccess,
  loginFailure,
  logout,
  startup,
}

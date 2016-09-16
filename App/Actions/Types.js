// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`
  LOGIN_ATTEMPT
  LOGIN_SUCCESS
  LOGIN_FAILURE

  LOGOUT

  STARTUP

  USERBRACKETS

  SELECT_BRACKET_FOR_DETAILS

  USER_BRACKETS_REQUEST
  BRACKETS_RECIEVE

`)

import {
  LOGIN_START,
  LOGIN_ERROR_MSG,
  LOGIN_AUTH_SUCCESS,
  REMOVE_LOGIN_ERROR_MSG,
  LOGIN_AUTH_FALSE
} from '../action/auth'

const defaultState = {
  user: {},
  errMsg: {},
  loginAuthSuccess: false,
  isProcessing: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_START:
    case LOGIN_ERROR_MSG:
    case LOGIN_AUTH_SUCCESS:
    case LOGIN_AUTH_FALSE:
      return {
        ...state,
        ...action.payload
      }
    case REMOVE_LOGIN_ERROR_MSG:
      let errMessages = state.errMsg
      if (!!action.fieldName && !!errMessages[action.fieldName]) {
        delete errMessages[action.fieldName]
      }
      return {
        ...state,
        ...errMessages
      }
    default:
      return state
  }
}
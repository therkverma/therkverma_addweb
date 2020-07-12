import {
  SIGNUP_START,
  SIGNUP_ERROR_MSG,
  REMOVE_SIGNUP_ERROR_MSG
} from '../action/signUp'

const defaultState = {
  errMsg: {},
  isProcessing: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SIGNUP_START:
    case SIGNUP_ERROR_MSG:
      return {
        ...state,
        ...action.payload
      }
    case REMOVE_SIGNUP_ERROR_MSG:
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
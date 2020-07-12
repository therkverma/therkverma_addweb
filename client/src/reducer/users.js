
import {
    HANDLE_PROCESSING,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR 
  } from '../action/users'
  
  const defaultState = {
    users: [],
    user: {},
    total: 0,
    errMsg: {},
    isProcessing: false
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case HANDLE_PROCESSING:
      case FETCH_USERS_SUCCESS:
      case FETCH_USERS_ERROR:
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
  }
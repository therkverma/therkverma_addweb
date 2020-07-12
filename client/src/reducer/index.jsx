import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import users from './users'
import signUp from './signUp'

const rootReducer = combineReducers({
  form: formReducer,
  users,
  auth,
  signUp
})

export default rootReducer
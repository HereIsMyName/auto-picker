import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import resourceReducer from './resourceReducer'
import carReducer from './carReducer'


export default combineReducers({
  auth: authReducer,
  form: formReducer,
  res: resourceReducer,
  cars: carReducer
})
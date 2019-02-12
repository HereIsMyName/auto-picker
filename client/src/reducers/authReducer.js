import { 
  SIGN_UP, 
  SIGN_IN, 
  SIGN_OUT, 
  AUTH_ERROR, 
  CLEAR_ERROR 
} from '../actions/types'

const INITIAL_STATE = {
  token: '',
  isAuthenticated: false,
  error: ''
}

const authReducer = (state = INITIAL_STATE, action) => {
  if(action.type === SIGN_UP){
    return { ...state, token: action.payload, isAuthenticated: true, error: '' }
  }

  if(action.type === SIGN_IN){
    return { ...state, token: action.payload, isAuthenticated: true, error: '' }
  }

  else if(action.type === SIGN_OUT) {
    return { ...state, token: action.payload, isAuthenticated: false, error: ''}
  }

  else if(action.type === AUTH_ERROR){
    return { ...state, error: action.payload }
  }

  else if (action.type === CLEAR_ERROR) {
    return { ...state, error: ''}
  }
  
  else
    return state
}

export default authReducer
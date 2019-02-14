import { 
  ACCESS_RESOURCE, 
  SIGN_OUT,
  DELETE_CAR_DB, 
  DELETE_ALL_CARS_DB 
} from '../actions/types'

const INITIAL_STATE = {
  userCars: [],
  userName: ''
}

const authReducer = (state = INITIAL_STATE, action) => {
  if(action.type === ACCESS_RESOURCE){
    return { ...state, userCars: action.payload.cars, userName: action.payload.name }
  }

  if(action.type === DELETE_CAR_DB){
    let newList = state.userCars.filter(car => {
      return action.payload !== car
    })
    return {
      ...state, userCars: newList
    }
  }

  if(action.type === DELETE_ALL_CARS_DB){
    return { ...state, userCars: []}
  }

  if(action.type === SIGN_OUT){
    return { ...state, userCars: [], userName: '' }
  }

  else
    return state
}

export default authReducer
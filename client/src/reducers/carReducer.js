import { 
  ADD_CAR, 
  REMOVE_CAR,
  REMOVE_ALL_CARS
} from '../actions/types'

const INITIAL_STATE = {
  models: []
}

// Car reducer handles locally stored cars, not on db
const carReducer = (state = INITIAL_STATE, action) => {
  if(action.type === ADD_CAR) {
    let list = state.models.filter(car => {
      return action.model !== car.model
    })
    return {
      ...state, models:[ ...list, action.model]
    }
  }

  else if(action.type === REMOVE_CAR) {
    let newList = state.models.filter(car => {
      return action.model !== car.model 
    })
    return {
      ...state, models: newList
    }
  }

  else if(action.type === REMOVE_ALL_CARS) {
    return {
      models: action.payload
    }
  }

  else
    return state;
}

export default carReducer;
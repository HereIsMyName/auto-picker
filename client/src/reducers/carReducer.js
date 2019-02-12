import { 
  DELETE_ALL_CARS,
  ADD_CAR, 
  DELETE_CAR 
} from '../actions/types'

const INITIAL_STATE = {
  models: []
}

const carReducer = (state = INITIAL_STATE, action) => {
  if(action.type === ADD_CAR) {
    let list = state.models.filter(car => {
      return action.model !== car.model
    })
    return {
      ...state, models:[ ...list, action.model]
    }
  }

  else if(action.type === DELETE_CAR) {
    let newList = state.models.filter(car => {
      return action.model !== car.model 
    })
    return {
      ...state, models: newList
    }
  }

  else if(action.type === DELETE_ALL_CARS) {
    return {
      models: action.payload
    }
  }

  else
    return state;
}

export default carReducer;
import axios from 'axios'
import { 
  SIGN_UP, 
  SIGN_IN, 
  SIGN_OUT,
  ACCESS_RESOURCE, 
  AUTH_ERROR, 
  CLEAR_ERROR,
  DELETE_ALL_CARS,
  REMOVE_CAR_DB,
  REMOVE_ALL_CARS_DB,
  ADD_CAR, 
  DELETE_CAR 
} from './types'


export const signUp = data => {
  
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/signup', data)

      dispatch({
        type: SIGN_UP,
        payload: res.data.webToken
      })

      localStorage.setItem('WEB_TOKEN', res.data.webToken)
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Username already in use'
      })
    }
  }
}


export const signIn = data => {
  
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/signin', data)

      dispatch({
        type: SIGN_IN,
        payload: res.data.webToken
      })

      localStorage.setItem('WEB_TOKEN', res.data.webToken)
    } 
    catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Incorrect username and/or password'
      })
    }
  }
}


// Gets cars models 
export const getCars = (carModel) => {

  return async dispatch => {
    try {
      return await axios.get(`http://localhost:5000/cars/${carModel}`)
    }
    catch(err) {
      console.error('err ', err)
    }
  }
}

// Gets car categories for popup
export const getPopupCars = (carModel) => {

  return async dispatch => {
    try {
      return await axios.get('http://localhost:5000/car-finder')
    }
    catch(err) {
      console.error('err ', err)
    }
  }
}


// Gets user's protected content 
export const getResource = () => {

  return async dispatch => {
    try {
      const res = await axios.get('http://localhost:5000/secret')
      dispatch({
        type: ACCESS_RESOURCE,
        payload: res.data
      })
    }
    catch(err) {
      console.error('err ', err)
    }
  }
}


export const signOut = () => {

  return dispatch => {
    localStorage.removeItem('WEB_TOKEN')
    dispatch({
      type: SIGN_OUT,
      payload: ''
    })
  }
}


export const deleteAccount = (data) => {

  return async dispatch => {
    try {
      const res = await axios.delete('http://localhost:5000/deleteAccount', {data})
      localStorage.removeItem('WEB_TOKEN')
      dispatch({
        type: SIGN_OUT,
        payload: ''
    })

    return res
    }
    catch(err) {
      return 'error'
    }
  }
}


export const clearError = () => {

  return dispatch => {
    dispatch({
      type: CLEAR_ERROR
    })
  }
}


// Adds selected cars to user's account
export const submitCars = (data) => {
  return async dispatch => { 
    try {
      await axios.put('http://localhost:5000/addcar', data)
      dispatch({
        type: DELETE_ALL_CARS,
        payload: []
      }) 
    }
    catch(err) {
      console.error('err ', err)
    } 
  }
}


// Deletes selected car from user's account
export const removeCar = (data) => {
  return async dispatch => { 
    try {
      await axios.delete('http://localhost:5000/removeCar', {data})
      dispatch({
        type: REMOVE_CAR_DB,
        payload: data
      }) 
    }
    catch(err) {
      console.error('err ', err)
    } 
  }
}


// Deletes all cars from user's account
export const deleteAllCars = () => {
  return async dispatch => { 
    try {
      await axios.delete('http://localhost:5000/deleteAllCars')
      dispatch({
        type: REMOVE_ALL_CARS_DB
      }) 
    }
    catch(err) {
      console.error('err ', err)
    } 
  }
}


// Add cars to store
export const addCar = (model) => {
  return dispatch => { 
    dispatch({
      type: ADD_CAR, 
      model
    }) 
  }
}


// Remove cars from store
export const deleteCar = (model) => {
  return dispatch => { 
    dispatch({
      type: DELETE_CAR, 
      model
    }) 
  }
}


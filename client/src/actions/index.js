import axios from 'axios'
import baseUrl from './url-config'
import { 
  SIGN_UP, 
  SIGN_IN, 
  SIGN_OUT,
  ACCESS_RESOURCE, 
  AUTH_ERROR, 
  CLEAR_ERROR,
  DELETE_CAR_DB,
  DELETE_ALL_CARS_DB,
  ADD_CAR, 
  REMOVE_CAR,
  REMOVE_ALL_CARS
} from './types'


export const signUp = data => {
  
  return async dispatch => {
    try {
      const res = await axios.post(`${baseUrl}/signup`, data)

      dispatch({
        type: SIGN_UP,
        payload: res.data.webToken
      })

      localStorage.setItem('WEB_TOKEN', res.data.webToken)
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Username already taken'
      })
    }
  }
}


export const signIn = data => {
  
  return async dispatch => {
    try {
      const res = await axios.post(`${baseUrl}/signin `, data)

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
      return await axios.get(`${baseUrl}/cars/${carModel}`)
    }
    catch(err) {
      console.error('error ', err)
    }
  }
}


// Gets user's content 
export const getResource = () => {

  return async dispatch => {
    try {
      const res = await axios.get(`${baseUrl}/secret`)
      dispatch({
        type: ACCESS_RESOURCE,
        payload: res.data
      })
    }
    catch(err) {
      console.error('error ', err)
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
      const res = await axios.delete(`${baseUrl}/deleteAccount`, {data})
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
      await axios.put(`${baseUrl}/addcar`, data)

      // Cars are removed from store when added to account
      dispatch({
        type: REMOVE_ALL_CARS,
        payload: []
      }) 
    }
    catch(err) {
      console.error('error ', err)
    } 
  }
}


// Deletes selected car from user's account
export const deleteCar = (data) => {
  return async dispatch => { 
    try {
      await axios.delete(`${baseUrl}/deleteCar`, {data})
      dispatch({
        type: DELETE_CAR_DB,
        payload: data
      }) 
    }
    catch(err) {
      console.error('error ', err)
    } 
  }
}


// Deletes all cars from user's account
export const deleteAllCars = () => {
  return async dispatch => { 
    try {
      await axios.delete(`${baseUrl}/deleteAllCars`)
      dispatch({
        type: DELETE_ALL_CARS_DB
      }) 
    }
    catch(err) {
      console.error('error ', err)
    } 
  }
}

// Gets car categories for popup
export const getPopupCars = (carModel) => {

  return async dispatch => {
    try {
      return await axios.get(`${baseUrl}/car-finder`)
    }
    catch(err) {
      console.error('error ', err)
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


// Remove selected car from store
export const removeCar = (model) => {
  return dispatch => { 
    dispatch({
      type: REMOVE_CAR, 
      model
    }) 
  }
}

// Removes all cars from store
export const removeAllCars = (model) => {
  return dispatch => { 
    dispatch({
      type: REMOVE_ALL_CARS,
      payload: []
    }) 
  }
}


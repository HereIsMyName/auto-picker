// Cars added to carSelector page are created here

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react'
import * as actions from './../actions/index'

class CarAdder extends Component {
  state= {
    hasSubmitted: false,
    carLength: 0,
    errMsg: ''
  }

  deleteCar = (model) => {
    this.props.deleteCar(model)
  }

  addCars = (cars, token) => {
    if(!this.props.cars.length) {
      this.setState({errMsg: 'No cars to add'})
    }

    else if(this.props.cars.length) {
      (()=>{
          this.setState({
          carLength: this.props.cars.length
        })
      })()

      this.props.submitCars(cars)

      this.setState({
        hasSubmitted: true,
        errMsg: ''
      })
      this.props.getResource()
    }
  }
  
  
  render() {
    const { cars } = this.props
    const { carLength } = this.state
    const token = localStorage.getItem('WEB_TOKEN')
    const carList = this.props.cars.length ? (
      cars.map(car => {
        return (
          <div className='carSelection' key={car.model}>
            <span>{car.model}</span>
            <br />  
            <span>class: {car.carClass}</span>
            <img src={require(`../images/${car.carClass}.jpeg`)} alt={car.carClass}/>
            <br />
            <button onClick={() => this.deleteCar(car.model)}>Remove</button>
          </div>
        )
      })
    ) : (
    <div style={{display: 'inline-block', padding: '37px 21px', border: '1px solid black'}}>
      <p>Vehicles selected are displayed here</p>
    </div>
  )
  return (
    <div className="collection">
      <div>
        <div className ='infoBody'>
        <h2>Cars Selected</h2>
        <h4>Cars shown represent vehicle class</h4>
        {
          token ?
            <div className=''>
              <span>Save cars to your account</span>
              <button onClick={() => this.addCars(cars, token)}>Save Cars</button>
              <br />
              {
                this.state.errMsg && !this.state.hasSubmitted ?
              <Message warning compact>
                <Message.Header align='center'>
                  You have not selected any cars
                </Message.Header>
                <p>
                  Check out the cars page to see your choices
                </p>
              </Message>
              : null
              }
              {
                this.state.hasSubmitted ?
                <Message positive compact>
                  <Message.Header align='center'>
                    { carLength } { carLength === 1 ? ' car has ' : ' cars have ' } been saved to your 
                    <Link to='/account'> Account</Link>
                  </Message.Header>
                </Message>
                : null
              }
            </div>
            : null
        }
        <br />
        {carList}
        </div>
      </div>
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars.models,
    authData: state.auth,
    res: state.res.userCars
  }
}

export default connect(mapStateToProps, actions)(CarAdder)

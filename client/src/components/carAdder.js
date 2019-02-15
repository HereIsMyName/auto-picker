// Cars added to carSelector page are created here

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Message, Button, Modal } from 'semantic-ui-react'
import * as actions from './../actions/index'

class CarAdder extends Component {
  state= {
    hasSubmitted: false,
    carLength: 0,
    errMsg: '',
    open: false
  }

  show = () => () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  removeCar = (model) => {
    this.props.removeCar(model)
  }

  removeAllCars = () => {
    this.close()
    this.props.removeAllCars()
  }

  addCars = (cars, token) => {
    if(!this.props.cars.length) {
      this.setState({errMsg: 'No cars to add'})
    }
    else {
      // State is saved to display # of cars saved to db after removal from state
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
      // Resource retrieved to update info
      this.props.getResource()
    }
  }
  
  
  render() {
    const { cars } = this.props
    const { carLength, open, close } = this.state
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
            <Button basic color='red' size='mini' onClick={() => this.removeCar(car.model)}>Remove</Button>
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
              <Button color='blue' size='mini' onClick={() => this.addCars(cars, token)}>Save Cars</Button>
              <br />
              {
                // Cars must be saved to state in order to add to db
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
                // Message shown when car data submitted to db
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
          : <p>Sign in to add cars to your account</p>
        }
        <br />
        <Modal size='mini' open={open} onClose={close}>
          <Modal.Header>Remove all cars</Modal.Header>
          <Modal.Content>
            <p>This will remove all cars selected</p>
          </Modal.Content>
          <Modal.Actions>
            <Button 
              positive
              content='Yes' 
              onClick={this.removeAllCars} 
            />
            <Button negative onClick={this.close}>No</Button>
          </Modal.Actions>
        </Modal>
        <Button disabled={!cars.length ? true : null} basic color='black' onClick={this.show()}> Remove All</Button>
        <br />
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

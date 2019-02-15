import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Modal, Message, Dropdown, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'

class Account extends Component {
  state = { 
    delCars: {
      open: false
    },
    delAcct: {
      open: false,
      password: '',
      error: '',
      success: ''
    },
  }

  show = type => () => this.setState({ [type]: { open: true } })
  close = () => this.setState({
    delCars: {
      open: false,
    },
    delAcct: {
      open: false,
      password: '',
      error: ''
    }
  })

  handleChange = (event) => {
    this.setState({password: event.target.value})
  }

  deleteCar = model => {
    this.props.deleteCar(model)
  }

  deleteAllCars = () => {
    this.close()
    this.props.deleteAllCars()
  }

  signOut = () => {
    this.props.signOut()
  }

  deleteUser = () => {
    this.props.deleteAccount({
      username: this.props.userInfo.userName, 
      password: this.state.password
    })
    .then(res => {
      if(res === 'error') {
        this.setState({delAcct: {error: 'Incorrect Password'}})
      }
      else {
        this.close()
        this.setState({delAcct: {success: res.data}})
      }
    })

  }

  async componentDidMount() {
      this.props.getResource()
  }

  
  render() {
    const { userCars, userName } = this.props.userInfo
    const { delCars, delAcct } = this.state
    const token = localStorage.getItem('WEB_TOKEN')
    const carList = userCars.length ? (
      userCars.map(car => {
        return (
          <div className='carSelection' key={car.model}>
            <span>{car.model}</span>
            <br />  
            <span>class: {car.carClass}</span>
            <img src={require(`../images/${car.carClass}.jpeg`)} alt={car.carClass}/>
            <br />
            <br />
            <Button color='red' size='mini' onClick={() => this.deleteCar(car)}>Delete</Button>
          </div>
        )
      })
    ) : (
    <div style={{display: 'inline-block', padding: '37px 21px', border: '1px solid black'}}>
      <p>Your have no vehicles saved</p>
    </div>
  )
  return (
    <div className="collection">
      {
        token ?
        <div>
          <div className ='infoBody' style={{padding: 'initial'}}>    
            <div style={{backgroundColor: '#f7f7f7', padding: '20px'}}>    
              <h2 >Welcome { userName }</h2>
              <span><Link to='/' onClick={this.signOut}>Sign Out</Link></span>
              
              
            
              {/* Settings dropdown */}
              <span>
                <Dropdown text='Settings' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                    <p onClick={this.show('delAcct')}>Delete Account</p>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
              
              {/* Popup to delete all cars */}
              <Modal size='mini' open={delCars.open} onClose={this.close}>
                <Modal.Header>Delete all your cars</Modal.Header>
                <Modal.Content>
                  <p>This will delete all cars from your account</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button 
                    positive
                    content='Yes' 
                    onClick={this.deleteAllCars} 
                  />
                <Button negative onClick={this.close}>No</Button>
                </Modal.Actions>
              </Modal>
              
              {/* Popup to delete account */}
              <Modal size='mini' open={delAcct.open} onClose={this.close}>
                <Modal.Header>Delete your account</Modal.Header>
                <Modal.Content>
                  <h5>Enter your password to delete</h5>
                  <Form id='delForm'>
                  <input 
                    value={this.state.delAcct.password} 
                    onChange={this.handleChange} 
                    type='password' 
                    name='password'
                    placeholder='Enter password'  />
                </Form>

                {/* Shows if password is incorrect to delete account */}
                {
                  delAcct.error ?
                  <Message negative>
                    {delAcct.error}
                  </Message> : null
                }
                </Modal.Content>
                <Modal.Actions>
                  <Button 
                    positive
                    content='delete' 
                    onClick={this.deleteUser} 
                    form='delForm'
                  />
                  <Button type='submit' negative onClick={this.close}>cancel</Button>
                </Modal.Actions>
                
              </Modal>
            </div>
          
            <h3>{this.props.userInfo.userCars.length} cars saved</h3> 

                <Button disabled={!userCars.length ? true : null} basic color='red' onClick={this.show('delCars')}>Delete All Cars</Button>
              <br />
              <br />
              {carList}
          </div>
        </div>
        
        //Shows if not signed in or after successful account deletion
        : !delAcct.success ?
            <h3>Please <Link to='/signin'>sign in</Link></h3>
          : <h2>{delAcct.success}</h2>
          
      }
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars.models,
    authData: state.auth.authData,
    userInfo: state.res
  }
}

export default connect(mapStateToProps, actions)(Account)

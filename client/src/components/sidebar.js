import React, { Component } from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from './../actions/index'


class Side extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false 
    }
    
    this.signOut = this.signOut.bind(this);
  }
  
  
  signOut() {
    this.props.signOut()
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state
    const token = localStorage.getItem('WEB_TOKEN')
    
    return (
      <div>
        <div className='sidebarButton'>
          <Icon name='content' size='big' onClick={this.handleButtonClick} />
        </div>
        <div id='sidebar'>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={this.handleSidebarHide}
          onClick={this.handleSidebarHide}
          vertical
          visible={visible}
          width='thin'          
        >
          <Menu.Item>
          </Menu.Item>
          <Link to=''>
            <Menu.Item>
              <Icon name='home' />
              Home
            </Menu.Item>
          </Link>
          <Link to='/about'>
            <Menu.Item>
              <Icon name='road' />
              About
            </Menu.Item>
          </Link>
          <Link to='/cars'>
            <Menu.Item>
              <Icon name='car' />
              Cars
            </Menu.Item>
          </Link>
          <Link to='/selections'>
            <Menu.Item>
              <Icon name='list' />
              Selections
              <br />
              {this.props.cars.length}
            </Menu.Item>
          </Link>
          {
            !token ?
            <div>
              <Link to='/signin'>
              <Menu.Item>
                <Icon name='user' />
                Sign In
              </Menu.Item>
            </Link>
            <Link to='/signup'>
              <Menu.Item>
                <Icon name='signup' />
                Sign up
              </Menu.Item>
            </Link>
          </div>
            : 
          <div>
            <Link to='/account'>
              <Menu.Item>
                <Icon name='user' />
                My Account
              </Menu.Item>
            </Link>
            <Link to='/' onClick={this.signOut}>
              <Menu.Item>
                <Icon name='sign out' />
                Sign Out
              </Menu.Item>
            </Link>
          </div>
          }
        </Sidebar>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars.models,
    userInfo: state.res
  }
}

export default connect(mapStateToProps, actions)(Side)

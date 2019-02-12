import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react'; 
import { connect } from 'react-redux';
import * as actions from './../actions/index'

class Navigation extends Component {


  render() {
    return (
      <div className="navlist">
        <ul>
          <Responsive minWidth={700}>
            {
              this.props.isAuth ?
                <NavLink to='/account'><li className="nav-item" id='navI0' style={{textDecoration: 'underline'}}>My Account</li></NavLink>
              : <NavLink to='/signin'><li className="nav-item" id='navI0'>Sign In</li></NavLink>
            }
          </Responsive>
          <NavLink to='/selections' ><li className="nav-item" id='navI1'>Selections {this.props.cars.length}</li></NavLink>
          <Responsive minWidth={700}>
            <li className='nav-item' id='navI2'><NavLink to='/cars' style={{ color: 'rgb(49, 41, 41)' }}>Cars</NavLink></li>
          </Responsive>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars.models,
    isAuth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(Navigation);
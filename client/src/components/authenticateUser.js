import React, { Component } from 'react';
import { connect } from 'react-redux';

export default(Component) => {
  class MixedComponent extends Component {

    // componentDidMount() {
    //   if(this.props.authData.isAuthenticated && this.props.authData.token) {
    //   }
    //   else {
    //     console.error('Request denied')
    //   }
    // }

    // componentDidUpdate() {
    //   if(this.props.authData.isAuthenticated && this.props.authData.token) {
    //   }
    //   else {
    //     console.Error('Request denied')
    //   }
    // }

    render() {
      return <Component />
    }
  }

  const mapStateToProps = (state) => {
    return {
      authData: state.auth
    }
  }

  return connect(mapStateToProps)(MixedComponent)
}


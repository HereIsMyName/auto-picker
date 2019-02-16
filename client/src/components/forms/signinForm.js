import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from '../../actions/index'
import FormError from "./form-error"


class SigninForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
  }


  async onSubmit(userInput) {
    const { username, password } = userInput 

    const check = this.validate(username, password)

    this.setState({ error: check });

    if (Object.keys(check).length === 0) {
      await this.props.signIn(userInput)
      
      if (!this.props.authData.error) {
        window.location.reload()
        this.props.history.push('/')
      }
        
    }
  };

  componentWillUnmount() {
    this.props.clearError()
  }
  
  validate(u, p) {
    const error = this.state.error
    if (!u) error.username = "Please enter a username"
    else if(u.length < 6) error.username = "username must be more than 5 characters"
    else delete error.username
    if (!p) error.password = "Please enter a password"
    else if(p.length < 6) error.password = "Password must be more than 5 characters"
    else delete error.password
    return error
  }

  render() {
    const { authData, handleSubmit } = this.props
    const { error } = this.state
    return (
      <div>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Form.Field error={!!error.username}>
            <label htmlFor="username">Username</label>
            <Field 
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              component="input"
            />
            {error.username && <FormError text={error.username} />}
          </Form.Field>
          <Form.Field error={!!error.password}>
            <label htmlFor="password">Password</label>
            <Field 
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              component="input"
            />
            {error.password && <FormError text={error.password} />}
          </Form.Field>
          <Button primary fluid>Submit</Button>
          <br />
          <br />
          <span>New User?</span>
          <Link to="/signup"> Sign Up</Link>
          <br />
          <br />
          { 
            // Sets an error if username / password finds no match 
            authData.error ?
            <span className="ui red message">{authData.error}</span>
              : null
          }
        </Form>
      </div>
    );
  }
}

SigninForm.propTypes = {
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth
  }
}

export default withRouter(compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin'})
)(SigninForm))


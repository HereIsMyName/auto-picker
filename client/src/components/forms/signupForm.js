import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions/index'
import FormError from "./form-error";


class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  
  async onSubmit(userInput) {
    const { username, password } = this.state  
    const check = this.validate(username, password);

    this.clearError();
    this.setState({ error: check });

    if (Object.keys(check).length === 0) {
      await this.props.signUp(userInput)

      if(!this.props.authData.error) {
        window.location.reload()
        this.props.history.push('/')
      }
    }
  };
    
  componentWillUnmount() {
    this.props.clearError()
  }
    
    validate(u, p) {
      const error = this.state.error;
      if (!u) error.username = "Please enter a username";
      else if(u.length < 6) error.username = "username must be more than 5 characters"
      if (!p) error.password = "Please enter a password";
      else if(p.length < 6) error.password ="Password must be more than 5 characters";
      return error;
    }
    
    clearError() {
      this.setState({error: {}});
    }
    
    
  render() {
    const { authData, handleSubmit } = this.props
    const { error } = this.state

    return (
      <div>
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Form.Field error={error.username}>
          <label htmlFor="username">Username</label>
          <Field 
            type="text"
            name="username"
            id="username"
            onChange={this.handleChange}
            placeholder="Enter a username"
            component="input"
          />
          {error.username && <FormError text={error.username} />}
        </Form.Field>
        <Form.Field error={error.password}>
          <label htmlFor="password">Password</label>
          <Field 
            type="password"
            name="password"
            id="password"
            onChange={this.handleChange}
            placeholder="Enter a Password"
            component="input"
          />
          {error.password && <FormError text={error.password} />}
        </Form.Field>
        <Button primary fluid>Submit</Button>
        <br />
        <br />
        <span>Already have an account?</span>
        <Link to="/signin"> Sign In</Link>
        <br />
        <br />
        { 
          authData.error ?
          <span className="ui red message">{authData.error}</span>
            : null
        }
      </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signUp: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth
  }
}

export default withRouter(compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup'})
)(SignupForm))

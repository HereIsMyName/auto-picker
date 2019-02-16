import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from "./forms/signupForm";

class SignupPage extends Component {

    render() {
        const token = localStorage.getItem('WEB_TOKEN')
        return (
            <div>
            {
                !token ?
                <div>
                    <h1>Create an Account</h1>
                    <SignupForm submit={this.submit} />
                </div>
                : <div>
                    <h2>You are already signed in</h2>
                    <h3><Link to='/account'>My Account</Link></h3>
                  </div>
                }
            </div>
        );
    }
}

export default SignupPage;
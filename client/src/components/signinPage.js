import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SigninForm from './forms/signinForm';


class SigninPage extends Component {

    render() {
        const token = localStorage.getItem('WEB_TOKEN')
        return (
            <div>
                {
                !token ?
                <div>
                    <h1>Sign In</h1>
                    <SigninForm submit={this.submit} />
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


export default SigninPage;
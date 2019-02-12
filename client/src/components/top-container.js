import React from 'react';
import Navigation from './navigation';
import { Image } from 'semantic-ui-react'
import logo from './../images/logo.png'

const TopContainer = () => {
    return (
        <div className="top-container">
            <div id="logo">
                <Image size='small' src={logo} />
            </div>
                <Navigation />
        </div>
    );
}

export default TopContainer;
import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import {Submit} from './finder';
import PropTypes from 'prop-types';

class CarFinder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            error: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
           data: { ...this.state.data, [name]: value} 
        });
      }
    
    clearError = () => {
        this.setState({
            error: ''
        });
    }
    
    handleSubmit = () => {
        const {data} = this.state;
        this.clearError();
        if (Object.keys(data).length >= 3) {  
            const submit = Submit(data); 
            this.props.submit(submit);
        } 
        else{
            this.setState({
                 error: "Please select all fields"
            });
        }
    };
    
    render() {
        return (
            <div id='finder-form'>
                <Form onSubmit={this.handleSubmit} id="carform">
                <p>Select a vehicle size</p>
                <select defaultValue="" name="size" form="carform"  onChange={this.handleChange}>
                    <option value="" disabled>Select a size</option>
                    <option value="small">Small</option>
                    <option value="midsize">Midsize</option>
                    <option value="large">Large</option>
                </select>
                <p>Primary usage of the vehicle</p>
                <select defaultValue="" name="usage" form="carform"  onChange={this.handleChange}>
                    <option value="" disabled>Select vehicle usage</option>
                    <option value="commute">Commute</option>
                    <option value="family">Family</option>
                    <option value="leisure">Leisure</option>
                    <option value="utility">Utility</option>
                </select>
                <p>Fuel economy</p>
                <select defaultValue="" name="fuel" form="carform"  onChange={this.handleChange}>
                    <option value="" disabled>Select fuel economy</option>
                    <option value="economic">Economical</option>
                    <option value="moderate">Moderate</option>
                    <option value="power">More power</option>
                </select>
                <Header as='h4' color='red'>{this.state.error}</Header>
                    <Button primary>Find Car</Button>
                </Form>
            </div>
        );
    }
}

CarFinder.propTypes = {
  submit: PropTypes.func.isRequired
}
            
export default CarFinder;
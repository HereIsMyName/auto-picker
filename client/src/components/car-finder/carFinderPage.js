import React, { Component } from 'react';
import { connect } from 'react-redux'
import "@babel/polyfill";
import InfoBox from "../../components/infoBox";
import CarFinder from "./car-finder";
import CarFinderResults from "./carFinder-results";
import * as actions from '../../actions/index'


class CarFinderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            isChanged: false,
            models: []
        }

        this.submit = (cars) => {
            this.setState(prevState => ({
                cars: cars,
                isChanged: true
            }));
        }
    }

    // Gets car categories for popup
    componentDidMount() {
        this.props.getPopupCars()
        .then(models => {
            this.setState({models: models.data})
        })       
    }
    
    
    render() {
        const { models } = this.state
        return (
            <div>
                <h1 style={{ whiteSpace: 'nowrap' }}>Find Your Vehicle</h1>
                {!this.state.isChanged ? <CarFinder submit={this.submit}/> : <CarFinderResults displayCars={this.state.cars} />}
                <InfoBox models={models}/>
            </div>
        );
    }
    
}

export default connect(null, actions)(CarFinderPage)

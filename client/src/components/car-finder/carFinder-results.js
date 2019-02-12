// Displays results of carFinderPage

import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CarFinderResults = (props) => {

    const refresh = (e) => {
        window.location.reload();
    }

    return (
        <div className='groupItem'>
            <h3 onClick={(e) => {refresh(e)}}>New Search</h3>
            <h3>{props.displayCars.length > 0 ? 'Recommended Cars': 'No Results'}</h3>
            <div className='results'>
            <Grid stackable divided='vertically' align='center'>
            <Grid.Row columns={props.displayCars.length > 0 ? props.displayCars.length : 1} >
            {
                props.displayCars.map(car => {
                    return (
                    <Grid.Column key={car}>
                        <Link to={`/cars/${car}`}>
                            <Image size='small' src={require(`../../images/${car}.jpeg`)}  />
                        </Link>
                        <Header as='h3'>{car}</Header>
                    </Grid.Column>
                    )
                })
            }
            </Grid.Row>
            </Grid>
            </div>
        </div>
    );
}

CarFinderResults.propTypes = {
    displayCars: PropTypes.array
}

export default CarFinderResults;
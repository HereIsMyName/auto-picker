import React, { Component } from 'react';
import { Loader, Button } from 'semantic-ui-react'
import Bread3 from '../../components/bread3';
import { connect } from 'react-redux';
import * as actions from '../../actions/index'

class CarModels extends Component {
    state= {
        models:[{}],
        notLoaded: false,
        dberror: ''
    }

    componentDidMount() {

        const { carModel } = this.props.match.params

        // matches link for car model and is passed into databases search
        this.props.getCars(carModel)
            .then(models => {
                if(models.data.length) {
                    this.setState({ models: models.data })
                }
                else this.setState({notLoaded: true})
            })
            .catch(err => {
                this.setState({
                    dberror: err
                })
            })
    }

    handleClick = (model) => {
        const obj = this.props.cars.filter(car => {
            return car.model === model.model
        })
        if(!obj.length) {
            this.props.addCar(model);
        }
        else {
            this.props.removeCar(obj[0].model)
        }
    }


    render() {
        const { models } = this.state
        const { cars, res } = this.props
        const { carModel } = this.props.match.params

        let modelList = models[0].model ? (models.map((carModel, i) => {
            let dbMatch = res.find(dbcar => dbcar.model === carModel.model)
            let cName = cars.find(cars => cars.model === carModel.model) ? 'picked': ''
                
                return (
                    
                    // Checks if cars are saved to user's account and won't show if so
                    !dbMatch ?
                        <div  key={carModel.model}>
                            <p>{carModel.model} <Button basic color={!cName ? 'black' : 'red'} size='mini' className={cName} onClick={() => this.handleClick(carModel)}>{cName? 'Remove' : 'Add Car'}</Button></p>
                        </div>
                    : null
                )
            })
        ) :  <Loader active inline='centered' content='Loading Cars'/>
            
        return (
            <div>
                <Bread3 title={carModel} />
                {
                   !this.state.dberror ?
                    <div>
                        <div className ='modelBody'>
                        {
                            models.length !== res.length ?
                            <div id='modelList' >
                                <h2>{carModel}</h2>
                                <h3>Select desired vehicles</h3>
                                {modelList}
                            </div>
                        : <h2>No cars left to add</h2>
                        }
                        </div> 
                    </div>
                    : <h2>Could not retrieve data</h2>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      cars: state.cars.models,
      res: state.res.userCars
    }
  }

export default connect(mapStateToProps, actions)(CarModels);
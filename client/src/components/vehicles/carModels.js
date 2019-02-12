import React, { Component } from 'react';
import Bread3 from '../../components/bread3';
import { connect } from 'react-redux';
import * as actions from '../../actions/index'

class CarModels extends Component {
    state= {
        models:[{}],
        notLoaded: false
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
    }

    handleClick = (model) => {
        const obj = this.props.cars.filter(car => {
            return car.model === model.model
        })
        if(!obj.length) {
            this.props.addCar(model);
        }
        else {
            this.props.deleteCar(obj[0].model)
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
                        <div key={carModel.model}>
                            <p>{carModel.model} <button className={cName} onClick={() => this.handleClick(carModel)}>{cName? 'Remove' : 'Add Car'}</button></p>
                        </div>
                    : null
                )
            })
        ) : <h3 style={{whiteSpace: 'nowrap', margin: '0 auto'}}>Loading</h3>
            
        return (
            <div>
                <Bread3 title={carModel} />
                {
                   !this.state.notLoaded ?
                    <div>
                        <div className ='modelBody'>
                        {
                            models.length !== res.length ?
                            <div>
                                <h2>{carModel}</h2>
                                <h3>Select desired vehicles</h3>
                                {modelList}
                            </div>
                        : <h2>No cars left to add</h2>
                        }
                        </div> 
                    </div>
                    : <h2>Nothing found</h2>
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
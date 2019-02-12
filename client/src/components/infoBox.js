import React, { Component } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



class InfoBox extends Component {
  constructor(props) {
    super(props);
      this.state = {
        car: ''
      }
  }

  componentDidUpdate(prevProps) {
    // Obtain car models available from database and randomly select one 

    if(prevProps.models !== this.props.models) {
      document.body.appendChild(document.getElementById('infoPop'));
      let randCar = this.props.models[Math.floor(Math.random() * 9)];
      this.randomImage(randCar);
    }
  }

  componentWillUnmount() {
    document.body.removeChild(document.getElementById('infoPop'));
  }
  
  randomImage = (rand) => {
    this.setState({
      car: <Link to={`/cars/${rand}`}>
            <Image size='small' src={require(`../images/${rand}.jpeg`)}  />
            <p>{rand}</p>
          </Link>
    })
  }


  exitBox = (e) => {
   e.target.parentElement.style.display = 'none';
  }

  render() {
    return (
      <div>
        <div id ='infoPop'>
          <Icon className='closeIcon' name='close' onClick={this.exitBox} />
          <h3>Recommended Car</h3>
          <div className='carRecommend'>
            {this.state.car}
          </div>  
        </div>
      </div>
    );
  }
}

export default InfoBox;
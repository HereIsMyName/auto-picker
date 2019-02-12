import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const Home = () => {
  const token = localStorage.getItem('WEB_TOKEN')
  return (
    <div>
      <Header as='h2' textAlign='center'>
        Select Your Favorite Cars
      </Header>
      <Header as='h3' textAlign='center'>Start <Link to='/about'>Here</Link></Header>
      {
        token ?
          <h3><Link to='/account'>My Account</Link></h3>
          : null
      }
    </div>
  );
}


export default Home;

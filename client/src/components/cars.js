import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Header, Image, Grid } from 'semantic-ui-react';
import sedan from '../images/sedans.jpeg';
import suv from '../images/suvs.jpeg';
import coupe from '../images/coupes.jpeg';
import hatchback from '../images/hatchbacks.jpeg';
import exotic from '../images/exotics.jpeg';
import pickup from '../images/pickups.jpeg';
import luxury from '../images/luxurys.jpeg';
import motorcycle from '../images/motorcycles.jpeg';
import van from '../images/vans.jpeg';
import classic from '../images/classics.jpeg';


const Cars = () => {
  return (
    <div className='groupItem'>
      <Breadcrumb size='large'>
      <Link to=''>
        <Breadcrumb.Section>Home</Breadcrumb.Section>
      </Link>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Cars</Breadcrumb.Section>
      </Breadcrumb>
      <br />
      <div className='carBody'>
      <Header as="h2" textAlign='center'>Vehicle Class</Header>
      <Header as='h3' color='blue' textAlign='center'>
        <Link to='/car-finder'>Can't decide?</Link>
      </Header>
      <Grid stackable divided='vertically' celled='internally' align='center'>
        <Grid.Row columns={5} >
          <Grid.Column>
            <Link to='/cars/sedans'>
              <Image size='small' src={sedan}/>
              <Header as='h4' textAlign='center'>Sedan</Header>
            </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/coupes'>
            <Image size='small' src={coupe} />
            <Header as='h4' textAlign='center'>Coupe</Header>
          </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/hatchbacks'>
            <Image size='small' src={hatchback} />
            <Header as='h4' textAlign='center'>Hatchback</Header>
            </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/exotics'>
            <Image size='small' src={exotic} />
            <Header as='h4' textAlign='center'>Exotic</Header>
            </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/vans'>
            <Image size='small' src={van} />
            <Header as='h4' textAlign='center'>Van</Header>
            </Link>
          </Grid.Column>
        </Grid.Row >
        <Grid.Row columns={5}>
          <Grid.Column>
          <Link to='/cars/pickups'>
            <Image size='small' src={pickup} />
            <Header as='h4' textAlign='center'>Pickup</Header>
            </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/suvs'>
            <Image size='small' src={suv} />
            <Header as='h4' textAlign='center'>SUV</Header>
            </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/luxurys'>
            <Image size='small' src={luxury} />
            <Header as='h4' textAlign='center'>Luxury</Header>
            </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/classics'>
            <Image size='small' src={classic} />
            <Header as='h4' textAlign='center'>Classic</Header>
            </Link>
          </Grid.Column>
          <Grid.Column>
          <Link to='/cars/motorcycles'>
            <Image size='small' src={motorcycle} />
            <Header as='h4'textAlign='center'>Motorcycle</Header>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    </div>

  );
}

export default Cars;
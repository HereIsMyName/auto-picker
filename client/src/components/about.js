import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Item } from 'semantic-ui-react'
import How1 from './../images/howto_1.png';
import How2 from './../images/howto_2.png';
import How3 from './../images/howto_3.png';
import How4 from './../images/howto_4.png';
import How5 from './../images/howto_5.png';
import How6 from './../images/howto_6.png';
import How7 from './../images/howto_7.png';


class About extends Component {


  render() {
    return (
      <div className='infoBody'>
        <h2>How To</h2>
        <p>
            Search this site to find the <Link to='/cars'>vehicles</Link> of your liking. 
            Then select your vehicles where they are sent to the selections page.
        </p>
        <Item.Group className='aboutItems'>
          <Grid stackable columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Item>
                  <Item.Image size='small' src={How1} className='howto' />
                  <Item.Content>
                    <Item.Header as='a'>Select Vehicles</Item.Header>
                    <Item.Description>
                      <p>
                        <Link to='/signup'>Sign up</Link> for an account, or skip this step until late if desired.
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Grid.Column>
                <Item>
                  <Item.Image size='small' src={How2} className='howto' />
                  <Item.Content>
                    <Item.Header as='a'>Select Vehicles</Item.Header>
                    <Item.Description>
                      <p>
                        Search this site to find the <Link to='/cars'>vehicles</Link> of your liking.
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Grid.Column>
                <Item>
                  <Item.Image size='small' src={How3} className='howto' />
                  <Item.Content>
                    <Item.Header as='a'>Select Models</Item.Header>
                    <Item.Description>
                      <p>
                        Select the class of vehicles in the <Link to='/cars'>cars</Link> page. You can select <Link to='/car-finder'>Can't decide </Link>
                        to narrow your selection
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Grid.Column>
                <Item>
                  <Item.Image size='small' src={How4} className='howto' />
                  <Item.Content>
                    <Item.Header as='a'>Selections page</Item.Header>
                    <Item.Description>
                      <p>
                        The <Link to='/selections'>Selections</Link> button displays the number of vehicles selected. Click here to see a list of your selections.
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Item>
                  <Item.Image size='small' src={How5} className='howto' />
                  <Item.Content>
                    <Item.Header as='a'>Save vehicles</Item.Header>
                    <Item.Description>
                      <p>
                        Here you can view your selected vehicles. You can then save your vehicles to your account.
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Grid.Column>
                <Item>
                  <Item.Image size='small' src={How6} className='howto' />
                  <Item.Content>
                    <Item.Header as='a'>Delete Cars in Your Account</Item.Header>
                    <Item.Description>
                      <p>
                        Visit your account to see your saved cars. Here you may delete some or all of the cars as desired.
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Grid.Column>
                <Item>
                  <Item.Image size='small' src={How7} className='howto' />
                  <Item.Content>
                    <Item.Header as='a'>Delete Your Account</Item.Header>
                    <Item.Description>
                      <p>
                        You may delete your account whenever. Just type in your password when to confirm deletion.
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item.Group>
      </div>
    );
  }
}

export default About;
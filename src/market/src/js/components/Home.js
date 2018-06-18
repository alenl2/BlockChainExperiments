import React from 'react';
import { Link } from 'react-router-dom'
import TokenSalesList from './token-sale/TokenSalesList.react'
import TokenPurchasesList from './token-purchase/TokenPurchasesList.react'
import { Grid, Button, Segment } from 'semantic-ui-react'

export default class Home extends React.Component {
  render() {
    return (
      <Segment className="homeContainer">
        <Grid divided>
        <Grid.Row columns={1}>
          <Grid.Column className="centerText">
            <h3 className="super-title">Would you like to buy or sell tokens?</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column className="centerText">
            <Link to="/token-sale" id="sell"><Button color="red">Sell</Button></Link>
          </Grid.Column>
          <Grid.Column className="centerText">
            <Link to="/token-purchase" id="buy"><Button color="teal">Buy</Button></Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <TokenSalesList/>
          </Grid.Column>
          <Grid.Column>
            <TokenPurchasesList/>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

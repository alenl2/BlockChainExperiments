import React from 'react'
import { Card } from 'semantic-ui-react'

export default class Account extends React.Component {
  constructor(props){
    super(props)
    this.state = { account: this.props.account }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ account: nextProps.account })
  }

  render() {
    const account = this.state.account
    const tokensBalance = account.tokensBalance || {}
    return (

      <Card fluid>

      
        <Card.Content>
          <Card.Header>Your Account</Card.Header>
          <Card.Meta>
            <span className='date'>{account.address}</span>
          </Card.Meta>
          <Card.Description>ETH {account.etherBalance.toString()}</Card.Description>
        </Card.Content>
        <Card.Content>
          {tokensBalance.symbol || 'Tokens'} Balance {tokensBalance.amount ? tokensBalance.amount.toFixed(tokensBalance.decimals) : '...'}
        </Card.Content>
      
    </Card>

    )
  }
}

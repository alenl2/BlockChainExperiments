import React from 'react'
import { Link } from 'react-router-dom'
import { findAll } from '../../actions/tokenpurchases'
import contractStatusToString from '../../helpers/contractStatusToString'
import contractStatusToColor from '../../helpers/contractStatusToColor'
import { connect } from 'react-redux';
import { List,Label,Header, Container } from 'semantic-ui-react'

class TokenPurchasesList extends React.Component {

  componentDidMount() {
    this.props.findAll();
  }

  render() {
    return (
      <Container>
        <Header as="h2" className="centerText">Token Purchases</Header>
        { this.props.tokenPurchases.length === 0 ? <em>Loading...</em> : <List divided relaxed>{this._buildList()}</List>}
      </Container>
    )
  }

  _buildList() {
    return this.props.tokenPurchases.map(tokenPurchase => {
      const status = contractStatusToString(tokenPurchase)
      const color = contractStatusToColor(tokenPurchase)
      return (

        <List.Item key={tokenPurchase.address}>
        <Link to={`/token-purchase/${tokenPurchase.address}`}>
          <List.Content>
            <List.Header>
              {tokenPurchase.address}
            </List.Header>
            <List.Description>
              <Label color={color} horizontal>
                {status}
              </Label>
              {tokenPurchase.tokenSymbol} {tokenPurchase.amount.toString()} - ETH {tokenPurchase.price.toString()}
            </List.Description>
          </List.Content>
          </Link>
        </List.Item>
      )
    })
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tokenPurchases: state.tokenPurchasesList
  };
}

export default connect(mapStateToProps, { findAll })(TokenPurchasesList);
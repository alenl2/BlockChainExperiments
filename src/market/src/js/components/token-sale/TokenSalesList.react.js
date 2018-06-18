import React from 'react'
import { Link } from 'react-router-dom'
import { findAll } from '../../actions/tokensales'
import contractStatusToString from '../../helpers/contractStatusToString'
import contractStatusToColor from '../../helpers/contractStatusToColor'
import { connect } from 'react-redux';
import { List,Label,Header, Container } from 'semantic-ui-react'

class TokenSalesList extends React.Component {
  componentDidMount() {
    this.props.findAll();
  }

  render() {
    return (
      <Container>
        <Header as="h2" className="centerText">Token Sales</Header>
        { this.props.tokenSales.length === 0 ? <em>Loading...</em> : <List divided relaxed>{this._buildList()}</List>}
      </Container>
    )
  }

  _buildList() {
    return this.props.tokenSales.map(tokenSale => {
      const status = contractStatusToString(tokenSale)
      const color = contractStatusToColor(tokenSale)
      return (
        <List.Item key={tokenSale.address}>
        <Link to={`/token-sale/${tokenSale.address}`}>
          <List.Content>
            <List.Header>
              {tokenSale.address}
            </List.Header>
            <List.Description>
              <Label color={color} horizontal>
                {status}
              </Label>
              {tokenSale.tokenSymbol} {tokenSale.amount.toString()} - ETH {tokenSale.price.toString()}
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
    tokenSales: state.tokenSalesList
  };
}

export default connect(mapStateToProps, { findAll  })(TokenSalesList);

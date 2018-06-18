import React from 'react'
import { Link } from 'react-router-dom'
import {refund} from '../../actions/tokensales'
import contractStatusToString from '../../helpers/contractStatusToString'
import contractStatusToColor from '../../helpers/contractStatusToColor'
import { Segment, List, Button, Label, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';

class TokenSaleDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = { tokenSale: this.props.tokenSale, account:this.props.account }
    this._refund = this._refund.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tokenSale: nextProps.tokenSale, account: nextProps.account })
  }

  render() {
    const account = this.state.account || {}
    const tokenSale = this.state.tokenSale
    const status = contractStatusToString(tokenSale)
    const color = contractStatusToColor(tokenSale)
    const isOwner = tokenSale.seller === account.address
    return (
      <Segment>
        <span><Header as="h3">{tokenSale.tokenSymbol} token sale</Header></span>
        <Label color={color} ribbon='right' style={{position:"absolute", transform: "translate(-120%,-80%)"}}>
          {status}
        </Label>
        <List divided relaxed>
              <List.Item>
                <List.Header className="active">Token Sale</List.Header>
                <p className="labeled">{tokenSale.address}</p>
              </List.Item>
              <List.Item>
                <List.Header className="active">Seller</List.Header>
                <p className="labeled">{tokenSale.seller}</p>
              </List.Item>
              { tokenSale.transactionHash ?
                <List.Item>
                  <List.Header className="active">Confirmed Transaction</List.Header>
                  <p className="labeled">
                    <a>{tokenSale.transactionHash}</a>
                  </p>
                </List.Item> : ''
              }
              { tokenSale.purchaser ?
                <List.Item>
                  <List.Header className="active">Purchaser</List.Header>
                  <p className="labeled">{tokenSale.purchaser}</p>
                </List.Item> : ''
              }
              <List.Item>
                <List.Header className="active">Selling amount of tokens</List.Header>
                <p className="labeled">{tokenSale.amount.toString()}</p>
              </List.Item>
              <List.Item>
                <List.Header className="active">Total Ether you are willing to pay</List.Header>
                <p className="labeled">{tokenSale.price.toString()}</p>
              </List.Item>
              <List.Item>
                <List.Header className="active">Token Name</List.Header>
                <p className="labeled">{tokenSale.tokenName}</p>
              </List.Item>
              <List.Item>
                <List.Header className="active">Token Symbol</List.Header>
                <p className="labeled">{tokenSale.tokenSymbol}</p>
              </List.Item>
              <List.Item>
                <List.Header className="active">Sharing Link</List.Header>
                <p className="labeled">
                  <Link to={`/token-sale/${tokenSale.address}`}>{window.location.origin}/token-sale/{tokenSale.address}</Link>
                </p>
              </List.Item>
          { isOwner ?
            <List.Item className="card-action">
              <Button fluid disabled={tokenSale.closed} color="red" onClick={this._refund}>Refund</Button>
            </List.Item>
            : ''
          }
        </List>
      </Segment>
    );
  }

  _refund(e) {
    e.preventDefault()
    const tokenSale = this.state.tokenSale;
    this.props.refund(tokenSale.address, tokenSale.seller)
  }
}

export default connect(()=>{return{}}, { refund })(TokenSaleDetails);
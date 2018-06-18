import React from 'react'
import { Link } from 'react-router-dom'
import {refund} from '../../actions/tokenpurchases'
import contractStatusToString from "../../helpers/contractStatusToString";
import contractStatusToColor from '../../helpers/contractStatusToColor'
import { Segment, List, Button, Label, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';

class TokenPurchaseDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = { tokenPurchase: this.props.tokenPurchase, account: this.props.account }
    this._refund = this._refund.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tokenPurchase: nextProps.tokenPurchase, account: nextProps.account })
  }

  render() {
    const account = this.state.account || {}
    const tokenPurchase = this.state.tokenPurchase;
    const status = contractStatusToString(tokenPurchase)
    const isOwner = tokenPurchase.purchaser === account.address
    const color = contractStatusToColor(tokenPurchase)

    return (
      <Segment>
        <span><Header as="h3">{tokenPurchase.tokenSymbol} token purchase</Header></span>
        <Label color={color} ribbon='right' style={{position:"absolute", transform: "translate(-120%,-80%)"}}>
          {status}
        </Label>
          <List divided relaxed>
              <List.Item>
                <List.Header>Token Purchase</List.Header >
                <p className="labeled">{tokenPurchase.address}</p>
              </List.Item>
              <List.Item>
                <List.Header>Purchaser</List.Header >
                <p className="labeled">{tokenPurchase.purchaser}</p>
              </List.Item>
              { tokenPurchase.transactionHash ?
                <List.Item>
                  <List.Header>Confirmed Transaction</List.Header >
                  <p className="labeled">
                    <a>{tokenPurchase.transactionHash}</a>
                  </p>
                </List.Item> : ''
              }
              { tokenPurchase.seller ?
                <List.Item>
                  <List.Header>Seller</List.Header >
                  <p className="labeled">{tokenPurchase.seller}</p>
                </List.Item> : ''
              }
              <List.Item>
                <List.Header>Requested amount of tokens</List.Header >
                <p className="labeled">{tokenPurchase.amount.toString()}</p>
              </List.Item>
              <List.Item>
                <List.Header>Total Ether you will get in return</List.Header >
                <p className="labeled">{tokenPurchase.price.toString()}</p>
              </List.Item>
              <List.Item>
                <List.Header>Token Name</List.Header >
                <p className="labeled">{tokenPurchase.tokenName}</p>
              </List.Item>
              <List.Item>
                <List.Header>Token Symbol</List.Header >
                <p className="labeled">{tokenPurchase.tokenSymbol}</p>
              </List.Item>
              <List.Item>
                <List.Header>Sharing Link</List.Header >
                <p className="labeled">
                  <Link to={`/token-purchase/${tokenPurchase.address}`}>{window.location.origin}/token-purchase/{tokenPurchase.address}</Link>
                </p>
              </List.Item>
          { isOwner ?
            <List.Item>
              <Button fluid disabled={tokenPurchase.closed} color="red" onClick={this._refund}>Refund</Button>
            </List.Item>
            : ''
          }
          </List>
      </Segment>
    );
  }

  _refund(e) {
    e.preventDefault()
    const tokenPurchase = this.state.tokenPurchase;
    this.props.refund(tokenPurchase.address, tokenPurchase.purchaser)
  }
}

export default connect(()=>{return{}}, { refund })(TokenPurchaseDetails);
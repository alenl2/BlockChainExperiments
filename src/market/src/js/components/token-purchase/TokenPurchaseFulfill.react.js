import React from 'react'
import {fulfill}  from '../../actions/tokenpurchases'
import { Segment, Button, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';

class TokenPurchaseFulfill extends React.Component {
  constructor(props){
    super(props)
    this.state = { account: this.props.account, tokenPurchase: this.props.tokenPurchase }
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ account: nextProps.account, tokenPurchase: nextProps.tokenPurchase })
  }

  render() {
    return (
      <Segment>
        <form className="card" onSubmit={this._handleSubmit}>
          <div className="card-content">
            <h3 className="title">Fulfill contract</h3>
            <div className="row">{this._buildFulfillDescription()}</div>
          </div>
          <Divider />
          <div className="card-action">
            <Button disabled={this._notEnoughTokens()} color="teal" fluid>Fulfill</Button>
          </div>
        </form>
      </Segment>
    );
  }

  _buildFulfillDescription() {
    const account = this.state.account;
    const tokenPurchase = this.state.tokenPurchase;
    return this._notEnoughTokens() ?
      <div className="col s12">
        <p>You don't have enough {tokenPurchase.tokenSymbol} balance in your account ({account.address}) to fulfill this contract.</p>
      </div> :
      <div className="col s12">
        <p><b>If you fulfill this token purchase contract, then two transactions will be performed</b></p>
      </div>
  }

  _notEnoughTokens() {
    const account = this.state.account || {}
    const tokenPurchase = this.state.tokenPurchase || {}
    if(!account.tokensBalance || !account.tokensBalance.amount || !tokenPurchase.amount) return false
    return account.tokensBalance.amount.lessThan(tokenPurchase.amount)
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.fulfill(this.state.tokenPurchase.address, this.state.account.address)
  }
}

export default connect(()=>{return{}}, { fulfill })(TokenPurchaseFulfill);
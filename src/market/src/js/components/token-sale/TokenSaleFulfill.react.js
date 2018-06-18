import React from 'react'
import {fulfill} from '../../actions/tokensales'
import { Segment, Button, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';

class TokenSaleFulfill extends React.Component {
  constructor(props){
    super(props)
    this.state = { account: this.props.account, tokenSale: this.props.tokenSale }
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ account: nextProps.account, tokenSale: nextProps.tokenSale })
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
            <Button disabled={this._notEnoughEther()} color="teal" fluid>Fulfill</Button>
          </div>
        </form>
      </Segment>
    );
  }

  _buildFulfillDescription() {
    const account = this.state.account;
    return this._notEnoughEther() ?
      <div className="col s12">
        <p>You don't have enough ether balance in your account ({account.address}) to fulfill this contract.</p>
      </div> :
      <div className="col s12">
        <p><b>If you fulfill this token sale contract, then only one transaction will be performed</b></p>
      </div>
  }

  _notEnoughEther() {
    const account = this.state.account || {};
    const tokenSale = this.state.tokenSale || {};
    if(!account.etherBalance || !tokenSale.price) return false;
    return account.etherBalance.lessThan(tokenSale.price)
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.fulfill(this.state.tokenSale.address, this.state.account.address)
  }
}

export default connect(()=>{return{}}, { fulfill })(TokenSaleFulfill);
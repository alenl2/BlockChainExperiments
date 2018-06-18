import React from 'react'
import Account from '../Account.react'
import {findCurrent, resetContractDeployed} from '../../actions/accounts'
import TokenPurchaseForm from '../token-purchase/TokenPurchaseForm.react'
import { connect } from 'react-redux';

class NewTokenPurchase extends React.Component {
  componentDidMount() {
    this.props.findCurrent();
  }

  render() {
    const undefinedAccount = typeof this.props.account.address === 'undefined'

    if(this.props.deployedAddress) {
      this.props.history.push(`/token-purchase/${this.props.deployedAddress}`)
      this.props.resetContractDeployed();
    }

    return (
      <div ref="newTokenPurchase">
        {undefinedAccount ? '' :
        <div className="row">
          <Account account={this.props.account} col="s12"/>
          <TokenPurchaseForm account={this.props.account} col="s12"/>
        </div>}
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return { 
    account:  state.account,
    deployedAddress: state.account.deployedAddress
  };
}

export default connect(mapStateToProps, { resetContractDeployed, findCurrent })(NewTokenPurchase);
import React from 'react'
import Account from '../Account.react'
import {findCurrent, resetContractDeployed} from '../../actions/accounts'
import TokenSaleForm from '../token-sale/TokenSaleForm.react'
import { connect } from 'react-redux';

class NewTokenSale extends React.Component {
  componentDidMount() {
    this.props.findCurrent();
  }

  render() {
    if(this.props.deployedAddress) {
      this.props.history.push(`/token-sale/${this.props.deployedAddress}`)
      this.props.resetContractDeployed();
    }
    const undefinedAccount = typeof this.props.account.address === 'undefined'
    return (
      <div>
        {undefinedAccount ? '' :
        <div className="row">
          <Account account={this.props.account}/>
          <TokenSaleForm account={this.props.account}/>
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


export default connect(mapStateToProps, { findCurrent, resetContractDeployed })(NewTokenSale);
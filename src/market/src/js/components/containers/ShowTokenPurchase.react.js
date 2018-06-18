import React from 'react'
import Account from '../Account.react'
import {findCurrent,updateTokensBalance} from "../../actions/accounts";
import TokenPurchaseDetails from '../token-purchase/TokenPurchaseDetails.react'
import TokenPurchaseFulfill from '../token-purchase/TokenPurchaseFulfill.react'
import { find } from '../../actions/tokenpurchases'
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class ShowTokenPurchase extends React.Component {
  componentDidMount() {
    this.props.findCurrent()
    this.props.find(this.props.match.params.address)
  }

  render() {
    const account = this.props.account
    const tokenPurchase = this.props.tokenPurchase
    const undefinedAccount = typeof account.etherBalance === 'undefined'
    const undefinedContract = typeof tokenPurchase.closed === 'undefined'
    const loading = undefinedContract || undefinedAccount

    if(this.props.tokenPurchase.tokenAddress && this.props.account.address && this.props.account.tokensBalance === null){
      this.props.updateTokensBalance(this.props.account.address, this.props.tokenPurchase.tokenAddress)
    }

    return (
      <Container>
        {loading ? '' :
        <Container>
          <Account account={account} />
          <TokenPurchaseDetails tokenPurchase={tokenPurchase} account={account} />
          {!tokenPurchase.closed ? <TokenPurchaseFulfill tokenPurchase={tokenPurchase} account={account}/> : ''}
        </Container>}
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tokenPurchase: state.tokenPurchase,
    account: state.account
  };
}


export default connect(mapStateToProps, { find, findCurrent, updateTokensBalance })(ShowTokenPurchase);
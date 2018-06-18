import React from 'react'
import Account from '../Account.react'
import TokenSaleDetails from '../token-sale/TokenSaleDetails.react'
import TokenSaleFulfill from '../token-sale/TokenSaleFulfill.react'
import {find} from '../../actions/tokensales'
import {findCurrent,updateTokensBalance} from "../../actions/accounts";
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react'

class ShowTokenSale extends React.Component {

  componentDidMount() {
    this.props.findCurrent();
    this.props.find(this.props.match.params.address)
  }

  render() {
    const account = this.props.account
    const tokenSale = this.props.tokenSale
    const undefinedAccount = typeof account.etherBalance === 'undefined'
    const undefinedContract = typeof tokenSale.closed === 'undefined'
    const loading = undefinedContract || undefinedAccount

    if(this.props.tokenSale.tokenAddress && this.props.account.address && this.props.account.tokensBalance === null){
      this.props.updateTokensBalance(this.props.account.address, this.props.tokenSale.tokenAddress)
    }

    return (
      <Container>
        {loading ? '' :
        <Container>
          <Account account={account} col="s12"/>
          <TokenSaleDetails tokenSale={tokenSale} account={account}/>
          {!tokenSale.closed ? <TokenSaleFulfill tokenSale={tokenSale} account={account}/> : ''}
        </Container>}
      </Container>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    tokenSale: state.tokenSale,
    account: state.account
  };
}


export default connect(mapStateToProps, { find, findCurrent, updateTokensBalance })(ShowTokenSale);
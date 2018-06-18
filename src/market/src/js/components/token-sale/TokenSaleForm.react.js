import React from 'react';
import ERC20List from '../ERC20List.react'
import {updateTokensBalance} from '../../actions/accounts'
import {create} from '../../actions/tokensales'
import { Segment,Input, Button,List } from 'semantic-ui-react'
import { connect } from 'react-redux';

class TokenSaleForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { account: {}, token: '', amount: 0, price: 0 }
    this._selectERC20 = this._selectERC20.bind(this)
    this._updateToken = this._updateToken.bind(this)
    this._updatePrice = this._updatePrice.bind(this)
    this._updateAmount = this._updateAmount.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ account: nextProps.account })
  }

  render() {
    return (
      <Segment>
        <form className="card" onSubmit={this._handleSubmit}>
          <List>
            <List.Item><h3 className="title">Sell tokens</h3></List.Item>
            <List.Item>Please enter a token address manually or select the token you want to sell</List.Item>
            <List.Item>
              <Input fluid label="Token" onChange={this._updateToken} type="text" value={this.state.token} required action={<ERC20List selectERC20={this._selectERC20}/>}/>
            </List.Item>
            <List.Item>
              <Input fluid label="Token amount" onChange={this._updateAmount} type="number" step="any" required/>
            </List.Item>
            <List.Item>
              <Input fluid label="ETH per token" onChange={this._updatePrice} type="number" step="any" required/>
            </List.Item>
          </List>
          <div className="card-action">
            <Button fluid color="teal">Publish</Button>
          </div>
        </form>
      </Segment>
    )
  }

  _handleSubmit(e) {
    e.preventDefault()
    const state = this.state
    this.props.create(state.token, state.account.address, state.amount, state.price)
  }

  _selectERC20(erc20Address) {
    this.setState({ token: erc20Address })
    this.props.updateTokensBalance(this.state.account.address, erc20Address)
  }

  _updateToken(e) {
    e.preventDefault();
    this.setState({ token: e.target.value })
  }

  _updatePrice(e) {
    e.preventDefault();
    this.setState({ price: e.target.value })
  }

  _updateAmount(e) {
    e.preventDefault();
    this.setState({ amount: e.target.value })
  }
}

export default connect(()=>{return{}}, { updateTokensBalance, create })(TokenSaleForm);
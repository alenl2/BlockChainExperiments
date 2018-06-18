import React from 'react';
import { OurToken } from '../contracts'
import { Button } from 'semantic-ui-react'

export default class ERC20List extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.selectERC20 = this.selectERC20.bind(this)
  }

  componentDidMount(){
      OurToken.deployed().then((instance) => {
        this.setState({ "address": instance.address })
      })
  }

  selectERC20(e) {
    e.preventDefault()
    this.props.selectERC20(e.target.id)
  }

  render() {
    return (
        <Button id={this.state.address} onClick={this.selectERC20}>OTK</Button>
    );
  }
}

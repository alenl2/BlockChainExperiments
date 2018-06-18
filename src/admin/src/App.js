import React, { Component } from 'react'
import OurToken from './contracts/tokens/OurToken.json'
import OurUniqueToken from './contracts/tokens/OurUniqueToken.json'
import OurCrowdSale from './contracts/tokens/OurCrowdSale.json'
import OurAirdrop from './contracts/tokens/OurAirdrop.json'
import TokenPurchaseFactory from './contracts/tokens/TokenPurchaseFactory.json'
import TokenSaleFactory from './contracts/tokens/TokenSaleFactory.json'
import TokenPurchase from './contracts/tokens/TokenPurchase.json'
import TokenSale from './contracts/tokens/TokenSale.json'
import getWeb3 from './utils/getWeb3'
import Contract from './components/Contract'
import { Link } from 'react-router-dom'
import {Container, Accordion, Icon, Segment, Menu, Button, Sidebar,List } from 'semantic-ui-react'

import './App.css'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
       message: "",
      activeIndex:0,
      visible: true
    }
    this.contracts = {}
  }

  componentWillMount() {
    //load up web3 and create contracts
    getWeb3.then(async (results) => {
      this.setState({web3: results.web3})
      this.instantiateContract()
    })
    .catch((e) => {
      console.log(e)
      this.setState({message: "Web3 not found"});
    })
  }


  //will load contracts from json files and save them to the state
  instantiateContract() {
    const contract = require('truffle-contract')

    //load up contracts from json files
    var contractJsons = {"OurToken":OurToken, "OurUniqueToken":OurUniqueToken, "OurCrowdSale":OurCrowdSale, "OurAirdrop":OurAirdrop, "TokenPurchaseFactory":TokenPurchaseFactory, "TokenSaleFactory":TokenSaleFactory, "TokenPurchase":TokenPurchase, "TokenSale":TokenSale}

    const paths = this.props.location.pathname.split("/");
    for(var i=1; i<paths.length; i++){
      var params = paths[i].split("=")
      switch(params[0]){
        case "OurToken":
          OurToken.networks[this.state.web3.version.network].address = params[1];
          break;
        case "TokenSale":
          TokenSale.networks[this.state.web3.version.network] = {}
          TokenSale.networks[this.state.web3.version.network].address = params[1];//TODO push into contracts
          contractJsons["TokenSale"] = TokenSale
          break;
        case "TokenPurchase":
          TokenPurchase.networks[this.state.web3.version.network] = {}
          TokenPurchase.networks[this.state.web3.version.network].address = params[1];//TODO push into contracts
          contractJsons["TokenPurchase"] = TokenPurchase
          break;
        default:
          break;
      }
    }

    //get default account and configure default settings on contracts
    this.state.web3.eth.getAccounts((error, accounts) => {
      if(accounts.length === 0){
        this.setState({message: "Unlock metamsk"});
      }
      this.setState({yourAccount: accounts[0]});
      if(accounts[0] === undefined){
        this.setState({yourAccount: "0x0000000000000000000000000000000000000000"});
      }
      
      this.updateEth();

      var html = []
      var menuItems = []
      for(var key in contractJsons){
        const truffleContract = contract(contractJsons[key])
        truffleContract.setProvider(this.state.web3.currentProvider);
        var contractHtml = <Contract key={key} ref={(contract) => {this.contractCreated(contract)}} account={accounts[0]} contract={truffleContract} name={key} contractInstanciated={this.contractInstanciated.bind(this)} onUpdate={this.updateAll.bind(this)}/>
        html.push(contractHtml)
        menuItems.push(<Menu.Item key={key+"1"} link onClick={this.showContract.bind(this,key)} name='home'><Icon name='file code' />{key}</Menu.Item>)
      }
      this.setState({menuItems: menuItems})
      this.setState({contractsHtml: html});
    })

    var filter = this.state.web3.eth.filter('latest');

    filter.watch((err, res) =>{
      this.updateEth();
    });
  }

  contractCreated(contract){
    this.contracts[contract.props.name] = contract;
    //TODO optimise this to run only once when all contract are loaded
    this.updateEth()
  }

  contractInstanciated(){
    if(this.contracts["OurUniqueToken"] !== undefined && this.contracts["OurUniqueToken"].state.instance !== undefined){
      this.contracts["OurUniqueToken"].state.instance.balanceOf.call(this.state.yourAccount).then(async (result) => {
        this.getUniqueTokens([], 0, result, this.contracts["OurUniqueToken"].state.instance)
        this.setState({yourUniqueTokenBalance: result.toString()});
      })
    }

  if(this.contracts["OurToken"] !== undefined && this.contracts["OurToken"].state.instance !== undefined){
      this.contracts["OurToken"].state.instance.balanceOf.call(this.state.yourAccount).then(async (result) => {
        this.setState({ yourTokenBalance: this.state.web3.fromWei(result.toString(), "ether") })
      })
    }
  }

  updateAll(){
    this.updateEth();
    for(var contract in this.contracts){
      this.contracts[contract].update();
    }
  }
  
  updateEth(){
    //get timestamp for the latest block so we can determin if crowdsale did start
    this.state.web3.eth.getBlock('latest', (err, result) => {
      if(result !== undefined){
        this.setState({chainTimestamp: result.timestamp})
        this.setState({blockData: "Number: "+result.number+" Hash: "+result.hash+" Transactions: "+JSON.stringify(result.transactions)})
      }
    })
    this.state.web3.eth.getBalance(this.state.yourAccount, (err, result) => {
      this.setState({yourEthBalance: this.state.web3.fromWei(result.toString(), "ether")});
    })
    this.contractInstanciated();
  }
  
  //recursive method to get all of our unique tokens
  getUniqueTokens(tokenList, index,count, instance){
    if(count.comparedTo(index) !== 0){
      instance.tokenOfOwnerByIndex.call(this.state.yourAccount, index).then(async (result) => {
        //if result is 0 then we finished now we go back up the stack
        if(result.comparedTo(0) !== 0){
          //now all we need is the token URI
          instance.tokenURI.call(result).then(async (uriResult) => {
            tokenList.push({tokenIndex:index, tokenId: result.toString(), tokenURI: uriResult});
            this.setState({ourUniqueTokenYourTokens: tokenList});
            this.getUniqueTokens(tokenList, index+1, count, instance)//recurse if we are not at 0
          })
        }
      })
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }


  showContract(contractName) {
    if(this.contracts[contractName] === undefined){
      return;
    }
    for(var contract in this.contracts){
      this.contracts[contract].show(false);
    }
    
    this.contracts[contractName].show(true);
  }


  render() {
    const { activeIndex } = this.state
    const { visible } = this.state
    return (
      <div className="fullHeight">
        <Segment inverted>
          <Menu inverted fixed="top" size="huge" >
            <Menu.Item header><Button circular icon="sidebar" onClick={this.toggleVisibility}></Button></Menu.Item>
            <Link to="/"><Menu.Item header>Admin</Menu.Item></Link>
          </Menu>
        </Segment>
        
        <Sidebar className="sideBarWidth" as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted >
          <Menu.Item header onClick={this.toggleVisibility}><Icon name='sidebar' /></Menu.Item>
          {this.state.menuItems}
        </Sidebar>
        <Segment basic>
            <Container text>
            <Segment basic>
            <Accordion fluid styled>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}><Icon name='dropdown'/>Info</Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <List divided relaxed>
                  <List.Item><Icon name='user'/> Account: {this.state.yourAccount}</List.Item>
                  <List.Item><Icon name='ethereum'/> Your ethereum balance: {this.state.yourEthBalance} ETH</List.Item>
                  <List.Item><Icon name='balance scale'/> Your token balance: {this.state.yourTokenBalance} OTK</List.Item>
                  <List.Item><Icon name='check circle'/> Your unique token balance: {this.state.yourUniqueTokenBalance} OUT</List.Item>
                  <List.Item><Icon name='check circle outline'/> Your unique tokens {JSON.stringify(this.state.ourUniqueTokenYourTokens)}</List.Item>
                  <List.Item><Icon name='clock'/> Chain timestamp: {this.state.chainTimestamp}</List.Item>
                  <List.Item><Icon name='chain'/> Last block data: {this.state.blockData}</List.Item>
                </List>
              </Accordion.Content>
            </Accordion>
            </Segment>
            {this.state.contractsHtml}
          </Container>
        </Segment>
    </div>
    );
  }
}

export default Admin
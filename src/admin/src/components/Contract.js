import React, { Component } from 'react'
import ContractMethod from './ContractMethod'
import { Icon,Container,Header,List,Segment } from 'semantic-ui-react'

class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = { }
    this.methods = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  
  componentDidMount(){
    var defaults = {
      account: this.props.account,
      from: this.props.account
    }

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      defaults = {
        gas: 4712388,
        gasPrice: 100000000000,
        account: this.props.account,
        from: this.props.account
      }
    }

      this.props.contract.defaults(defaults);

      this.props.contract.deployed().then(async (instance) => {
          //bind to all contract events and update data when one is triggered
        const allEvents = instance.allEvents();
        allEvents.watch((err, res) => {
          console.log(err, res);
          this.props.onUpdate();
        });
        this.setState({instance: instance});
        this.props.contractInstanciated();
        this.generateHtml(instance);
    }).catch(e => {
        this.props.contract.address = "0x0";
        this.generateHtml(this.props.contract);
    });
  }

  generateHtml(instance){
    const html = [];
    for(var i=0; i<instance.abi.length; i++){
      const multiplayer =1000000000000000000
      var mul = multiplayer;
      const name = instance.abi[i].name
      if(name === "decimals" || this.props.name === "OurUniqueToken"){
        mul = undefined;
      }
      if(this.props.name === "OurCrowdSale"){
        if(name === "rate" || name === "closingTime"|| name === "openingTime"){
            mul = undefined; 
        }
      }
      var contractElement = (<ContractMethod key={i} ref={(method) => {this.methodCreated(method)}}  name={name} contract={this.props.name} truffle={this.props.contract} instance={instance} index={i} address={instance.address} multiplayer={mul}/>)
      html.push(contractElement)
    }
    var header = <div><Header as='h2'><Icon name="file code"/> {this.props.name}</Header><Icon name="location arrow"/> At: {instance.address}</div>
    this.setState({ html: <Container><Header as='h3'>{header}</Header><List divided relaxed>{html}</List></Container>})
  }

  methodCreated(method){
    this.methods[method.props.name] = method
  }

  update(){
    for(var method in this.methods){
        this.methods[method].update()
    }
  }

  show(doShow){
    this.setState({isVisible: doShow})
  }

  render() {
    var style = {
      "display": "none"
    }
    if(this.state.isVisible){
      style.display = "block"
    }
    return (<Segment style={style}>{this.state.html}</Segment>);
  }
}

export default Contract
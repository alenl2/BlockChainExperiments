import React from 'react'
import Home from './Home'
import {checkConnection,checkAccountAccess } from '../actions/network'
import {reset } from '../actions/errors'
import NewTokenSale from './containers/NewTokenSale.react'
import ShowTokenSale from './containers/ShowTokenSale.react'
import ShowTokenPurchase from './containers/ShowTokenPurchase.react'
import NewTokenPurchase from './containers/NewTokenPurchase.react'
import { Switch, Route, Link } from 'react-router-dom'
import { Modal,Loader,Header,Container,Segment,Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class App extends React.Component {
  componentDidMount() {
    this.props.checkConnection();
    this.props.checkAccountAccess();
  }

  close = () => {
    this.props.reset();
  }

  render() {
    const connected = this.props.connected
    const couldAccessAccount = this.props.couldAccessAccount
    const fetching = connected && couldAccessAccount && this.props.fetching !== null
    return (
      <Container text>
        <Segment inverted>
          <Menu inverted fixed="top" size="huge" >
            <Link to="/"><Menu.Item header>OurMarket</Menu.Item></Link>
          </Menu>
        </Segment>
        <Container style={{marginTop: "40px"}}>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/token-sale/" exact component={NewTokenSale}/>
            <Route path="/token-sale/:address" component={ShowTokenSale}/>
            <Route path="/token-purchase/" exact component={NewTokenPurchase}/>
            <Route path="/token-purchase/:address" component={ShowTokenPurchase}/>
          </Switch>
        </Container>

        <Modal open={this.props.error} onClose={this.close}>
          <Modal.Header>Error</Modal.Header>
          <Modal.Content>
            <p>{this.props.error}</p>
          </Modal.Content>
        </Modal>

        <Modal basic open={fetching}>
          <Modal.Content>
            <Loader size='massive'>{this.props.fetching}</Loader>
          </Modal.Content>
        </Modal>

        <Modal basic open={!connected}>
          <Header as="h1">Please access using MetaMask</Header>
        </Modal>
        
        <Modal basic open={connected && !couldAccessAccount}>
            <Header as="h1">Please unlock your account on MetaMask</Header>
        </Modal>

      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    fetching: state.fetching,
    connected: state.network.connected,
    couldAccessAccount: state.network.couldAccessAccount,
    error: state.error
  };
}

export default withRouter(connect(mapStateToProps, { checkConnection, checkAccountAccess, reset  })(App));

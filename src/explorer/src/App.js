import React, { Component } from 'react';
import './App.css';
import Block from './components/Block.js';
import Home from './components/Home.js';
import Tx from './components/Tx.js';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { Menu, Segment, Container } from 'semantic-ui-react';

class App extends Component {
  
  render() {
    var padded = {
      "paddingTop": "20px"
    }
    return (
      <Container fluid>
        <Segment inverted>
          <Menu inverted fixed="top" size="huge" >
            <Link to="/"><Menu.Item header>Block Explorer</Menu.Item></Link>
          </Menu>
        </Segment>
        <Container text style={padded}>
              <Route exact path="/" component={Home}/>
              <Route exact path="/block" render={() => (
                <h1>Please select a blockHash.</h1>
              )}/>
              <Route path="/block/:hash" component={Block}/>

              <Route exact path="/tx" render={() => (
                <h1>Please select a txHash.</h1>
              )}/>
              <Route path="/tx/:hash" component={Tx}/>
        </Container>
      </Container>
    );
  }
}
export default App;

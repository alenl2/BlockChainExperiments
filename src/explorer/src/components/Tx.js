import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTx } from '../actions';
import { withRouter } from 'react-router';
import { Table, Header, Container } from 'semantic-ui-react';

class Tx extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    var hash = this.props.match.params.hash;
    var nextHash = nextProps.match.params.hash;
    if(hash !== nextHash){
      this.props.fetchTx(nextHash);
    }
    return true;
  }

  componentDidMount() {
    var hash = this.props.match.params.hash;
    this.props.fetchTx(hash);
  }

  render() {

    if (!this.props.tx.from) {
      return (
        <Header as='h1'>No TX info found</Header>
      );
    }
    var blockSize = {
      width: "100px"
    }
    return (
      <Container>
        <Header as='h1'>Tx Info</Header>
        <Container>
          <Table fixed>
            <Table.Body>
            <Table.Row>
                <Table.Cell style={blockSize}>Block hash: </Table.Cell>
                <Table.Cell>
                  <Link to={`../block/${this.props.tx.blockHash}`}>
                    {this.props.tx.blockHash}
                  </Link>
                </Table.Cell>
              </Table.Row>
              <Table.Row><Table.Cell>From: </Table.Cell><Table.Cell>{this.props.tx.from}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>From: </Table.Cell><Table.Cell>{this.props.tx.to}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Gas: </Table.Cell><Table.Cell>{this.props.tx.gas.toString()}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>GasPrice: </Table.Cell><Table.Cell>{this.props.tx.gasPrice.toString()}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Hash: </Table.Cell><Table.Cell>{this.props.tx.hash}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Input: </Table.Cell><Table.Cell>{this.props.tx.input}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Nonce: </Table.Cell><Table.Cell>{this.props.tx.nonce}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>TX index: </Table.Cell><Table.Cell>{this.props.tx.transactionIndex}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>V: </Table.Cell><Table.Cell>{this.props.tx.v}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>S: </Table.Cell><Table.Cell>{this.props.tx.s}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>R: </Table.Cell><Table.Cell>{this.props.tx.r}</Table.Cell></Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Container>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    tx: state.tx,
  };
}

export default withRouter(connect(mapStateToProps, { fetchTx })(Tx));

import _ from 'lodash';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlock } from '../actions';
import { withRouter } from 'react-router';
import { Table, Header, Container } from 'semantic-ui-react';

class Block extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    var hash = this.props.match.params.hash;
    var nextHash = nextProps.match.params.hash;
    if (hash !== nextHash) {
      this.props.fetchBlock(nextHash);
    }
    return true;
  }

  componentDidMount() {
    var hash = this.props.match.params.hash;
    this.props.fetchBlock(hash);
  }

  render() {

    if (!this.props.block.number) {
      return (
        <Header as='h1'>No block info found</Header>
      );
    }

    var html = []

    _.each(this.props.block.transactions, (value, index) => {
      html.push(<Link key={index} to={`../tx/${value}`}>{value}</Link>)
    })
    const blockTransactions = html

    var blockSize = {
      width: "150px"
    }

    return (
      <Container>
        <Header as='h1'>Block Info</Header>
        <Container>
          <Table fixed>
            <Table.Body>
              <Table.Row><Table.Cell style={blockSize}>Height: </Table.Cell><Table.Cell>{this.props.block.number}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Timestamp: </Table.Cell><Table.Cell>{this.props.block.timestamp.toString()}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Transactions: </Table.Cell><Table.Cell>{blockTransactions}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Hash: </Table.Cell><Table.Cell>{this.props.block.hash}</Table.Cell></Table.Row>
              <Table.Row>
                <Table.Cell>Parent hash: </Table.Cell>
                <Table.Cell>
                  <Link to={`../block/${this.props.block.parentHash}`}>
                    {this.props.block.parentHash}
                  </Link>
                </Table.Cell>
              </Table.Row>
              <Table.Row><Table.Cell>Nonce: </Table.Cell><Table.Cell>{this.props.block.nonce}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Size: </Table.Cell><Table.Cell>{this.props.block.size} bytes</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Difficulty: </Table.Cell><Table.Cell>{this.props.block.difficulty.toString()}</Table.Cell></Table.Row>
              <Table.Row><Table.Cell>Difficulty: </Table.Cell><Table.Cell>{this.props.block.totalDifficulty.toString()}</Table.Cell></Table.Row>
              <Table.Row>
                <Table.Cell>Gas Limit: </Table.Cell>
                <Table.Cell>{this.props.block.gasLimit}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Gas Used: </Table.Cell>
                <Table.Cell>{this.props.block.gasUsed}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sha3Uncles: </Table.Cell>
                <Table.Cell>{this.props.block.sha3Uncles}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Extra data: </Table.Cell>
                <Table.Cell>{this.props.block.extraData}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Container>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    block: state.block,
  };
}

export default withRouter(connect(mapStateToProps, { fetchBlock })(Block));

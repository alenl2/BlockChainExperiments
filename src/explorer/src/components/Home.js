import _ from 'lodash';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlocks , fetchBlockNumber } from '../actions';
import { Table,Container,Header } from 'semantic-ui-react';
import { withRouter } from 'react-router';

class Home extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    this.props.fetchBlocks();
    this.props.fetchBlockNumber();
  }

  renderBlocks() {
    var rows = [];
    _.each(this.props.blocks.ids, (value, index) => {
      rows.push(
        <Table.Row key={index}>
          <Table.Cell>{value}</Table.Cell>
          <Table.Cell>
            <Link to={`/block/${this.props.blocks.hash[index]}`}>
              {this.props.blocks.hash[index]}
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
    return rows;
  }

  render() {
    var blockSize = {
      width: "100px"
    }
    return (
      <Container>
        <Header as='h1'>Current Block: {this.props.blockNumber}</Header>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={blockSize}>Block</Table.HeaderCell>
              <Table.HeaderCell>Hash</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderBlocks()}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockNumber: state.blockNumber,
    blocks: state.blocks,
    newBlock: state.blockLive
  };
}

export default withRouter(connect(mapStateToProps, { fetchBlocks, fetchBlockNumber })(Home));

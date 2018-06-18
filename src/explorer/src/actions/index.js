import Web3 from 'web3';
import { FETCH_BLOCKNUMBER, FETCH_BLOCKS, FETCH_BLOCK ,FETCH_TX} from './types';
var web3 = new Web3(new Web3.providers.HttpProvider('https://sublime-rpc.zapto.org'));

var blocks = {
  ids: [],
  hash: [],
};
var lastNumber=0;
export const fetchBlockNumber = () => async dispatch => {
  var blockNumber = web3.eth.blockNumber;//TODO async this
  dispatch({ type: FETCH_BLOCKNUMBER, payload: blockNumber });
};

export const fetchTx = (hash) => async dispatch => {
  var tx = await web3.eth.getTransaction(hash);
  dispatch({ type: FETCH_TX, payload: tx });
};

export const fetchBlocks = () => async dispatch => {

  if(blocks.ids.length !== 0){
    return
  }

  var blockNumber = web3.eth.blockNumber;
  var maxBlocks = 50;
  if (blockNumber < maxBlocks) {
    maxBlocks = blockNumber;
  }

  lastNumber= blockNumber;
  for (var i = 0; i < maxBlocks; i++) {
    var block = await web3.eth.getBlock(blockNumber - i);
    if (block !== null) {
      blocks.ids.push(block.number);
      blocks.hash.push(block.hash);
    }
    blocks = Object.assign({}, blocks);
    dispatch({ type: FETCH_BLOCKS, payload: blocks });
  }
  
  var filter = web3.eth.filter("latest");//TODO use actual block number

  filter.watch((err, res) =>{
    lastNumber++;
    blocks.ids.pop();
    blocks.hash.pop();
    blocks.ids.unshift(lastNumber);
    blocks.hash.unshift(res);
    blocks = Object.assign({}, blocks);
    dispatch({ type: FETCH_BLOCKS, payload: blocks });
    dispatch({ type: FETCH_BLOCKNUMBER, payload: lastNumber });
  });
 
}

export const fetchBlock = (hash) => async dispatch => {
  const block = await web3.eth.getBlock(hash);
  dispatch({ type: FETCH_BLOCK, payload: block });
};

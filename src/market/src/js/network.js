import Web3 from 'web3'

import { LOCALHOST_PROVIDER } from 'constants'

const Network = {
  web3() {
    return new Web3(this.provider());
  },

  provider(){
    var web3 = window.web3
    if (typeof web3 !== 'undefined') {
      return web3.currentProvider;
    }else{
      return new Web3.providers.HttpProvider(LOCALHOST_PROVIDER);
    }
  },

  eth() {
    return this.web3().eth;
  },


  getCode(address) {
    return new Promise(function (resolve, reject) {
      Network.eth().getCode(address, Network._web3Callback(resolve, reject))
    });
  },

  getAccounts() {
    return new Promise(function (resolve, reject) {
      Network.eth().getAccounts(Network._web3Callback(resolve, reject))
    });
  },

  getBalance(address) {
    return new Promise(function (resolve, reject) {
      Network.eth().getBalance(address, Network._web3Callback(resolve, reject))
    });
  },

  getTransaction(txHash) {
    return new Promise(function (resolve, reject) {
      Network.eth().getTransaction(txHash, Network._web3Callback(resolve, reject))
    });
  },

  _web3Callback(resolve, reject) {
    return function (error, value) {
      if (error) reject(error);
      else resolve(value);
    }
  }
}

export default Network
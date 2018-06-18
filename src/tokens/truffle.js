const Web3 = require('web3');
var PrivateKeyProvider = require("truffle-privatekey-provider");
var privateKey = "";

var ourChainProvider = "sublime-rpc.zapto.org";
if(privateKey !== ""){
  ourChainProvider = new PrivateKeyProvider(privateKey, 'https://sublime-rpc.zapto.org')
}

module.exports = {
  networks: {
    develop: {
      host: "localhost",
      port: 9545,
      gas: 4712388,
      gasPrice: 100000000000,
      network_id: "4447" // Match any  network id
    },
    ourchain: {
      provider: ourChainProvider,
      gas: 4700000,
      gasPrice: 90000000000, 
      network_id: "55318" // Match any  network id
    },
    localrpc: {
      host: "localhost",
      port: 8545,
      gas: 4700000,
      gasPrice: 90000000000, 
      network_id: "*" // Match any  network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};

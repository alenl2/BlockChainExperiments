import contract from 'truffle-contract';
import Network from "./network"

var defaults = {}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  defaults = {
    gas: 4712388,
    gasPrice: 100000000000
  }
}

const provider = Network.provider();

const ERC20 = contract(require('../contracts/tokens/DetailedERC20.json'));
ERC20.setProvider(provider);
ERC20.defaults(defaults);

const TokenSale = contract(require('../contracts/tokens/TokenSale.json'));
TokenSale.setProvider(provider);
TokenSale.defaults(defaults);

const TokenSaleFactory = contract(require('../contracts/tokens/TokenSaleFactory.json'));
TokenSaleFactory.setProvider(provider);
TokenSaleFactory.defaults(defaults);

const TokenPurchase = contract(require('../contracts/tokens/TokenPurchase.json'));
TokenPurchase.setProvider(provider);
TokenPurchase.defaults(defaults);

const TokenPurchaseFactory = contract(require('../contracts/tokens/TokenPurchaseFactory.json'));
TokenPurchaseFactory.setProvider(provider);
TokenPurchaseFactory.defaults(defaults);

const OurToken = contract(require('../contracts/tokens/OurToken.json'));
OurToken.setProvider(provider);
OurToken.defaults(defaults);

export {
  ERC20,
  TokenSale,
  TokenSaleFactory,
  TokenPurchase,
  TokenPurchaseFactory,
  OurToken
}

pragma solidity ^0.4.24;

import './TokenSale.sol';
import '../../../zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol';

contract TokenSaleFactory {
  constructor() public {
  }

  event TokenSaleCreated(address tokenSaleAddress);

  function createTokenSale(DetailedERC20 _token, uint256 _price) external returns (address) {
    require(_price > 0);

    TokenSale tokenSale = new TokenSale(_token, _price);
    tokenSale.transferOwnership(msg.sender);
    emit TokenSaleCreated(tokenSale);

    return tokenSale;
  }
}

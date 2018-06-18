pragma solidity ^0.4.24;

import './TokenPurchase.sol';
import '../../../zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol';

contract TokenPurchaseFactory {
  constructor() public {
  }

  event TokenPurchaseCreated(address tokenPurchaseAddress);

  function createTokenPurchase(DetailedERC20 _token, uint256 _amount) external returns (address) {
    require(_amount > 0);

    TokenPurchase tokenPurchase = new TokenPurchase(_token, _amount);
    tokenPurchase.transferOwnership(msg.sender);
    emit TokenPurchaseCreated(tokenPurchase);

    return tokenPurchase;
  }
}

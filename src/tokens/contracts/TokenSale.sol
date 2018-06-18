pragma solidity ^0.4.24;

import '../../../zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol';
import '../../../zeppelin-solidity/contracts/ownership/Ownable.sol';

contract TokenSale is Ownable {
  bool public closed;
  uint256 public priceInWei;
  DetailedERC20 public token;

  event Refund(uint256 amount);
  event TokenPurchased(address buyer, address seller, uint256 price, uint256 amount);

  modifier notClosed() {
    require(!closed);
    _;
  }

  modifier hasSomeTokens() {
    require(amount() > 0);
    _;
  }

  constructor(DetailedERC20 _token, uint256 _price) public {
    if (_price < 0) revert();

    token = _token;
    priceInWei = _price;
    closed = false;
  }

  function amount() public constant returns(uint256) {
    return token.balanceOf(this);
  }

  function () public payable notClosed hasSomeTokens {
    require(msg.value == priceInWei);

    closed = true;

    uint256 _amount = amount();
    address _buyer = msg.sender;
    if(!token.transfer(_buyer, _amount)) revert();
    owner.transfer(priceInWei);
    emit TokenPurchased(_buyer, owner, priceInWei, _amount);
  }

  function refund() public onlyOwner notClosed hasSomeTokens returns(bool) {
    closed = true;

    uint256 _amount = amount();
    if(!token.transfer(owner, _amount)) revert();
    emit Refund(_amount);
    return true;
  }
}

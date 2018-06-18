pragma solidity ^0.4.24;

import "../../../zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "../../../zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "../../../zeppelin-solidity/contracts/token/ERC20/RBACMintableToken.sol";
import "../../../zeppelin-solidity/contracts/token/ERC20/CappedToken.sol";
import "../../../zeppelin-solidity/contracts/token/ERC827/ERC827Token.sol";

contract OurToken is DetailedERC20, ERC827Token, CappedToken, BurnableToken, RBACMintableToken {
    constructor(uint256 _cap) DetailedERC20("OurToken", "OTK", 18) CappedToken(_cap) public {
    }

}

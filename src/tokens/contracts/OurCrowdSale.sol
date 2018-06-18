pragma solidity ^0.4.24;

import "../../../zeppelin-solidity/contracts/crowdsale/validation/IndividuallyCappedCrowdsale.sol";
import "../../../zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "../../../zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";


contract OurCrowdSale is IndividuallyCappedCrowdsale, RefundableCrowdsale, MintedCrowdsale {
    constructor (MintableToken _token, uint256 _openingTime, uint256 _closingTime, uint256 _rate, address _wallet, uint256 _goal) 
    Crowdsale(_rate, _wallet, _token) 
    TimedCrowdsale(_openingTime, _closingTime) 
    RefundableCrowdsale(_goal) {
    }
}
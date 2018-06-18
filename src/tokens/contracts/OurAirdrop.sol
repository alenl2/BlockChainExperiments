pragma solidity ^0.4.24;

import "../../../zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


contract OurAirdrop is Ownable {
    address[] private _clients;
    address private _tokenAddr;

    event ClientRegistered(address indexed client);
    event AirdropDone();

    constructor(address tokenAddress) public {
        _tokenAddr = tokenAddress;
    }
    
    function isRegistered(address account) private view returns(bool isOwner){
        isOwner = false;
        for(uint256 i = 0; i < _clients.length; i++){
            if(account == _clients[i]){
                isOwner = true;
                break;
            }
        }
    }

    function clients() public view returns(address[] clients){
        clients = _clients;
    }

    function register() public {
        require(msg.sender != address(0));
        require(isRegistered(msg.sender) == false);
        _clients.push(msg.sender);
        emit ClientRegistered(msg.sender);
    }

    function tokenBalance() public view returns (uint256){
        return ERC20(_tokenAddr).balanceOf(address(this));
    }

    function multisend(uint256 value) onlyOwner public returns (uint256) {
        uint256 i = 0;
        while (i < _clients.length) {
            MintableToken(_tokenAddr).mint(_clients[i], value);
            i += 1;
        }
        emit AirdropDone();
        return(i);
    }
}
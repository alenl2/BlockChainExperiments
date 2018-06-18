pragma solidity ^0.4.24;

import "../../../zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "../../../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "../../../zeppelin-solidity/contracts/ownership/Ownable.sol";

contract OurUniqueToken is ERC721Token, Ownable {
    address private _tokenAddr;

    constructor(address tokenAddress) ERC721Token("OurUniqueToken", "OUT") public {
        _tokenAddr = tokenAddress;
    }

    function mint(address _to, uint256 _tokenId, string _tokenUri) onlyOwner public {
        super._mint(_to, _tokenId);
        setTokenURI(_tokenId, _tokenUri);
    }

    function burn(uint256 _tokenId) public {
        super._burn(msg.sender, _tokenId);
    }

    function setTokenURI(uint256 _tokenId, string _uri) onlyOwner public {
        super._setTokenURI(_tokenId, _uri);
    }

    function buyOurToken(uint256 _tokenId) public {
        burn(_tokenId);
        MintableToken(_tokenAddr).mint(msg.sender, 10 ether);
    }
}
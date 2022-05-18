pragma solidity >=0.4.24 <=0.5.6;

contract Practice {
    string public name = "KlayLion";
    string public symbol = "KL";

    mapping (uint256 => address) public tokenOwner;
    mapping (uint256 => string) public tokenURIs;

    // mint(tokenId, uti, owner)
    // transferFrom (from, to, tokenId)

    function mintWithTokenURI(address to, uint256 tokenId, string memory tokenURI) public {
        tokenOwner[tokenId] = to;
        tokenURIs[tokenId] = tokenURI;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        require(from == msg.sender, "from != msg.sender");
        require(from == tokenOwner[tokenId], "you are not the owner of th token");

        tokenOwner[tokenId] = to;
    }

    function setTokenUri(uint256 id, string memory uri) public {
        tokenURIs[id] = uri;
    }
}
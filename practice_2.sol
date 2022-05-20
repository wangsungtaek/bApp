pragma solidity >=0.4.24 <=0.5.6;

contract Practice {
    string public name = "KlayLion";
    string public symbol = "KL";

    mapping (uint256 => address) public tokenOwner;
    mapping (uint256 => string) public tokenURIs;

    // 소유한 토큰 리스트
    mapping (address => uint256[]) private _ownedTokens;

    // mint(tokenId, uti, owner)
    // transferFrom (from, to, tokenId)

    function mintWithTokenURI(address to, uint256 tokenId, string memory tokenURI) public returns (bool) {
        tokenOwner[tokenId] = to;
        tokenURIs[tokenId] = tokenURI;

        // add token to the list
        _ownedTokens[to].push(tokenId);

        return true;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        require(from == msg.sender, "from != msg.sender");
        require(from == tokenOwner[tokenId], "you are not the owner of th token");

        _removeTokenFromList(from, tokenId);
        _ownedTokens[to].push(tokenId);

        tokenOwner[tokenId] = to;
    }

    function _removeTokenFromList(address from, uint256 tokenId) private {
        // [10, 15, 19, 20] -> 19번을 삭제 하고 싶으면
        // [10, 15, 20, 19] -> 자리를 변경한다.
        // [10, 15, 20] -> 길이를 자른다.
        uint256 lastTokenIndex = _ownedTokens[from].length - 1;
        for(uint256 i=0; i<_ownedTokens[from].length; i++) {
            if(tokenId == _ownedTokens[from][i]) {
                _ownedTokens[from][i] = _ownedTokens[from][lastTokenIndex];
                _ownedTokens[from][lastTokenIndex] = tokenId;
                break;
            }
        }
        _ownedTokens[from].length--;
    }

    // 해당 주소가 보유한 토큰 ID 확인
    function ownedTokens(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function setTokenUri(uint256 id, string memory uri) public {
        tokenURIs[id] = uri;
    }
}
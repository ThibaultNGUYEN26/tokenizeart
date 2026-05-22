// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Simple ERC-721 NFT contract used for the TokenizeArt project.
// The contract owner controls minting, which makes the ownership
// and privilege model explicit during evaluation.
contract TokenizeArt42 is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    string private _artworkURI;

    event ArtworkMinted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor(address initialOwner, string memory metadataURI) ERC721("TokenizeArt42", "T42A") Ownable(initialOwner) {
        require(bytes(metadataURI).length > 0, "metadata required");
        _artworkURI = metadataURI;
    }

    // Mints the single project NFT with the metadata URI fixed at deployment.
    function mintArtwork(address to) external onlyOwner returns (uint256) {
        require(to != address(0), "invalid recipient");
        require(_nextTokenId == 0, "artwork already minted");

        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _artworkURI);

        emit ArtworkMinted(to, tokenId, _artworkURI);
        return tokenId;
    }

    // Convenience getter used during demos and reviews.
    function nextTokenId() external view returns (uint256) {
        return _nextTokenId;
    }
}

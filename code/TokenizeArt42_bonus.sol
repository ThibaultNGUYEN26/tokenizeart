// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// Bonus version of the project where both the metadata and the image
// are generated on-chain. No IPFS or external storage is required.
contract TokenizeArt42Bonus is ERC721, Ownable {
    uint256 private _nextTokenId;

    event ArtworkMinted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor(address initialOwner) ERC721("TokenizeArt42Bonus", "T42B") Ownable(initialOwner) {}

    // Mints the single on-chain NFT. The artwork and metadata are computed
    // directly by the contract, so the token can only reference on-chain data.
    function mintArtwork(address to) external onlyOwner returns (uint256) {
        require(to != address(0), "invalid recipient");
        require(_nextTokenId == 0, "artwork already minted");

        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;

        _safeMint(to, tokenId);

        emit ArtworkMinted(to, tokenId, tokenURI(tokenId));
        return tokenId;
    }

    // Convenience getter used during demos and reviews.
    function nextTokenId() external view returns (uint256) {
        return _nextTokenId;
    }

    // Returns a fully on-chain JSON metadata document encoded as a data URI.
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");

        bytes memory metadata = abi.encodePacked(
            '{"name":"TokenizeArt42 Bonus - Sunset Over 42",',
            '"description":"Bonus version of the 42 TokenizeArt NFT with metadata and image fully stored on-chain.",',
            '"artist":"thibnguy",',
            '"image":"',
            _imageURI(),
            '",',
            '"attributes":[',
            '{"trait_type":"Project","value":"TokenizeArt"},',
            '{"trait_type":"Series","value":"42"},',
            '{"trait_type":"Storage","value":"On-chain"},',
            '{"trait_type":"Title","value":"Sunset Over 42"}',
            "]}"
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(metadata)
            )
        );
    }

    function _imageURI() private pure returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">',
            '<defs>',
            '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">',
            '<stop offset="0%" stop-color="#10182d"/>',
            '<stop offset="55%" stop-color="#41314f"/>',
            '<stop offset="100%" stop-color="#ff8f45"/>',
            "</linearGradient>",
            '<linearGradient id="water" x1="0" y1="0" x2="0" y2="1">',
            '<stop offset="0%" stop-color="#40304c"/>',
            '<stop offset="100%" stop-color="#10182d"/>',
            "</linearGradient>",
            '<linearGradient id="glow42" x1="0" y1="0" x2="1" y2="1">',
            '<stop offset="0%" stop-color="#ffe08a"/>',
            '<stop offset="100%" stop-color="#ff8a3d"/>',
            "</linearGradient>",
            "</defs>",
            '<rect width="900" height="900" fill="url(#sky)"/>',
            '<circle cx="690" cy="410" r="78" fill="#ffd36e" opacity="0.95"/>',
            '<path d="M0 520 L130 430 L270 520 L420 410 L610 520 L760 450 L900 540 L900 900 L0 900 Z" fill="#20253a"/>',
            '<path d="M0 650 Q180 600 360 670 T900 650 L900 900 L0 900 Z" fill="url(#water)"/>',
            '<rect x="168" y="296" width="112" height="236" rx="12" fill="url(#glow42)"/>',
            '<rect x="116" y="402" width="228" height="78" rx="12" fill="url(#glow42)"/>',
            '<rect x="388" y="296" width="210" height="78" rx="12" fill="url(#glow42)"/>',
            '<rect x="520" y="296" width="78" height="236" rx="12" fill="url(#glow42)"/>',
            '<rect x="388" y="454" width="210" height="78" rx="12" fill="url(#glow42)"/>',
            '<path d="M118 532 L598 532" stroke="#fff0bd" stroke-width="7" opacity="0.48"/>',
            '<path d="M120 620 Q290 655 455 625 T790 620" stroke="#ffbf82" stroke-width="12" opacity="0.34" fill="none"/>',
            '<text x="86" y="828" fill="#fff3d0" font-family="monospace" font-size="32">TokenizeArt42 Bonus</text>',
            '<text x="86" y="866" fill="#ffd696" font-family="monospace" font-size="24">on-chain image + on-chain metadata</text>',
            "</svg>"
        );

        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(svg)
            )
        );
    }
}

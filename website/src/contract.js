export const SEPOLIA_CHAIN_ID = 11155111;

export const CONTRACT_ABI = [
  "function mintArtwork(address to) external returns (uint256)",
  "function nextTokenId() external view returns (uint256)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
];

# TokenizeArt Whitepaper

**Name:** Thibnguy
**Version:** 1.0
**Network:** Ethereum Sepolia Testnet
**Standard:** ERC-721

---

## 1. Abstract

TokenizeArt42 is a non-fungible token project deployed on Ethereum Sepolia.
It demonstrates the creation, minting, and verification of an NFT while keeping the image and metadata on distributed storage such as IPFS.

The project is educational and intended to show the complete workflow of an NFT:

- image preparation
- metadata creation
- smart contract deployment
- minting
- ownership verification

---

## 2. Technical Specifications

- **Blockchain**: Ethereum Sepolia
- **Token Standard**: ERC-721
- **Programming Language**: Solidity
- **Libraries**: OpenZeppelin
- **Development Tools**: Remix IDE, MetaMask, Sepolia Etherscan, IPFS
- **Contract Name**: TokenizeArt42
- **Symbol**: T42A
- **Mint Function**: `mintArtwork(address to, string metadataURI)`

The contract is based on `ERC721URIStorage`, which allows each NFT to store its own metadata URI.

---

## 3. Metadata

The NFT metadata must be stored off-chain using distributed storage.
IPFS is the intended solution.

The metadata should include:

- `name`: must include `42`
- `description`
- `image`: IPFS image URI
- `attributes`
- artist information using the login `thibnguy`

Example metadata structure:

```json
{
  "name": "TokenizeArt42 - Soaring Eagle",
  "description": "An ERC-721 NFT created for the 42 TokenizeArt project.",
  "artist": "thibnguy",
  "image": "ipfs://<IMAGE_CID>/tokenizeart42.png",
  "attributes": [
    { "trait_type": "Project", "value": "TokenizeArt" },
    { "trait_type": "Series", "value": "42" }
  ]
}
```

---

## 4. Features

The contract provides:

- unique NFTs through ERC-721
- ownership verification with `ownerOf`
- per-token metadata with `tokenURI`
- privileged minting with `onlyOwner`

This makes the security model simple and explicit during evaluation.

---

## 5. Usage

### Deploy

Deploy `TokenizeArt42` on Sepolia with your wallet address as the constructor owner.

### Mint

Call:

```text
mintArtwork(walletAddress, ipfs://<METADATA_CID>/tokenizeart42.json)
```

### Verify

After minting, check:

- `ownerOf(0)`
- `tokenURI(0)`

These calls prove both ownership and metadata linkage.

---

## 6. Security

Only the contract owner can mint.
This avoids arbitrary NFT creation by other wallets and demonstrates privilege management, which is part of the subject expectations.

The NFT itself remains transferable through the standard ERC-721 transfer functions once minted.

---

## 7. Conclusion

TokenizeArt42 demonstrates the full lifecycle of an NFT project:

- artwork preparation
- metadata creation on IPFS
- ERC-721 contract deployment
- controlled minting
- on-chain ownership verification

It follows the subject constraints while keeping the design simple enough to demonstrate clearly during evaluation.

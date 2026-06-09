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
- **Contract Address**: `0xd13fCD49fe5f3cA6569a80BEFa16b3aF50Ab543F`
- **Mint Function**: `mintArtwork(address to)`

The contract is based on `ERC721URIStorage`, with a single metadata URI hardcoded in the contract so that only the project NFT can be minted.

Bonus on-chain version:

- **Bonus Contract Name**: `TokenizeArt42Bonus`
- **Bonus Symbol**: `T42B`
- **Bonus Contract Address**: `0x0edb1f1be1D342687813FFc1f8054A9aEa61b442`
- **Bonus Storage Model**: metadata and image stored fully on-chain

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
  "name": "TokenizeArt42 - Sunset Over 42",
  "description": "An ERC-721 NFT created for the 42 TokenizeArt project.",
  "artist": "thibnguy",
  "image": "ipfs://bafybeifa3ss6b4b5bqw52c3o6rvbf7fl4boqxl7kydtujczrj46joopjze",
  "attributes": [
    { "trait_type": "Project", "value": "TokenizeArt" },
    { "trait_type": "Series", "value": "42" },
    { "trait_type": "Title", "value": "Sunset Over 42" }
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

Deploy `TokenizeArt42` on Sepolia with your wallet address as the constructor owner. The metadata URI is already hardcoded in the contract.

### Mint

Call:

```text
mintArtwork(walletAddress)
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

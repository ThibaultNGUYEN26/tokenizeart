# TokenizeArt

## Goal

`TokenizeArt` is the NFT version of the `Tokenizer` project.
It creates a non-fungible token on Ethereum Sepolia using the `ERC-721` standard and stores the artwork metadata through distributed storage such as IPFS.

The name contains `42`, as required by the subject.

## Technical Choices

I made the same main technical choices as in the `Tokenizer` project in order to keep a familiar workflow and tools:

- `Solidity` for the smart contract
- `Remix IDE` to write, compile, and deploy the contract
- `MetaMask` to connect my wallet and sign transactions
- `Ethereum Sepolia` as the public test network

This choice allowed me to reuse the same development approach while adapting it to an NFT project based on the `ERC-721` standard.

### Blockchain: Ethereum Sepolia

I chose **Ethereum Sepolia** because it is a public testnet, fully supported by MetaMask and Sepolia Etherscan, and does not require real money.
This matches the subject requirement to avoid using real funds.

### Standard: ERC-721

An NFT must be unique, so `ERC-721` is the right standard.
It provides the usual NFT functions such as:

- `ownerOf`
- `tokenURI`
- `safeTransferFrom`

These functions make it possible to prove ownership and inspect NFT metadata during evaluation.

### Language and Tools

- **OpenZeppelin** for audited ERC-721 building blocks
- **Sepolia Etherscan** for contract verification and NFT inspection

### Ownership and Privileges

The contract uses an owner-only mint function.
This makes privileges explicit:

- only the contract owner can mint a new NFT
- any wallet can verify the owner through `ownerOf`
- the NFT holder can later transfer the token with the standard ERC-721 functions

### Metadata and Image Storage

The subject requires the image to be stored using distributed registry technology.
For that reason, the artwork image and metadata should be uploaded to **IPFS**.

The contract stores a fixed metadata URI:

```text
ipfs://bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey
```

That metadata file should contain:

- the NFT name including `42`
- a title
- the artist name, which must be your login
- the image URI on IPFS

The current contract is hardcoded to mint this single NFT only. The owner can mint once, and the token URI is fixed in the Solidity code.

## Deployment Result

- Network: Ethereum Sepolia
- Contract address: `0xd13fCD49fe5f3cA6569a80BEFa16b3aF50Ab543F`

## Bonus Deployment Result

- Network: Ethereum Sepolia
- Bonus contract address: `0x0edb1f1be1D342687813FFc1f8054A9aEa61b442`
- Bonus contract file: [code/TokenizeArt42_bonus.sol](/home/thibnguy/42/tokenizeart/code/TokenizeArt42_bonus.sol:1)

## Repository Structure

This project follows the same structure as `tokenizer`:

- `code/` contains the Solidity contract
- `deployment/` contains deployment instructions
- `documentation/` contains the whitepaper-style explanation
- `mint/` contains an example metadata file for the NFT

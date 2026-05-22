# TokenizeArt

## Goal

`TokenizeArt` is the NFT version of the `tokenizer` project.
It creates a non-fungible token on Ethereum Sepolia using the `ERC-721` standard and stores the artwork metadata through distributed storage such as IPFS.

The name contains `42`, as required by the subject.

## Technical Choices

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

- **Solidity** for the smart contract
- **OpenZeppelin** for audited ERC-721 building blocks
- **Remix IDE** for compilation and deployment
- **MetaMask** for signing transactions
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

The contract stores a metadata URI such as:

```text
ipfs://<METADATA_CID>/tokenizeart42.json
```

That metadata file should contain:

- the NFT name including `42`
- a title
- the artist name, which must be your login
- the image URI on IPFS

## Deployment Result

- Network: Ethereum Sepolia
- Contract address: `0x38aBAc795AcBB63571BfFd52F5e6442756e0e4c1`

## Repository Structure

This project follows the same structure as `tokenizer`:

- `code/` contains the Solidity contract
- `deployment/` contains deployment instructions
- `documentation/` contains the whitepaper-style explanation
- `mint/` contains an example metadata file for the NFT

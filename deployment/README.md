# TokenizeArt Deployment

## 1. Prepare MetaMask

- Install MetaMask
- Switch to the **Sepolia** network
- Get free Sepolia ETH from a faucet

## 2. Upload the NFT Files to IPFS

Before minting, upload:

- the artwork image
- the metadata JSON file

Example metadata URI:

```text
ipfs://<METADATA_CID>/tokenizeart42.json
```

## 3. Compile the Contract

Open Remix and compile:

```text
tokenizeart/code/TokenizeArt42.sol
```

Compiler version:

```text
0.8.20
```

## 4. Deploy the Contract

In **Deploy & Run Transactions**:

- environment: `Injected Provider - MetaMask`
- network: `Sepolia`
- contract: `TokenizeArt42`

Constructor argument:

- `initialOwner`: your wallet address

## 5. Mint the NFT

Call:

```text
mintArtwork(to, metadataURI)
```

Example:

- `to`: your wallet address
- `metadataURI`: `ipfs://<METADATA_CID>/tokenizeart42.json`

The first minted NFT will usually have:

```text
tokenId = 0
```

## 6. Verify Ownership

Use:

- `ownerOf(0)`
- `tokenURI(0)`
- `nextTokenId()`

## 7. Verify the Contract on Etherscan

After deployment:

- copy the contract address
- open Sepolia Etherscan
- verify the contract from Remix or through Etherscan

The repository must mention:

- the contract address
- the network used

## 8. Display the NFT

Once minted, the NFT can be inspected on:

- Sepolia Etherscan
- MetaMask or another NFT-capable wallet, depending on support
- marketplaces or explorers that support Sepolia NFTs

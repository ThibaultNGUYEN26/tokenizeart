# TokenizeArt Deployment Tutorial

This document explains exactly how to deploy and mint the NFT with Remix, MetaMask, Sepolia, and IPFS.

The current contract is designed to mint only one NFT:

- the metadata URI is hardcoded in the Solidity contract
- only the contract owner can mint
- the NFT can be minted only once

The hardcoded metadata URI used by the contract is:

```text
ipfs://bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey
```

## 1. What You Need Before Starting

You need:

- a MetaMask wallet
- Sepolia ETH for gas fees
- the `TokenizeArt42.sol` contract
- the NFT image already uploaded to IPFS
- the NFT metadata JSON already uploaded to IPFS

This project uses:

- network: `Ethereum Sepolia`
- standard: `ERC-721`
- compiler: `Solidity 0.8.24`
- deployment tool: `Remix`

## 2. Check the Metadata Before Deployment

Before deploying, make sure the NFT metadata is already correct because the contract uses a fixed IPFS URI.

The metadata file used by the contract is:

```text
ipfs://bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey
```

The image used inside the metadata is:

```text
ipfs://bafybeifa3ss6b4b5bqw52c3o6rvbf7fl4boqxl7kydtujczrj46joopjze
```

Check that:

1. the metadata URI opens in a public IPFS gateway
2. the `image` field inside the JSON points to the correct image CID
3. the image CID also opens in a public IPFS gateway

Example gateway format:

```text
https://ipfs.io/ipfs/bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey
```

If the metadata is wrong, fix it before deployment. Since the URI is hardcoded in the contract, a wrong CID means you must edit the contract and redeploy.

### How to Get the Image CID and Metadata CID

In this project, the CIDs are obtained by uploading the files to Pinata.

There are two different CIDs:

- the image CID: obtained by uploading the PNG image to Pinata
- the metadata CID: obtained by uploading the JSON metadata file to Pinata

The order is important.

1. Upload `tokenizeart42.png` to Pinata.
2. Copy the CID returned by Pinata.
3. Put that image CID into the `image` field of `tokenizeart42.json`.
4. Upload `tokenizeart42.json` to Pinata.
5. Copy the CID returned by Pinata.

The first CID is the image CID.
The second CID is the metadata CID.

For this project, the metadata file is:

- [mint/tokenizeart42.json](/home/thibnguy/42/tokenizeart/mint/tokenizeart42.json:1)

Before uploading the JSON, make sure the file is final and that the `image` field already contains the real IPFS URI of the uploaded PNG.

The CID returned by Pinata after uploading `tokenizeart42.json` is the metadata CID.

Example:

- image CID: `bafybeifa3ss6b4b5bqw52c3o6rvbf7fl4boqxl7kydtujczrj46joopjze`
- image URI: `ipfs://bafybeifa3ss6b4b5bqw52c3o6rvbf7fl4boqxl7kydtujczrj46joopjze`
- metadata CID: `bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey`
- metadata URI: `ipfs://bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey`

If Pinata gives you a gateway link such as:

```text
https://gateway.pinata.cloud/ipfs/bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey
```

then the metadata CID is simply the part after `/ipfs/`.

## 3. Prepare MetaMask

1. Open MetaMask.
2. Select the `Sepolia` network.
3. Make sure the wallet has some Sepolia ETH.
4. Copy your wallet address.

This wallet address will be used:

- as the `initialOwner` during deployment
- as the recipient address when calling `mintArtwork`

## 4. Open Remix and Create the Contract File

1. Open `https://remix.ethereum.org`.
2. In the File Explorer, create a new file named `TokenizeArt42.sol`.
3. Open [code/TokenizeArt42.sol](/home/thibnguy/42/tokenizeart/code/TokenizeArt42.sol:1) from this repository.
4. Copy the full content of that file.
5. Paste it into the Remix file.

Important:

- deploy the exact code from the repository
- do not use an older version you may still have in Remix tabs

## 5. Compile the Contract

1. Open the `Solidity Compiler` tab in Remix.
2. Select compiler version `0.8.24`.
3. If needed, keep the default modern EVM settings used by Remix.
4. Click `Compile TokenizeArt42.sol`.

Compilation must succeed without errors.

At this point the contract constructor should be:

```solidity
constructor(address initialOwner)
```

That means deployment needs only one value: the owner wallet address.

## 6. Connect Remix to MetaMask

1. Open the `Deploy & Run Transactions` tab in Remix.
2. In `Environment`, choose `Injected Provider - MetaMask`.
3. Accept the connection request in MetaMask if it appears.
4. Confirm that MetaMask is connected to `Sepolia`.

Check that the account shown in Remix is the same wallet you want to use.

## 7. Deploy the Contract

In Remix:

1. Make sure the selected contract is `TokenizeArt42`.
2. In the constructor field, paste your wallet address as `initialOwner`.
3. Click `Deploy`.
4. Confirm the transaction in MetaMask.

Example:

```text
initialOwner = 0xYourWalletAddress
```

After the transaction is confirmed:

1. Remix will show the deployed contract in the `Deployed Contracts` section.
2. Copy the deployed contract address.

## 8. Mint the NFT

The contract is hardcoded to mint the project NFT only once.

In the deployed contract section in Remix:

1. Open `mintArtwork`.
2. In the `to` field, paste the wallet address that should receive the NFT.
3. Click `mintArtwork`.
4. Confirm the transaction in MetaMask.

Example:

```text
to = 0xYourWalletAddress
```

Important:

- you do not pass a metadata URI here
- the contract already knows the NFT metadata URI
- the first minted token will be `tokenId = 0`
- a second mint will fail because the contract allows only one NFT

## 9. Verify the Result in Remix

After minting, call these functions on the deployed contract:

1. `ownerOf(0)`
2. `tokenURI(0)`
3. `nextTokenId()`

Expected results:

- `ownerOf(0)` returns your wallet address
- `tokenURI(0)` returns `ipfs://bafkreicbvt6znq5exrj3wgdm3q3a6vgqey4xwl4bzpkkwnmu7i2u6b6dey`
- `nextTokenId()` returns `1`

These three calls are enough to show:

- the NFT exists
- the NFT owner is known
- the NFT metadata is linked correctly
- the contract cannot mint a second NFT

## 10. Verify the NFT Metadata Manually

To confirm that the NFT is visible and not broken:

1. Take the result of `tokenURI(0)`.
2. Open it through a public IPFS gateway.
3. Check that the JSON loads correctly.
4. Copy the `image` value from the JSON.
5. Open that image URI through a public IPFS gateway too.

If both the metadata and image open correctly, the NFT should be displayable by wallets and explorers, even if some interfaces refresh slowly.

## 11. Verify on Etherscan

After deployment and minting:

1. Open `https://sepolia.etherscan.io`.
2. Search for the contract address.
3. Open the contract page.
4. Check the NFT transfer or mint transaction.
5. Optionally verify the source code using Remix or Etherscan.

This helps during evaluation because it proves the contract and mint exist on a public blockchain.

## 12. What to Put in the Repository

After the final deployment, update the repository with:

- the network name: `Ethereum Sepolia`
- the deployed contract address
- the token ID: `0`
- the metadata URI
- the image URI

The most important place to update is the root [README.md](/home/thibnguy/42/tokenizeart/README.md:1).

## 13. Common Mistakes

- Using the wrong MetaMask network instead of `Sepolia`
- Deploying an older version of the contract from Remix tabs
- Using a broken IPFS CID
- Adding `/tokenizeart42.png` or `/tokenizeart42.json` when the uploaded IPFS object is a single file CID
- Forgetting that this contract can mint only once

## 14. Minimal Evaluation Demo

During evaluation, a minimal demonstration can be:

1. show the contract code
2. show the deployed contract address on Sepolia
3. call `ownerOf(0)`
4. call `tokenURI(0)`
5. open the metadata URI
6. open the image URI

This is enough to prove deployment, minting, ownership, and NFT display.

# TokenizeArt Website

This folder contains a React frontend to mint the NFT from a graphical interface.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown by Vite.

4. Paste your deployed Sepolia contract address directly into the website UI.

## Features

- Connect MetaMask
- Check that the wallet is on Sepolia
- Mint the NFT by calling `mintArtwork(address to)`
- Read `nextTokenId()`
- Read `ownerOf(0)`
- Read `tokenURI(0)`

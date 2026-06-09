import { useEffect, useState } from "react";
import { BrowserProvider, Contract, isAddress } from "ethers";
import { CONTRACT_ABI, SEPOLIA_CHAIN_ID } from "./contract.js";

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function App() {
  const [account, setAccount] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("Connect MetaMask on Sepolia to mint the NFT.");
  const [isMinting, setIsMinting] = useState(false);
  const [tokenInfo, setTokenInfo] = useState({
    nextTokenId: "",
    owner: "",
    tokenUri: "",
  });

  useEffect(() => {
    if (!window.ethereum) {
      setStatus("MetaMask is required to use this page.");
      return;
    }

    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      const wallet = accounts[0] ?? "";
      setAccount(wallet);
      setRecipient(wallet);
    });

    const handleAccountsChanged = (accounts) => {
      const wallet = accounts[0] ?? "";
      setAccount(wallet);
      setRecipient(wallet);
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  async function buildContract() {
    if (!window.ethereum) {
      throw new Error("MetaMask is not available.");
    }

    if (!isAddress(contractAddress)) {
      throw new Error("Enter a valid deployed contract address.");
    }

    const provider = new BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();

    if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
      throw new Error("Switch MetaMask to Ethereum Sepolia.");
    }

    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, CONTRACT_ABI, signer);
    return { contract, signer };
  }

  async function connectWallet() {
    if (!window.ethereum) {
      setStatus("MetaMask is required to connect a wallet.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const wallet = accounts[0] ?? "";
      setAccount(wallet);
      setRecipient(wallet);
      setStatus(`Connected: ${shortenAddress(wallet)}`);
    } catch (error) {
      setStatus(error.message || "Wallet connection failed.");
    }
  }

  async function refreshTokenInfo() {
    try {
      const { contract } = await buildContract();
      const nextTokenId = await contract.nextTokenId();

      let owner = "";
      let tokenUri = "";

      if (Number(nextTokenId) > 0) {
        owner = await contract.ownerOf(0);
        tokenUri = await contract.tokenURI(0);
      }

      setTokenInfo({
        nextTokenId: nextTokenId.toString(),
        owner,
        tokenUri,
      });
      setStatus("On-chain data refreshed.");
    } catch (error) {
      setStatus(error.message || "Unable to read the contract.");
    }
  }

  async function handleMint(event) {
    event.preventDefault();

    if (!isAddress(recipient)) {
      setStatus("Enter a valid recipient address.");
      return;
    }

    setIsMinting(true);
    setStatus("Waiting for MetaMask confirmation...");

    try {
      const { contract } = await buildContract();
      const tx = await contract.mintArtwork(recipient);
      setStatus(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      setStatus("Mint confirmed on Sepolia.");
      await refreshTokenInfo();
    } catch (error) {
      setStatus(error.reason || error.shortMessage || error.message || "Mint failed.");
    } finally {
      setIsMinting(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <p className="eyebrow">TokenizeArt42</p>
        <h1>Mint TokenizeArt42 from your browser.</h1>
        <p className="lead">
          Connect MetaMask on Sepolia and call the one-time
          <code> mintArtwork(address)</code> function from a simple React interface.
        </p>
        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={connectWallet}>
            {account ? `Wallet: ${shortenAddress(account)}` : "Connect MetaMask"}
          </button>
          <button className="secondary-button" type="button" onClick={refreshTokenInfo}>
            Refresh Contract Data
          </button>
        </div>
      </section>

      <section className="grid-layout">
        <article className="card">
          <h2>Contract Setup</h2>
          <p className="card-copy">
            Enter the deployed Sepolia contract address before reading or minting.
          </p>
          <label className="field-label" htmlFor="contractAddress">
            Contract address
          </label>
          <input
            id="contractAddress"
            name="contractAddress"
            type="text"
            value={contractAddress}
            onChange={(event) => setContractAddress(event.target.value)}
            placeholder="0x..."
            autoComplete="off"
          />
          <dl className="details-list">
            <div>
              <dt>Network</dt>
              <dd>Ethereum Sepolia</dd>
            </div>
            <div>
              <dt>Contract</dt>
              <dd className="breakable">{contractAddress || "Not set"}</dd>
            </div>
            <div>
              <dt>Metadata</dt>
              <dd>Hardcoded in the Solidity contract</dd>
            </div>
          </dl>
        </article>

        <article className="card accent-card">
          <h2>Mint NFT</h2>
          <form className="mint-form" onSubmit={handleMint}>
            <label htmlFor="recipient">Recipient address</label>
            <input
              id="recipient"
              name="recipient"
              type="text"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              placeholder="0x..."
              autoComplete="off"
            />
            <button className="primary-button" type="submit" disabled={isMinting}>
              {isMinting ? "Minting..." : "Mint Token 0"}
            </button>
          </form>
          <p className="status-box">{status}</p>
        </article>

        <article className="card">
          <h2>Token State</h2>
          <dl className="details-list">
            <div>
              <dt>Next token ID</dt>
              <dd>{tokenInfo.nextTokenId || "Unknown"}</dd>
            </div>
            <div>
              <dt>Owner of token 0</dt>
              <dd className="breakable">{tokenInfo.owner || "Not minted yet"}</dd>
            </div>
            <div>
              <dt>tokenURI(0)</dt>
              <dd className="breakable">{tokenInfo.tokenUri || "Not minted yet"}</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}

export default App;

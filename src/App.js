import React, { useEffect, useState } from 'react';
import './App.css';

// Blockchain Imports 
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import generationOmega from './utils/GenerationOmega.json';
import { ethers } from 'ethers';
import { networks } from './utils/networks';

// Custom Components
import ExploreWasteland from './components/ExploreWasteland';
import LoadingIndicator from './components/LoadingIndicator';
import Navbar from './components/Navbar';
import MintCharacter from './components/MintCharacter';
import SelectCharacter from './components/SelectCharacter';

// Constants
import twitterLogo from './assets/twitter-logo.svg';
import polygonLogo from './assets/polygonlogo.png';
import ethLogo from './assets/ethlogo.png';
const TWITTER_HANDLE = 'GenerationOmega';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

	const switchNetwork = async () => {
		if (window.ethereum) {
			try {
				// Try to switch to the Mumbai testnet
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x4' }], // Check networks.js for hexadecimal network ids
				});
			} catch (error) {
				// This error code means that the chain we want has not been added to MetaMask
				// In this case we ask the user to add it to their MetaMask
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{	
									chainId: '0x4',
									chainName: 'Rinkeby Test Network',
									rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
									nativeCurrency: {
											name: "Rinkeby Ethereum",
											symbol: "ETH",
											decimals: 18
									},
									blockExplorerUrls: ["https://rinkeby.etherscan.io/"]
								},
							],
						});
					} catch (error) {
						console.log(error);
					}
				}
				console.log(error);
			}
		} else {
			// If window.ethereum is not found then MetaMask is not installed
			alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		} 
	}

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!'); // DEBUG
        return;
      } else {
        // console.log('We have the ethereum object', ethereum); // DEBUG

        /*
         * Check if we are on the correct network verison
         */
        const networkVersion = await ethereum.request({ method: 'eth_chainId' });
        if (networkVersion === '0x4') {
          // console.log('Client connected to CORRECT Network Version: ' + networkVersion); // DEBUG
          setIsCorrectNetwork(true);
        } else {
          // console.log('Client connected to INCORRECT Network Version: ' + networkVersion); // DEBUG
          setIsCorrectNetwork(false);
          setIsLoading(false);
        }

        ethereum.on('chainChanged', handleChainChanged);

        // Reload the page when they change networks
        function handleChainChanged(_chainId) {
          window.location.reload();
        }

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          const account = accounts[0];
          // console.log('Found an authorized account:', account); // DEBUG
          setCurrentAccount(account);
        } else {
          // console.log('No authorized account found'); // DEBUG
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Render Methods
  const renderContent = () => {
    // console.log("Location:" + location); // DEBUG
    if (isLoading) {
      return <LoadingIndicator />;
    }  

    /*
    * Scenario #0: Wrong Network Not Connected
    */
    if (!isCorrectNetwork) {
      return (
        <div className="select-character-container">
          <h2>Please connect to the Rinkeby Test Network</h2>
          <button className='cta-button mint-button' onClick={switchNetwork}>Click here to switch</button>
        </div>
      );
    }

    /*
    * Scenario #1: Account Not Connected
    */
    else if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <p className="sub-text">Can you survive in this post-apocalyptic world?</p>
          <img
            src="http://pa1.narvii.com/6335/113796f7ded0f179eee7ea4ae68db23ca97412ce_hq.gif"
            alt="Sword Art Online Gif"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
    }
    /*
    * Scenario #2: Connected Wallet but no Player NFT
    */
    else if (location === "MintCharacter") {
        return <MintCharacter setLocation={setLocation} />;
    }
    /*
    * Scenario #3: If there is a connected wallet and list of characters and NO selected charaters,
    * show your list of characters to select!
    */
    else if (location === "SelectCharacter") {
      return <SelectCharacter characterList={characterList} setCharacterNFT={setCharacterNFT} setLocation={setLocation}  />;
    }
    /*
    * Scenario #4: If there is a connected wallet and selected characterNFT, it's time to battle!
    */
    else if (location === "ExploreWasteland") {
        return <ExploreWasteland characterNFT={characterNFT} setLocation={setLocation} />;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    /*
    * The function we will call that interacts with out smart contract
    */
    const fetchNFTMetadata = async () => {
      // console.log('Checking for Character NFT on address:', currentAccount); // DEBUG
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        generationOmega, // myEpicGame.abi,
        signer
      );

      try {
        // const remainingTokens = await gameContract.remainingTokens()
        // const mintedSoFar = 5000 - remainingTokens.toNumber()
        const accountNFTs = []

        // TEST STUFF
        const balance = await gameContract.balanceOf(currentAccount)
        for (let i = 0; i < balance; i++) {
          const nftIndex = await gameContract.tokenOfOwnerByIndex(currentAccount, i)
          const characterDataRaw = (await gameContract.tokenURI(nftIndex))
          console.log( characterDataRaw );
          if (characterDataRaw) {
            // console.log('User has Character NFT #' + nftIndex); // DEBUG
            const characterData = transformCharacterData(characterDataRaw, nftIndex)
            accountNFTs.push(characterData)
          } else {
            // console.log('No character NFT found!'); // DEBUG
          }  
        }

        // Looper
        // for (let i = 0; i < mintedSoFar; i++) {
        //   // const ownerAddress = await gameContract.ownerClaim(i)
        //   // if ( currentAccount === ownerAddress){
        //     const characterDataRaw = (await gameContract.tokenURI(i))
        //     if (characterDataRaw) {
        //       console.log('User has Character NFT #' + i);
        //       const characterData = transformCharacterData(characterDataRaw)
        //       accountNFTs.push(characterData)
        //     } else {
        //       console.log('No character NFT found!');
        //     }       
        //   // }
        // }
        setCharacterList(accountNFTs);
        if (accountNFTs.length > 0){
          setLocation("SelectCharacter")
        }
        else {
          setLocation("MintCharacter")
        }
      } catch (error) {
        if (error.toString().includes("URI query for nonexistent token")){
          console.log("CONTRACT ERROR: URI query for nonexistent token");
        }
        console.log("Full Error: " + error.toString()); // DEBUG
      }
      setIsLoading(false);
    };

    /*
    * We only want to run this, if we have a connected wallet
    */
    if (currentAccount) {
      // console.log('CurrentAccount:', currentAccount); // DEBUG
      fetchNFTMetadata();
    }
  }, [currentAccount, ]);

  return (
    <div className="App">
      <Navbar setLocation={setLocation}/>
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Generation Omega</p>
          {renderContent()}
        </div>
        <br/>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Twitter -> @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
import React, { useEffect, useState } from 'react';
import './MintCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import generationOmega from '../../utils/GenerationOmega.json';
import LoadingIndicator from '../LoadingIndicator';
import mintThumb from '../../assets/post2.png';
import CharacterCard from '../SelectCharacter/CharacterCard';

/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const MintCharacter = ({ setLocation }) => {
  // State
  // const characterNFT
  const [gameContract, setGameContract] = useState(null);
  const [mintingCharacter, setMintingCharacter] = useState(false);
  const [mintedCharacter, setMintedCharacter] = useState(null);


  // Actions
  const mintCharacterNFTAction = () => async () => {
    console.log("Hiya! Minty!");
    try {
      if (gameContract) {
        setMintingCharacter(true);
        console.log('Minting character in progress...');
        // TODO: Add Mint Quantity (Hardcode to 1)
        // TODO: Get Mint Price from Public Func (Amend in Contract)
        const mintTxn = await gameContract.buy(1, { value: ethers.utils.parseEther("0.02") });
        await mintTxn.wait();
        console.log('mintTxn:', mintTxn);
        setMintingCharacter(false);
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error);
      setMintingCharacter(false);
    }
  };

  // UseEffect
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        generationOmega,
        signer
      );

      /*
      * This is the big difference. Set our gameContract in state.
      */
      console.log(gameContract);
      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, []);

  useEffect(() => {
    /*
    * Add a callback method that will fire when this event is received
    */
    const onCharacterMint = async (sender, tokenId) => {
      console.log(
        `CharacterNFTMinted - \n sender: ${sender} \n tokenId: ${tokenId.toNumber()}`
      );

      /*
      * Once our character NFT is minted we can fetch the metadata from our contract
      * and set it in state to move onto the Arena
      */
      if (gameContract) {
        const characterNFT = await gameContract.tokenURI(tokenId);
        console.log('CharacterNFT: ', characterNFT);
        setMintedCharacter(transformCharacterData(characterNFT));
      }
    };

    /*
     * Setup NFT Minted Listener
     */
    if (gameContract) {
      gameContract.on('CharacterMinted', onCharacterMint);      
    }

    return () => {
      /*
       * When your component unmounts, let;s make sure to clean up this listener
       */
      if (gameContract) {
        gameContract.off('CharacterMinted', onCharacterMint);
      }
    };
  }, [gameContract, setMintedCharacter]);

  const renderContent = () => {
    /*
    * Scenario #1: Minting Character
    */
    if (mintingCharacter) {
      return (
        <div className="select-character-container">
          <div className="loading">
            <div className="indicator">
              <LoadingIndicator />
              <p>Minting In Progress...</p>
            </div>
            <img
              src="https://pa1.narvii.com/6233/df1f29949b34437fbafd41f3d3b11b4952215955_hq.gif"
              alt="Minting loading indicator"
            />
          </div>
        </div>
      );
    /*
    * Scenario #2: Not Minting Character and Have Not Minted Yet
    */
    } else if (!mintingCharacter && !mintedCharacter) {
      return (
        <div>
          <h2>You take your first step into the unknown...</h2>
          <img
            src={mintThumb}
            alt="Welcome to the Wasteland"
          />
          <br/>
          <br/>
          <button
            className="cta-button connect-wallet-button"
            // onClick={() => console.log("heya")}
            onClick={mintCharacterNFTAction()}
          >
            Realize Your Existence (Mint Character)
          </button>
        </div>
      );
    /*
    * Scenario #3: Not Minting Character and Have Already Minted Character
    */
    } else if (!mintingCharacter && mintedCharacter) {
      console.log( mintedCharacter )
      return (
        <div>
          <h2>Welcome to the Wasteland, {mintedCharacter.name}</h2>
          <CharacterCard characterNFT={mintedCharacter}/>
          <br/>
          <br/>
          <button
            className="cta-button connect-wallet-button"
            // onClick={() => console.log("heya")}
            onClick={() => setLocation("SelectCharacter")}
          >
            Enter the Wasteland
          </button>
        </div>
      );
    }
  };

  return (
    <div className="select-character-container">
      {renderContent()}
    </div>
  );
};

export default MintCharacter;
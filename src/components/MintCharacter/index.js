import React, { useEffect, useState } from 'react';
import './MintCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import generationOmega from '../../utils/GenerationOmega.json';
import LoadingIndicator from '../LoadingIndicator';
import mintThumb from '../../assets/post2.png';


/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const MintCharacter = ({ setCharacterNFT }) => {
  // State
  const [gameContract, setGameContract] = useState(null);
  const [mintingCharacter, setMintingCharacter] = useState(false);

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
        `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()}`
      );

      /*
      * Once our character NFT is minted we can fetch the metadata from our contract
      * and set it in state to move onto the Arena
      */
      if (gameContract) {
        const characterNFT = await gameContract.checkIfUserHasNFT();
        console.log('CharacterNFT: ', characterNFT);
        setCharacterNFT(transformCharacterData(characterNFT));
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
  }, [gameContract, setCharacterNFT]);

  const renderContent = () => {
    /*
    * Scenario #1: Minting Character
    */
    if (mintingCharacter) {
      return (
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
      );
    /*
    * Scenario #2: Not Minting Character
    */
    } else if (!mintingCharacter) {
      return (
        <div>
          <img
            src={mintThumb}
            alt="Welcome to the Wasteland"
          />
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
    }
  };

  return (
    <div className="select-character-container">
      <h2>You take your first step into the unknown...</h2>
      {renderContent()}
    </div>
  );
};

export default MintCharacter;
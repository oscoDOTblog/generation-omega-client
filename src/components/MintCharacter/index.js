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
        const mintTxn = await gameContract.ownerClaim(1);
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
      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, []);


  return (
    <div className="select-character-container">
      <h2>You take your first step into the unknown...</h2>
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
      {/* Only show our loading state if mintingCharacter is true */}
      {mintingCharacter && (
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
      )}
    </div>
  );
};

export default MintCharacter;
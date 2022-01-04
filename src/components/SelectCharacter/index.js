import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, MAX_VALUE, transformCharacterData } from '../../constants';
import generationOmega from '../../utils/GenerationOmega.json';
import './SelectCharacter.css';
import LoadingIndicator from '../LoadingIndicator';

/*
 * We pass in our characterNFT metadata so we can a cool card in our UI
 */
const SelectCharacter = ({ characterNFT, setCharacterNFT }) => {
  // State
  const [gameContract, setGameContract] = useState(null);
  // TODO: Add Attack, HP, and MaxHP to Contract
  characterNFT['hp'] = 10
  characterNFT['maxHp'] = 20

  // UseEffects
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

      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, []);

//   const simpleRender = () => {
//     const skills = characterNFT.skills
//       return (
//         <div>
//             <p className="sub-text">You have minted your NFT! Here are its stats...</p>
//             <p className="sub-text">Strength: {characterNFT.strength}/{MAX_VALUE}</p>
//             <p className="sub-text">Dexterity: {characterNFT.dexterity}/{MAX_VALUE}</p>
//             <p className="sub-text">Constitution: {characterNFT.constitution}/{MAX_VALUE}</p>
//             <p className="sub-text">Intelligence: {characterNFT.intelligence}/{MAX_VALUE}</p>
//             <p className="sub-text">Wisdom: {characterNFT.wisdom}/{MAX_VALUE}</p>
//             <p className="sub-text">Charisma: {characterNFT.charisma}/{MAX_VALUE}</p>
//             {skills.map((skill,index) =>
//                 <p key={index} className="sub-text">Skill: {skill} </p>
//             )}
//         </div>
//       )
//   }

  return (
    <div className="arena-container">
      {/* Character NFT */}
      {characterNFT && (
        <div className="players-container">
          <div className="player-container">
            <h2>Your Character</h2>
            <div className="player">
              <div className="image-content">
                <h2>{characterNFT.name}</h2>
                <img
                  src={characterNFT.imageURI}
                  alt={`Character ${characterNFT.name}`}
                />
                <div className="health-bar">
                  <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                  <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
                </div>
              </div>
              <div className="stats">
                <span> 
                  <h4>{`💪 Strength: ${characterNFT.strength}/${MAX_VALUE}`}</h4>
                  <h4>{`🙌 Dexterity: ${characterNFT.dexterity}/${MAX_VALUE}`}</h4>
                </span>
                <h4>{`❤️ Constitution: ${characterNFT.constitution}/${MAX_VALUE}`}</h4>
                <h4>{`🧠 Intelligence: ${characterNFT.intelligence}/${MAX_VALUE}`}</h4>
                <h4>{`💭 Wisdom: ${characterNFT.wisdom}/${MAX_VALUE}`}</h4>
                <h4>{`✨ Charisma: ${characterNFT.charisma}/${MAX_VALUE}`}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCharacter;
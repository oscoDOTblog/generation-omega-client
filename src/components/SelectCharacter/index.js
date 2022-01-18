import React from 'react';
import CharacterCard from './CharacterCard';

// import LoadingIndicator from '../LoadingIndicator';

/*
 * We pass in our characterNFT metadata so we can a cool card in our UI
 */
const SelectCharacter = ({ characterList, setCharacterNFT, setLocation }) => {
  // State
  // TODO: Add Attack, HP, and MaxHP to Contract
  // characterNFT['hp'] = 10
  // characterNFT['maxHp'] = 20

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
  
  // const beginYourJourney = (characterNFT) => {
  //   console.log(characterNFT);
  //   setLocation("ExploreWasteland")
  //   setCharacterNFT(characterNFT)
  // }

  return (
    <div className="arena-container">
      <h2>Select Your Character</h2>
      {/* Character NFT */}
      {characterList.map((characterNFT, i) => (
        <div key={i}>
          <CharacterCard characterNFT={characterNFT}/>
        </div>
    ))}
    </div>
  );
};

export default SelectCharacter;
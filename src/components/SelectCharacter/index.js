import React from 'react';
import { MAX_VALUE } from '../../constants';
import './SelectCharacter.css';
// import LoadingIndicator from '../LoadingIndicator';

/*
 * We pass in our characterNFT metadata so we can a cool card in our UI
 */
const SelectCharacter = ({ characterList, setCharacterNFT }) => {
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

  return (
    <div className="arena-container">
      {/* Character NFT */}
      {characterList.map((characterNFT, i) => (
        <div key={i} className="players-container">
        <div className="player-container">
          <h2>Your Character</h2>
          <div className="player">
            <div className="image-content">
              <h2>{characterNFT.name}</h2>
              <img
                // src={characterNFT.imageURI}
                src="https://pa1.narvii.com/6233/df1f29949b34437fbafd41f3d3b11b4952215955_hq.gif"
                alt={`Character ${characterNFT.name}`}
              />
              <div className="health-bar">
                {/* <progress value={characterNFT.hp} max={characterNFT.maxHp} /> */}
                <progress value={10} max={20} />
                {/* <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p> */}
                <p>{`${10} / ${20} HP`}</p>
              </div>
            </div>
            <div className="stats">
              <h4>{`💪 Strength: ${characterNFT.strength}/${MAX_VALUE}`}</h4>
              <h4>{`🙌 Dexterity: ${characterNFT.dexterity}/${MAX_VALUE}`}</h4>
              <h4>{`❤️ Constitution: ${characterNFT.constitution}/${MAX_VALUE}`}</h4>
              <h4>{`🧠 Intelligence: ${characterNFT.intelligence}/${MAX_VALUE}`}</h4>
              <h4>{`💭 Wisdom: ${characterNFT.wisdom}/${MAX_VALUE}`}</h4>
              <h4>{`✨ Charisma: ${characterNFT.charisma}/${MAX_VALUE}`}</h4>
              {characterNFT.skills.map((characterSkill, i) => (
                <h5 key={i}>{`🎾 Skill ${i}: ${characterSkill}`}</h5>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
    </div>
  );
};

export default SelectCharacter;
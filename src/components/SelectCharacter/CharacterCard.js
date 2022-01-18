import React from 'react'
import { MAX_VALUE } from '../../constants';
import './SelectCharacter.css';

const CharacterCard = ({characterNFT}) => {
    return (
      <div >
        <div className="players-container">
          <div className="player-container">
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
              <button
              className="cta-button connect-wallet-button"
              // onClick={() => beginYourJourney(characterNFT)}
            >
              Begin Your Journey
            </button>
            </div>
          </div>
        </div>        
      </div>
    )
}

export default CharacterCard

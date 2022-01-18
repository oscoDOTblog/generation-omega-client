// React Imports
import React from 'react'

// External Imports
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

// Internal Imports
import { MAX_VALUE } from '../../constants';
import './SelectCharacter.css';

const statRatiotoMax = (baseValue, maxValue) => {
  const statRatio = baseValue/maxValue * 100
  return statRatio
}

const CharacterCard = ({characterNFT}) => {
    return (
      <div >
        <div className="players-container">
          <div className="player">
            <div className="image-content">
              <h2>{characterNFT.name}</h2>
              <img
                // src={characterNFT.imageURI}
                src="https://i.pinimg.com/736x/17/87/54/1787542aeb3e3bee51a4057eca4de97e.jpg"
                alt={`Character ${characterNFT.name}`}
              />
              <div className="health-bar">
                {/* <progress value={characterNFT.hp} max={characterNFT.maxHp} /> */}
                <progress value={10} max={20} />
                {/* <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p> */}
                <p>{`HP: ${10} / ${20}`}</p>
              </div>
            </div>
            <div className="stats">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <h5>{`💪 Strength: ${characterNFT.strength}/${MAX_VALUE}`}</h5>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.strength, MAX_VALUE)} />
                <h5>{`🙌 Dexterity: ${characterNFT.dexterity}/${MAX_VALUE}`}</h5>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.dexterity, MAX_VALUE)} />
                <h5>{`❤️ Constitution: ${characterNFT.constitution}/${MAX_VALUE}`}</h5>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.constitution, MAX_VALUE)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h5>{`🧠 Intelligence: ${characterNFT.intelligence}/${MAX_VALUE}`}</h5>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.intelligence, MAX_VALUE)} />
                <h5>{`💭 Wisdom: ${characterNFT.wisdom}/${MAX_VALUE}`}</h5>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.wisdom, MAX_VALUE)} />
                <h5>{`✨ Charisma: ${characterNFT.charisma}/${MAX_VALUE}`}</h5>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.charisma, MAX_VALUE)} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <h4><i>Skills</i></h4>
              {characterNFT.skills.map((characterSkill, i) => (
                <h5 key={i}>{`🎾 ${characterSkill}`}</h5>
              ))}
            </Grid>
            <Grid item xs={12} sm={6}>
            <h4><i>Inventory</i></h4>
              {/* {characterNFT.skills.map((characterSkill, i) => ( */}
                <h5>{`[Empty]`}</h5>
               {/* ))} */}
            </Grid>
            </Grid>

            </div>
          </div>
        </div>
      </div>
    )
}

export default CharacterCard

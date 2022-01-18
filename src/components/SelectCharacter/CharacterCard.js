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
            <Grid container spacing={3}>
              <Grid item >
                <h4>{`💪 Strength: ${characterNFT.strength}/${MAX_VALUE}`}</h4>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.strength, MAX_VALUE)} />
                <h4>{`🙌 Dexterity: ${characterNFT.dexterity}/${MAX_VALUE}`}</h4>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.dexterity, MAX_VALUE)} />
                <h4>{`❤️ Constitution: ${characterNFT.constitution}/${MAX_VALUE}`}</h4>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.constitution, MAX_VALUE)} />
              </Grid>
              <Grid item>
                <h4>{`🧠 Intelligence: ${characterNFT.intelligence}/${MAX_VALUE}`}</h4>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.intelligence, MAX_VALUE)} />
                <h4>{`💭 Wisdom: ${characterNFT.wisdom}/${MAX_VALUE}`}</h4>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.wisdom, MAX_VALUE)} />
                <h4>{`✨ Charisma: ${characterNFT.charisma}/${MAX_VALUE}`}</h4>
                <LinearProgress variant="determinate" value={statRatiotoMax(characterNFT.charisma, MAX_VALUE)} />
              </Grid>
            </Grid>
            <Grid item >
              {characterNFT.skills.map((characterSkill, i) => (
                <h5 key={i}>{`🎾 Skill ${i}: ${characterSkill}`}</h5>
              ))}
            </Grid>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CharacterCard

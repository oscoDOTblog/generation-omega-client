import { Buffer } from 'buffer';
const CONTRACT_ADDRESS = '0xDfE5348ABB45c4899bA08Ab846bC01cb41D0E132';
const MAX_VALUE = '7';

const transformCharacterData = (characterDataRaw) => {
    const characterBase64 = characterDataRaw.split(',')[1]
    const characterJSON = JSON.parse(Buffer.from(characterBase64,'base64').toString())
    const characterAttributes = characterJSON.attributes
    // console.log(characterAttributes) // DEBUG
    const characterData = {
      strength : characterJSON.attributes[0]["value"],
      dexterity: characterJSON.attributes[1]["value"],
      constitution: characterJSON.attributes[2]["value"],
      intelligence: characterJSON.attributes[3]["value"],
      wisdom: characterJSON.attributes[4]["value"],
      charisma: characterJSON.attributes[5]["value"],
      skills: [
        characterJSON.attributes[6]["value"],
        characterJSON.attributes[7]["value"],
        characterJSON.attributes[8]["value"],
      ]
    }
    // return {
    //   name: characterData.name,
    //   imageURI: characterData.imageURI,
    //   hp: characterData.hp.toNumber(),
    //   maxHp: characterData.maxHp.toNumber(),
    //   attackDamage: characterData.attackDamage.toNumber(),
    // };
    return characterData
  };
  
  export { CONTRACT_ADDRESS, MAX_VALUE, transformCharacterData };
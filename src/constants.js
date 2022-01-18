import { Buffer } from 'buffer';
const CONTRACT_ADDRESS = '0x6262A21f71E291Ff1e318062904e638ef75C7F62';
const MAX_VALUE = '7';

const transformCharacterData = (characterDataRaw) => {
    const characterBase64 = characterDataRaw.split(',')[1]
    const characterJSON = JSON.parse(Buffer.from(characterBase64,'base64').toString())
    const characterAttributes = characterJSON.attributes
    const characterData = {
      name: characterJSON["name"] , 
      strength : characterAttributes[0]["value"],
      dexterity: characterAttributes[1]["value"],
      constitution: characterAttributes[2]["value"],
      intelligence: characterAttributes[3]["value"],
      wisdom: characterAttributes[4]["value"],
      charisma: characterAttributes[5]["value"],
      skills: [
        characterAttributes[6]["value"],
        characterAttributes[7]["value"],
        characterAttributes[8]["value"],
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
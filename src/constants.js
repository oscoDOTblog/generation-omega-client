import { Buffer } from 'buffer';
const CONTRACT_ADDRESS = '0xDfE5348ABB45c4899bA08Ab846bC01cb41D0E132';

const transformCharacterData = (characterDataRaw) => {
    const characterBase64 = characterDataRaw.split(',')[1]
    const characterJSON = JSON.parse(Buffer.from(characterBase64,'base64').toString())
    const characterAttributes = characterJSON.attributes
    console.log(characterAttributes)
    // return {
    //   name: characterData.name,
    //   imageURI: characterData.imageURI,
    //   hp: characterData.hp.toNumber(),
    //   maxHp: characterData.maxHp.toNumber(),
    //   attackDamage: characterData.attackDamage.toNumber(),
    // };
    return {
      // const characterJSON = JSON.parse(Buffer.from(characterBase64,'base64').toString())
      // console.log(characterJSON.attributes)
      // for (let i = 0; i < characterJSON.attributes.length; i++) {
      //   let traitType = characterJSON.attributes[i]["trait_type"]
      //   let traitValue = characterJSON.attributes[i]["value"]
      //   let maxValue = characterJSON.attributes[i]["max_value"]
      //   if (maxValue) {
      //     console.log(traitType + ": " + traitValue + "/" + maxValue)
      //   } else {
      //     console.log(traitType + ": " + traitValue)
      //   }
      // }
      strength : characterJSON.attributes[0]["value"],
      dexterity: characterJSON.attributes[1]["value"],
      constitution: characterJSON.attributes[2]["value"],
      intelligence: characterJSON.attributes[3]["value"],
      wisdom: characterJSON.attributes[4]["value"],
      charisma: characterJSON.attributes[5]["value"],
      // skill1: characterJSON.attributes[6]["value"],
      // skill2: characterJSON.attributes[7]["value"],
      // skill3: characterJSON.attributes[8]["value"],
    }
  };
  
  export { CONTRACT_ADDRESS, transformCharacterData };
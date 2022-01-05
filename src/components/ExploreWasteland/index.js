import React, { useEffect, useState } from 'react';
import './ExploreWasteland.css';


const ExploreWasteland = ({characterNFT}) => {
  const [stageNumber, setStageNumber] = useState(1);

  /*
  * Get Current Stage Number
  */
  useEffect(() => {
    // const { ethereum } = window;

    // if (ethereum) {
    //   const provider = new ethers.providers.Web3Provider(ethereum);
    //   const signer = provider.getSigner();
    //   const gameContract = new ethers.Contract(
    //     CONTRACT_ADDRESS,
    //     generationOmega,
    //     signer
    //   );

    //   setGameContract(gameContract);
    // } else {
    //   console.log('Ethereum object not found');
    // }
  }, []);

  /*
  * Render Stage Based on Number in NFT Attribute
  */
  const renderStage = () => {
    /*
    * Stage #1: TODO
    */
    if (stageNumber === 1) {
      return (
        <div className="select-character-container">
          <h2>Stage 1</h2>
          <h3>{'Welcome to the Wasteland, ' + characterNFT.name}</h3>
        </div>
      );
    /*
    * Stage #2: TODO
    */
    } else if (stageNumber === 2) {
      return (
        <div>
          Stage 2
        </div>
      );
    }
  }

  return (
    <div>
       {renderStage() }
    </div>
  )
}

export default ExploreWasteland

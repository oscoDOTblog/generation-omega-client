import React, { useEffect, useState } from 'react';

const Wasteland = () => {
  const [stageNumber, setStageNumber] = useState(null);

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
        <div>
          Stage 1
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

export default Wasteland

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './ExploreWasteland.css';


const ExploreWasteland = ({characterNFT}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [stageNumber, setStageNumber] = useState(1);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setStageNumber(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const renderStageSelect = () => {

    return (
      <div>
        <br/>
        <Button variant="contained" color="primary" onClick={handleClickListItem}>
          Select Stage
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={e => handleMenuItemClick(e, 1)}>Stage 1</MenuItem>
          <MenuItem onClick={e => handleMenuItemClick(e, 2)}>Stage 2</MenuItem>
          <MenuItem onClick={e => handleMenuItemClick(e, 3)}>Stage 3</MenuItem>
        </Menu>
      </div>
    )
  }

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
        <div className="select-character-container">
          <h2>Stage 1</h2>
          <h3>{'Welcome to the Wasteland, ' + characterNFT.name}</h3>
        </div>
      );
    } else if (stageNumber === 3) {
      return (
        <div className="select-character-container">
          <h2>Stage 1</h2>
          <h3>{'Welcome to the Wasteland, ' + characterNFT.name}</h3>
        </div>
      );
    }
  }

  return (
    <div>
      { renderStageSelect() }
      {renderStage() }
    </div>
  )
}

export default ExploreWasteland

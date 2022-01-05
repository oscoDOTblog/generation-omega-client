import React from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core';

import useStyles from './styles';

const Navbar = ({ setLocation }) => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit" onClick={() => setLocation("MintCharacter")}>Mint Character</Button>
        <Button color="inherit" onClick={() => setLocation("SelectCharacter")}>Select Character</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar
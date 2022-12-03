import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Grid } from '@mui/material';

// Stores
import sessionStore from 'stores/sessionStore';

// Components
import GameContent from './GameContent';

// Styles
import classes from './Game.module.scss';

const Game: FC = () => {
  const { sessionId } = sessionStore;

  return (
    <div className={classes.Container}>
      <h1>Game {sessionId}</h1>
      <Grid
        container
        flexDirection="column"
        height="100%"
        justifyContent="flex-start"
        alignItems="center"
        textAlign="center"
        flexWrap="nowrap"
      >
        <GameContent />
      </Grid>
    </div>
  );
};

export default observer(Game);

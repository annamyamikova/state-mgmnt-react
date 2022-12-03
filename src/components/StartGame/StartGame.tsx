import React, { useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';

// Contexts
import SocketContext from 'contexts/SocketContext';

// Types
import { SocketEmitEvent } from 'types/socket';

// Styles
import classes from './StartGame.module.scss';

const StartGame = () => {
  const { socket } = useContext(SocketContext);

  const handleStart = useCallback(() => {
    if (!socket) {
      return;
    }

    socket.emit(SocketEmitEvent.moderator_startGame, {
      data: { isStarted: true },
    });
  }, [socket]);

  return (
    <span className={classes.Wrapper}>
      <p>Участники</p>
      <div className={classes.Participants} />
      <Button variant="contained" color="primary" onClick={handleStart}>
        Начать
      </Button>
    </span>
  );
};

export default observer(StartGame);

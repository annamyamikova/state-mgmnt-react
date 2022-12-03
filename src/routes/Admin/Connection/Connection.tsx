import React, { ChangeEvent, FC, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Grid, Input } from '@mui/material';

// Hooks
import { useSocket } from 'hooks/useSocket';

// Stores
import sessionStore from 'stores/sessionStore';
import authStore from 'stores/authStore';

// Styles
import classes from './Connection.module.scss';

const Connection: FC = () => {
  const [sessionInput, setSessionInput] = useState<string>(
    localStorage.getItem('sessionId') || ''
  );

  const { accessToken } = authStore;
  const { gameId } = sessionStore;

  const socket = useSocket();
  const navigate = useNavigate();

  const onSessionInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSessionInput(event.target.value);
    },
    []
  );

  const handleNext = useCallback(() => {
    const sessionId = sessionInput.trim();

    sessionStore.setSessionId(sessionId);

    socket.connect({
      ...(sessionId ? { sessionId } : null),
      ...(gameId ? { gameId } : null),
      token: accessToken as string,
    });

    navigate(`/`, {
      replace: true,
    });
  }, [sessionInput]);

  return (
    <Grid
      container
      flexDirection="column"
      height="100%"
      justifyContent="center"
      alignItems="center"
      padding="10px"
      className={classes.Wrapper}
    >
      <h1>Quiz App</h1>
      <div className={classes.Container}>
        <p>Введите ключ сессии для подключения</p>
        <Input fullWidth value={sessionInput} onChange={onSessionInputChange} />
        {/* TODO: check for an existing session Id */}
        <Button
          variant="contained"
          disabled={!sessionInput}
          onClick={handleNext}
        >
          Подключиться к сеансу
        </Button>
      </div>
    </Grid>
  );
};

export default Connection;

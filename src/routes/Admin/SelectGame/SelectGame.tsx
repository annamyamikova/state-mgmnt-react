import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';

import { Autocomplete, Button, TextField } from '@mui/material';

// API
import gameApi from 'api/game';

// Components
import Loading from 'components/Loading';

// Stores
import sessionStore from 'stores/sessionStore';

// Types
import { IGame } from 'types/game';

// Styles
import classes from './SelectGame.module.scss';

const SelectGame = () => {
  const [selectedGameId, setSelectedGameId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    setLoading(true);

    gameApi.list().then(({ data }) => {
      setGames(data);
      setLoading(false);
    });
  }, []);

  const startGame = useCallback(() => {
    if (!selectedGameId) {
      return;
    }

    sessionStore.setGameId(selectedGameId);
  }, [selectedGameId]);

  const onChange = useCallback(
    (event: ChangeEvent<unknown>, value: IGame | null) => {
      setSelectedGameId(value?.id || '');
    },
    []
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.Wrapper}>
      <h2>Начало игры</h2>
      <div className={classes.ContentContainer}>
        <p>Выберите игру для начала</p>
        <Autocomplete
          disablePortal
          options={games}
          getOptionLabel={(game) => game.title}
          onChange={onChange}
          sx={{ width: 300 }}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Введите игру"
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
      </div>
      <Button
        variant="contained"
        size="large"
        disabled={!selectedGameId}
        onClick={startGame}
        className={classes.Button}
      >
        Начать
      </Button>
    </div>
  );
};

export default observer(SelectGame);

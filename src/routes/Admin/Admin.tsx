import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Grid, Button } from '@mui/material';

// Styles
import classes from './Admin.module.scss';

const Admin: FC = () => {
  const navigate = useNavigate();

  const onNewGamePress = useCallback(() => navigate('new-game'), []);

  const onGameConnection = useCallback(() => navigate('connection'), []);

  return (
    <div className={classes.Wrapper}>
      <Grid
        className={classes.Container}
        container
        direction="column"
        justifyContent="center"
        textAlign="center"
        gap="20px"
        height="100%"
      >
        <h2>Начало игры</h2>
        <Button variant="contained" onClick={onNewGamePress}>
          Создание новой игры
        </Button>
        <Button variant="contained" onClick={onGameConnection}>
          Подключиться к сеансу
        </Button>
      </Grid>
    </div>
  );
};

export default observer(Admin);

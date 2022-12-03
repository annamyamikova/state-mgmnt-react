import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

// Components
import StartGame from 'components/StartGame';

// Stores
import sessionStore from 'stores/sessionStore';

const GameContent: FC = () => {
  const { isStarted } = sessionStore;

  if (!isStarted) {
    return <StartGame />;
  }

  return <div />;
};

export default observer(GameContent);

import React, { FC } from 'react';
import { Navigate, Route, Routes as CRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// Components
import Loading from 'components/Loading';

// Layouts
import PlayerLayout from 'layouts/PlayerLayout';

// Routes
import Login from 'routes/Login';
import Admin from 'routes/Admin';
import Connection from 'routes/Admin/Connection';
import SelectGame from 'routes/Admin/SelectGame';

// Stores
import authStore from 'stores/authStore';
import ModeratorGameLayout from '../layouts/ModeratorGameLayout/ModeratorGameLayout';

const Routes: FC = () => {
  const { isLogin, isChecking } = authStore;

  if (isChecking) {
    return <Loading />;
  }

  return (
    <CRoutes>
      {isLogin ? (
        <Route path="/" element={<ModeratorGameLayout />}>
          <Route index element={<Admin />} />
          <Route path="connection" element={<Connection />} />
          <Route path="new-game" element={<SelectGame />} />
        </Route>
      ) : (
        <Route path="/" element={<PlayerLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
        </Route>
      )}
    </CRoutes>
  );
};

export default observer(Routes);

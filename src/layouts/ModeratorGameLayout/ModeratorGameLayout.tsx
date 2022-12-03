import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { Modal, Box, Button } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// Contexts
import SocketContext from 'contexts/SocketContext';

// Hooks
import { useRealtime } from 'hooks/useRealtime';
import { useSocket } from 'hooks/useSocket';

// Stores
import authStore from 'stores/authStore';
import sessionStore from 'stores/sessionStore';

// Styles
import classes from './ModeratorGameLayout.module.scss';

const ModeratorGameLayout: FC = () => {
  const { setSocket } = useContext(SocketContext);

  const [isModalOpen, setModalOpen] = useState(false);

  const socket = useSocket();
  const navigate = useNavigate();
  useRealtime(socket);

  const { accessToken } = authStore;
  const { sessionId, gameId } = sessionStore;

  useEffect(() => {
    setSocket(socket);
  }, [socket]);

  useEffect(() => {
    socket.connect({
      ...(sessionId ? { sessionId } : null),
      ...(gameId ? { gameId } : null),
      token: accessToken as string,
    });
  }, []);

  const handleOpen = useCallback(() => setModalOpen(true), []);
  const handleClose = useCallback(() => setModalOpen(false), []);

  const handleLogout = useCallback(() => {
    authStore.logout();

    navigate('/login', {
      replace: true,
    });

    socket.disconnect();
    handleClose();
  }, [socket]);

  return (
    <span className={classes.Wrapper}>
      <div className={classes.Container}>
        <div className={classes.LogoutGame} onClick={handleOpen}>
          <LogoutIcon />
        </div>
        <div className={clsx(classes.ParticipantsCount)}>
          <PersonIcon />
          <p>{0}</p>
        </div>
        <Outlet />
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.Modal}>
            <div className={classes.Buttons}>
              <Button onClick={handleLogout}>Выйти из профиля</Button>
            </div>
          </Box>
        </Modal>
      </div>
      <Box className={classes.Landscape}>
        <p>Приложение не поддерживает альбомную ориентацию</p>
      </Box>
    </span>
  );
};

export default observer(ModeratorGameLayout);

import React, { FC, useCallback, useContext, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { Box, Button, Modal, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// Contexts
import SocketContext from 'contexts/SocketContext';

// Stores
import sessionStore from 'stores/sessionStore';

// Styles
import classes from './PlayerLayout.module.scss';

const PlayerLayout: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleOpen = useCallback(() => setModalOpen(true), []);
  const handleClose = useCallback(() => setModalOpen(false), []);
  const handleClear = useCallback(() => {
    sessionStore.clearGame();

    socket.disconnect();
    handleClose();

    navigate('/player', {
      replace: true,
    });
  }, [socket]);

  return (
    <span className={classes.Wrapper}>
      <div className={classes.Container}>
        <div className={classes.LogoutGame} onClick={handleOpen}>
          <LogoutIcon />
        </div>
        <div className={clsx(classes.ParticipantsCount)}>
          <PersonIcon />
          {0}
        </div>
        <Outlet />
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.TextModal}>
            <Typography variant="h6" component="h2">
              Вы уверены, что хотите выйти из этой сессии?
            </Typography>
            <div className={classes.Buttons}>
              <Button onClick={handleClear}>Да</Button>
              <Button onClick={handleClose}>Нет</Button>
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

export default observer(PlayerLayout);

import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import { createTheme, ThemeProvider } from '@mui/material';
import * as locales from '@mui/material/locale';

// Contexts
import SocketContext from 'contexts/SocketContext';

// Routes
import Routes from 'routes';

// Stores
import authStore from 'stores/authStore';

// Types
import { SocketCtx } from 'types/socket';

const App: FC = () => {
  const [socket, setSocket] = useState<SocketCtx | null>(null);

  const { i18n } = useTranslation();

  const [locale, setLocale] = useState<keyof typeof locales>(
    i18n.language as keyof typeof locales
  );

  useEffect(() => {
    authStore.checkAuth();

    const onLanguageChanged = (cLocale: keyof typeof locales) => {
      setLocale(cLocale);
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, []);

  const theme = useMemo(() => createTheme({}, locales[locale]), [locale]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket, setSocket }}>
      <ThemeProvider theme={theme}>
        <Helmet titleTemplate="%s - Quiz app" defaultTitle="Quiz app" />
        <Routes />
      </ThemeProvider>
    </SocketContext.Provider>
  );
};

export default App;

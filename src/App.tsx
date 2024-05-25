import React, { useState } from 'react';
import './App.css';
import Answering from './scenes/Answering/answer.tsx';
import Writing from './scenes/Writing/write.tsx';
import { CardProvider } from './services/CardContext/card.tsx';
import { StatsProvider } from './services/StatsContext/stats.tsx';
import { SceneTypes } from './Types.tsx';
import NavBar from './components/navBar.tsx';
import Selector from './components/selector.tsx';
import 'semantic-ui-css/semantic.min.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';

const App: React.FC = () => {
  const [showScene, setShowScene] = useState(SceneTypes.answering);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CardProvider>
        <StatsProvider>
          <NavBar showScene={showScene} setShowScene={setShowScene} />
          <Selector />
          {showScene === SceneTypes.answering && <Answering />}
          {showScene === SceneTypes.writing && <Writing />}
          <footer
            style={{
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              textAlign: 'center',
              padding: '10px 0',
            }}
          >
            @FlashMind, Botezatu Marius, 2024
          </footer>
          <IconButton
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={toggleMode}
            color="inherit"
          >
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </StatsProvider>
      </CardProvider>
    </ThemeProvider>
  );
};

export default App;

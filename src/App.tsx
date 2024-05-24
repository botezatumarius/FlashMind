import React, { useState } from 'react';
import './App.css';
import Answering from './scenes/Answering/answer';
import Writing from './scenes/Writing/write';
import { CardProvider } from './services/CardContext/card';
import { StatsProvider } from './services/StatsContext/stats';
import { SceneTypes } from './Types';
import NavBar from './components/navBar';
import Selector from './components/selector';
import 'semantic-ui-css/semantic.min.css'

const App: React.FC = () => {
  const [showScene, setShowScene] = useState(SceneTypes.answering);
  
  return (
    <CardProvider>
      <StatsProvider>
        <NavBar showScene={showScene} setShowScene={setShowScene} />
        <Selector/>
        {showScene === SceneTypes.answering && <Answering />}
        {showScene === SceneTypes.writing && <Writing/>}
        <footer style={{ position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          backgroundColor: '#f8f9fa',
          color: '#343a40',
          textAlign: 'center',
          padding: '10px 0'}}>
          @FlashMind, Botezatu Marius, 2024
        </footer>
      </StatsProvider>
    </CardProvider>
  );
};

export default App;

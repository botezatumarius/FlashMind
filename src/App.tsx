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
        </StatsProvider>
      </CardProvider>
    )};

export default App;
import React from 'react';
import './App.css';
import Answering from './scenes/Answering/answer';
import { CardProvider } from './services/CardContext/card';
import { StatsProvider } from './services/StatsContext/stats';
import 'semantic-ui-css/semantic.min.css'

const App: React.FC = () => 
    <CardProvider>
      <StatsProvider>
        <Answering />
      </StatsProvider>
    </CardProvider>

export default App;
import React from 'react';
import './App.css';
import Answering from './scenes/Answering/answer';
import { CardProvider } from './services/CardContext/card';

const App: React.FC = () => 
    <CardProvider>
      <Answering />
    </CardProvider>;

export default App;

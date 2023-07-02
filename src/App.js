import { useState } from 'react';
import styled from 'styled-components';
import Create from './pages/Create';
import Game from './pages/Game';

const MainContainer = styled.main`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem 0;
`;

function App() {
  const [gameOptions, setGameOptions] = useState({ started: false, players: [], lives: null, order: '' });

  return (
    <MainContainer>
      {!gameOptions.started ? (
        <Create setGameOptions={setGameOptions} />
        ): (
        <Game gameOptions={gameOptions} setGameOptions={setGameOptions} />
      )}
    </MainContainer>
  );
}

export default App;

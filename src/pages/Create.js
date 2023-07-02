import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PlayerCount from '../components/creation/PlayerCount';
import NameInputs from '../components/creation/NameInputs';
import LiveInput from '../components/creation/LiveInput';
import StartButtons from '../components/creation/StartButtons';
import PropTypes from 'prop-types';

const CreateContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

export default function Create({ setGameOptions }) {
  const [playerNames, setPlayerNames] = useState(['', '', '', '']);
  const [lifeCount, setLifeCount] = useState(2);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('dartPlayers'));
    if (storedPlayers) {
      setPlayerNames(storedPlayers);
    }
  }, []);

  const handleStartGame = (ordering = 'random') => {
    const nameEntries = Object.entries(playerNames);
    const missingNames = nameEntries.filter(item => !item[1]);
    console.log('Missing: ', missingNames);
    if (missingNames.length > 0) setErrorMessage('Missing names');
    else {
      localStorage.setItem('dartPlayers', JSON.stringify(playerNames)); 
      setGameOptions({ started: true, players: playerNames, lives: lifeCount, order: ordering });
    }
  }

  return (
    <CreateContainer>
      <PlayerCount playerNames={playerNames} setPlayerNames={setPlayerNames} />
      <NameInputs playerNames={playerNames} setPlayerNames={setPlayerNames} />
      {errorMessage && <span>{errorMessage}</span>}
      <LiveInput setLifeCount={setLifeCount} />
      <StartButtons handleStartGame={handleStartGame} />
    </CreateContainer>
  )
}

Create.propTypes = {
  setGameOptions: PropTypes.func.isRequired,
}
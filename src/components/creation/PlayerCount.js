import React from 'react'
import styled from 'styled-components';
import { ButtonWrapper, SectionHeader, ToggleButton } from '../styles/style';
import PropTypes from 'prop-types';

const CountContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export default function PlayerCount({ playerNames, setPlayerNames }) {

  const handleClick = (value) => {
    const nameCpy = [...playerNames];
    if (value === 5) nameCpy.push('');
    else if (value === 4) nameCpy.pop();
    setPlayerNames(nameCpy);
  }

  return (
    <CountContainer>
      <SectionHeader>No. of players</SectionHeader>
      <ButtonWrapper>
        <ToggleButton type="button" onClick={() => handleClick(4)} selected={playerNames.length === 4} disabled={playerNames.length === 4}>4</ToggleButton>
        <ToggleButton type="button" onClick={() => handleClick(5)} selected={playerNames.length === 5} disabled={playerNames.length === 5}>5</ToggleButton>
      </ButtonWrapper>
    </CountContainer>
  )
}

PlayerCount.propTypes = {
  playerNames: PropTypes.array.isRequired,
  setPlayerNames: PropTypes.func.isRequired,
}

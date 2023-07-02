import React from 'react'
import styled from 'styled-components';
import { SectionHeader } from '../styles/style';
import PropTypes from 'prop-types';

const CountContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  border: none;
  font-size: 16px;
  font-weight: 600;
  padding: 1rem 2rem;
  background-color: ${({ selected }) => !selected && 'rgba(240, 240, 240, 0.5)'};
  outline: ${({ selected }) => selected && '2px solid #fff'};
  cursor: ${({ selected }) => selected ? 'default' : 'pointer'};
  box-shadow: ${({ selected }) => selected && '0px 32px 100px 0px #fff'};
  &:active {
    transform: ${({ selected }) => !selected && 'scale(0.96)' };
  }
  &:disabled {
    background-color: ${({ selected }) => selected && 'rgba(240, 240, 240, 1)'};
    color: #000;
  }
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

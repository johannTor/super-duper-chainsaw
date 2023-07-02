import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const NameInput = styled.input`
  border: none;
  padding: 0.4rem 0.4rem;
  font-size: 18px;
  font-weight: 500;

  &:focus {
    outline:none
  }
`;

export default function NameInputs({ playerNames, setPlayerNames }) {
  const handleNameChange = (index, name) => {
    const modifiedNames = [...playerNames];
    modifiedNames[index] = name;
    setPlayerNames(modifiedNames);
  }
  // Maybe map over playerNames instead now its an array
  return (
    <InputContainer>
      {playerNames.map((item, index) => <NameInput key={`name-${index}`} type="text" value={playerNames[index]} placeholder={`Player ${index + 1}`} maxLength={20} onChange={(ev) => handleNameChange(index, ev.target.value)} />)}
    </InputContainer>
  )
}

NameInputs.propTypes = {
  playerNames: PropTypes.array.isRequired,
  setPlayerNames: PropTypes.func.isRequired,
}

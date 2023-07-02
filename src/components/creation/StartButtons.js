import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SectionContainer, SectionHeader } from '../styles/style';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StartButton = styled.button`
  border: none;
  padding: 1rem 1rem;
  font-weight: 600;
  font-size: 18px;

  &:active {
    transform: scale(0.96);
  }
`;

export default function StartButtons({ handleStartGame }) {
  return (
    <SectionContainer>
      <SectionHeader>Start</SectionHeader>
      <ButtonContainer>
        <StartButton type="button" onClick={() => handleStartGame('Random')}>Random</StartButton>
        <StartButton type="button" onClick={() => handleStartGame('Sequential')}>Sequential</StartButton>
      </ButtonContainer>
    </SectionContainer>
  )
}

StartButtons.propTypes = {
  handleStartGame: PropTypes.func.isRequired,
}

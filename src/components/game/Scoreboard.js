import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SectionHeader } from '../styles/style';
import { squareColors } from '../styles/colors';

const ScoreboardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PlayerWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const PlayerText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

const ScoreText = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${({ $textColor }) => $textColor};
`;

const squareColorTwoLives = {
  1: squareColors.red,
  2: squareColors.green,
};

const squareColorThreeLives = {
  1: squareColors.red,
  2: squareColors.yellow,
  3: squareColors.green,
};

export default function Scoreboard({ playerScores, totalLives }) {
  return (
    <ScoreboardContainer>
      <SectionHeader style={{ color: '#fff' }}>Overview</SectionHeader>
      {playerScores.map(({player, squares}, index) => (
        <PlayerWrapper key={player}>
          <PlayerText>{player}:</PlayerText>
          {squares.map(square => square.lives > 0 && <ScoreText key={square.square} $textColor={totalLives === 3 ? squareColorThreeLives[square.lives] : squareColorTwoLives[square.lives]}>{square.square}</ScoreText>) }
        </PlayerWrapper>
      ))}
    </ScoreboardContainer>
  )
}

Scoreboard.propTypes = {
  playerScores: PropTypes.array.isRequired,
  totalLives: PropTypes.number.isRequired,
}
import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { squareColors } from '../styles/colors';

const ScoreboardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const PlayerText = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  text-decoration: ${({ $dead }) => $dead && 'line-through'};
`;

const ScoresWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const ScoreText = styled.span`
  font-size: 32px;
  font-weight: 600;
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

  const isAlive = (squares) => {
    if (squares.find(item => item.lives > 0)) {
      return true;
    }
    return false;
  }

  return (
    <ScoreboardContainer>
      {playerScores.map(({player, squares}, index) => (
        <PlayerWrapper key={player}>
          <PlayerText $dead={!isAlive(squares)} >{player}</PlayerText>
          <ScoresWrapper>
            {squares.map(square => square.lives > 0 && <ScoreText key={square.square} $textColor={totalLives === 3 ? squareColorThreeLives[square.lives] : squareColorTwoLives[square.lives]}>{square.square}</ScoreText>) }
          </ScoresWrapper>
        </PlayerWrapper>
      ))}
    </ScoreboardContainer>
  )
}

Scoreboard.propTypes = {
  playerScores: PropTypes.array.isRequired,
  totalLives: PropTypes.number.isRequired,
}
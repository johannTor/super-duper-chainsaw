import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { squareColors } from '../styles/colors';

const SquareContainer = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${({ $squareColor }) => $squareColor};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ $dead }) => $dead ? 'default' : 'pointer'};
`;

const SquareText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

const squareColorTwoLives = {
  0: 'rgba(95, 108, 121)',
  1: squareColors.red,
  2: squareColors.green,
};

const squareColorThreeLives = {
  0: 'rgba(95, 108, 121)',
  1: squareColors.red,
  2: squareColors.yellow,
  3: squareColors.green,
};

export default function LifeSquare({ square, lives, totalLives, handleClick }) {

  return (
    <SquareContainer $squareColor={totalLives === 3 ? squareColorThreeLives[lives] : squareColorTwoLives[lives]} onClick={() => lives > 0 && handleClick(square)} $dead={lives === 0}>
      <SquareText>
        {square}
      </SquareText>
    </SquareContainer>
  )
}

LifeSquare.propTypes = {
  square: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
  totalLives: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

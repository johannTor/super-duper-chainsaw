import React from 'react'
import { SectionContainer } from '../styles/style'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LifeSquare from './LifeSquare';

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GroupHeader = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #fff;
`;

const SquareContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function GroupView({ gameSquares, totalLives, handleSquareClick }) {
  return (
    <SectionContainer>
      {gameSquares.map(item => (
        <GroupContainer key={item.player}>
          <GroupHeader>{item.player}</GroupHeader>
          <SquareContainer>
            {item.squares.map(square => (
              <LifeSquare key={`square-${square.square}`} square={square.square} lives={square.lives} totalLives={totalLives} handleClick={handleSquareClick} />
            ))}
          </SquareContainer>
        </GroupContainer>
      ))}
    </SectionContainer>
  )
}


GroupView.propTypes = {
  gameSquares: PropTypes.array.isRequired,
  totalLives: PropTypes.number.isRequired,
  handleSquareClick: PropTypes.func.isRequired,
}

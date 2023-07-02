import React from 'react'
import { SectionContainer } from '../styles/style'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LifeSquare from './LifeSquare';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

export default function LifeGrid({ gameSquares, totalLives, handleSquareClick }) {
  const combinedSquares = gameSquares.map(playerSquare => [...playerSquare.squares]).flat();
  const sorted = combinedSquares.sort((a, b) => a.square - b.square);
  return (
    <SectionContainer>
      <GridContainer>
        {sorted.map((square, index) => <LifeSquare key={`square-${square.square}`} square={square.square} lives={square.lives} totalLives={totalLives} handleClick={handleSquareClick} /> )}
      </GridContainer>
    </SectionContainer>
  )
}

LifeGrid.propTypes = {
  gameSquares: PropTypes.array.isRequired,
  totalLives: PropTypes.number.isRequired,
  handleSquareClick: PropTypes.func.isRequired,
}

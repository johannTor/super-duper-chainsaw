import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { ButtonWrapper, SectionContainer, ToggleButton, GeneralButton, WinnerModal, ModalHeading } from '../components/styles/style';
import GameView from '../components/game/GridView';
import { initScores, pushWithMaxLength } from '../utils/helpers';
import GroupView from '../components/game/GroupView';
import { useDetermineWinner } from '../hooks/useDetermineWinner';

export default function Game({ gameOptions, setGameOptions }) {
  const { players, lives, order } = gameOptions;
  const [squareHistory, setSquareHistory] = useState([]); // State that should contain moves which could be fell back on via undo
  const [playerSquares, setPlayerSquares] = useState([]); // [{ player: string, squares: number[{ square: number, lives: number }] }]
  const [viewMode, setViewMode] = useState('grid');
  const modalRef = useRef();

  useEffect(() => {
    const newPlayerSquares = initScores(order, players, lives);
    setPlayerSquares(newPlayerSquares);
  }, [order, players, lives]);

  const { winner } = useDetermineWinner(playerSquares);

  useEffect(() => {
    if(winner) {
      modalRef.current.showModal();
    }
  }, [winner]);

  const handleSquareClick = (value) => {
    let foundSquare = null;
    let foundIndex = undefined;
    let squareIndex = undefined
    for(let i = 0; i < playerSquares.length; i++) {
      squareIndex = playerSquares[i].squares.findIndex((item) => item.square === value);
      if (squareIndex !== -1) {
        foundSquare = playerSquares[i].squares[squareIndex];
        foundIndex = i;
        break;
      } 
    }
    if (!foundSquare) return undefined;
    const squareHistoryClone = structuredClone(squareHistory);
    pushWithMaxLength(squareHistoryClone, playerSquares);
    // Adding the cloned square state to the history array
    setSquareHistory(squareHistoryClone);

    // Cloning the foundSquare to decrease the life
    const cpySquare = structuredClone(foundSquare);
    cpySquare.lives -= 1;
    // Cloning the square array assigned to the found player & assigning the updated square to it
    const newSqrs = [...playerSquares[foundIndex].squares];
    newSqrs[squareIndex] = cpySquare;
    // Cloning the entire playerSquares array & assigning the updated Squares array to the found player
    const newPlayas = structuredClone(playerSquares);
    newPlayas[foundIndex].squares = newSqrs;
    setPlayerSquares(newPlayas);
  }

  const handleUndo = () => {
    if (squareHistory.length <= 0) return;
    const squareHistoryClone = structuredClone(squareHistory);
    const lastMove = squareHistoryClone.pop();
    setSquareHistory(squareHistoryClone);
    setPlayerSquares(lastMove);
  }

  const handleRestart = () => {
    modalRef.current.close();
    setGameOptions({ started: false, players: [], lives: null, order: '' });
  }

  return (
    <SectionContainer>
      <ButtonWrapper>
        <ToggleButton type="button" onClick={() => setViewMode('grid')} selected={viewMode === 'grid'}>Grid</ToggleButton>
        <ToggleButton type="button" onClick={() => setViewMode('groups')} selected={viewMode === 'groups'}>Groups</ToggleButton>
      </ButtonWrapper>
      {viewMode === 'grid' ? (
        <GameView gameSquares={playerSquares} totalLives={lives} handleSquareClick={handleSquareClick} />
      ) : (
        <GroupView gameSquares={playerSquares} totalLives={lives} handleSquareClick={handleSquareClick} />
      )}
      <GeneralButton disabled={squareHistory.length === 0} onClick={handleUndo}>Undo</GeneralButton>
      <WinnerModal ref={modalRef}>
        <ModalHeading>GG {winner}</ModalHeading>
        <GeneralButton style={{ display: 'block', margin: '0 auto', backgroundColor: 'rgb(150, 150, 150)', color: '#fff' }} onClick={handleRestart}>Restart</GeneralButton>
      </WinnerModal>
    </SectionContainer>
  )
}

Game.propTypes = {
  gameOptions: PropTypes.shape({
    started: PropTypes.bool,
    players: PropTypes.array,
    lives: PropTypes.number,
    order: PropTypes.string,
  }).isRequired,
  setGameOptions: PropTypes.func.isRequired,
}

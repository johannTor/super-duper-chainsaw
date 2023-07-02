import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { SectionContainer, SectionHeader } from '../components/styles/style';
import LifeGrid from '../components/game/LifeGrid';
import Scoreboard from '../components/game/Scoreboard';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export default function Game({ gameOptions, setGameOptions }) {
  const { players, lives, order } = gameOptions;
  // const [gameSquares, setGameSquares] = useState([]); // [{ square: number, lives: number }]
  const [playerSquares, setPlayerSquares] = useState([]); // [{ player: string, squares: number[] }]

  useEffect(() => {
    const initScores = (order, players, lives) => {
      const fields = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];
      const fieldsPerPlayer = fields.length / players.length;

      const playerScores = players.map((name, index) => {
        let playerSquares = []
        if (order === 'Sequential') {
          playerSquares = fields.slice(index * fieldsPerPlayer, (index * fieldsPerPlayer) + fieldsPerPlayer).map(item => ({ square: item, lives: lives}));
        } else if (order === 'Random') {
          for (let i = 0; i < fieldsPerPlayer; i++) {
            playerSquares.push({square: fields.splice(getRandomInt(0, fields.length), 1)[0], lives: lives});
          }
        }
        return {
          player: name,
          squares: playerSquares,
        }
      });
      return playerScores;
    };
    const newPlayerSquares = initScores(order, players, lives);
    console.log('Scores: ', newPlayerSquares);
    setPlayerSquares(newPlayerSquares);
  }, [order, players, lives]);

  useEffect(() => {
    const findWinner = (playerSquares) => {
      // ToDo: filter array for players with squares that have lives remaining
      // - set gameOptions started to false, init everything, popup the winner name
    };
    findWinner(playerSquares)
  }, [playerSquares]);

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

  return (
    <SectionContainer>
      <SectionHeader>View: Normal</SectionHeader>
      <LifeGrid gameSquares={playerSquares} totalLives={lives} handleSquareClick={handleSquareClick} />
      <Scoreboard playerScores={playerSquares} totalLives={lives} />
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

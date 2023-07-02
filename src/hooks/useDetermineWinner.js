import { useState, useEffect } from 'react';

export const useDetermineWinner = (playerSquares) => {
  const [winner, setWinner] = useState('');
  
  useEffect(() => {
    const remainingPlayers = playerSquares.filter(item => item.squares.find(square => square.lives > 0)).map(item => item.player);
    if (remainingPlayers.length === 1) setWinner(remainingPlayers[0]);
  }, [playerSquares]);

  return {
    winner,
  }
}
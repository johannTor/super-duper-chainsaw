export const initGameSquares = (lives) => {
  return [...Array(20).fill().map((item, index) => ({ square: index + 1, lives }))]
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export const initScores = (order, players, lives) => {
  const fields = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const fieldsPerPlayer = fields.length / players.length;

  const playerScores = players.map((name, index) => {
    let playerSquares = []
    switch (order) {
      case 'Sequential':
        playerSquares = fields.slice(index * fieldsPerPlayer, (index * fieldsPerPlayer) + fieldsPerPlayer).map(item => ({ square: item, lives: lives}));
        break;
      case 'Random':
        for (let i = 0; i < fieldsPerPlayer; i++) {
          playerSquares.push({square: fields.splice(getRandomInt(0, fields.length), 1)[0], lives: lives});
        }
        break;
      default: 
        break;
    }
    return {
      player: name,
      squares: playerSquares,
    }
  });
  return playerScores;
};

// Max of 6 steps can be undone
export const pushWithMaxLength = (array, newElement) => {
  array.push(newElement);
  if (array.length > 6) {
    array.splice(0, 1);
  }
}
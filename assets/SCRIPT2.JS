const boardContainer = document.querySelector('.board');

const Gameboard = () => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const update = () => {
    const cells = boardContainer.children;

    for (let i = 0; i < board.length; i += 1) {
      cells[i].innerText = `${board[i]}`;
    }
  };

  const create = () => {
    for (let i = 0; i < board.length; i += 1) {
      const boardCell = document.createElement('p');
      boardCell.className = 'board-cell';
      boardCell.dataset.index = i;
      boardContainer.appendChild(boardCell);
    }
    update();
  };

  const placeToken = (target, token) => {
    board[target] = token;
    update();
  };

 const checkWinner = () => {
    const isX = (symbol) => symbol === 'X';
    const isO = (symbol) => symbol === 'O';
    let winner = 0;

    const horizontalSlots = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)];
    const verticalSlots = [
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
    ];
    const diagonalSlots = [[board[0], board[4], board[8]], [board[2], board[4], board[6]]];

    const horizontal = () => {
      horizontalSlots.forEach((slice) => {
        if (slice.every(isX) || slice.every(isO)) {
          if (slice[0] === 'X') {
            winner = 1;
          } else {
            winner = -1;
          }
        }
      });
    };

    const vertical = () => {
      verticalSlots.forEach((slice) => {
        if (slice.every(isX) || slice.every(isO)) {
          if (slice[0] === 'X') {
            winner = 1;
          } else {
            winner = -1;
          }
        }
      });
    };

    const diagonal = () => {
      diagonalSlots.forEach((slice) => {
        if (slice.every(isX) || slice.every(isO)) {
          if (slice[0] === 'X') {
            winner = 1;
          } else {
            winner = -1;
          }
        }
      });
    };

    horizontal();
    vertical();
    diagonal();

    return winner;
  }; 

  return {
    board, boardContainer, placeToken, create, checkWinner, update,
  };
};

const player = (symbol, name) => {
  const playerSymbol = symbol;
  const playerName = name;
  return {
    playerSymbol,
    playerName,
  };
};

const Game = (gameboard) => {
  let roundNumber = 0;
  const player1 = player('X', '');
  const player2 = player('O', '');
  player1.playerName = prompt('Player 1, please enter your name:');
  player2.playerName = prompt('Player 2, please enter your name:');
  const players = [player1, player2];

  const updateArea = document.querySelector('.update-area');
  updateArea.innerHTML = '';
  const update = document.createElement('p');
  update.innerText = `${players[roundNumber % 2].playerName}, make your selection.`;
  updateArea.appendChild(update);

  function reset() {
    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset';
    updateArea.appendChild(resetButton);

    resetButton.addEventListener('click', () => {
      Game(Gameboard(), player);
    });
  }

  gameboard.create();
  gameboard.boardContainer.addEventListener('click', function clickEvent(event) {
    const tokenToPlace = players[roundNumber % 2].playerSymbol;

    if (gameboard.board[event.target.dataset.index] === '') {
      roundNumber += 1;
      gameboard.placeToken(event.target.dataset.index, tokenToPlace);
      update.innerText = `${players[roundNumber % 2].playerName}, make your selection.`;
      updateArea.appendChild(update);
      const winner = gameboard.checkWinner();
      if (winner === 1) {
        gameboard.boardContainer.removeEventListener('click', clickEvent);
        updateArea.innerHTML = '';
        const winnerUpdate = document.createElement('p');
        winnerUpdate.innerText = `${players[0].playerName} Wins!`;
        updateArea.appendChild(winnerUpdate);
        reset();
      } else if (winner === -1) {
        gameboard.boardContainer.removeEventListener('click', clickEvent);
        updateArea.innerHTML = '';
        const winnerUpdate = document.createElement('p');
        winnerUpdate.innerText = `${players[1].playerName} Wins!`;
        updateArea.appendChild(winnerUpdate);
        reset();
      } else if (winner === 0 && roundNumber === 9) {
        gameboard.boardContainer.removeEventListener('click', clickEvent);
        updateArea.innerHTML = '';
        const winnerUpdate = document.createElement('p');
        winnerUpdate.innerText = 'Draw!';
        updateArea.appendChild(winnerUpdate);
        reset();
      }
    } else {
      update.innerText = `Whoops. Sorry ${players[roundNumber % 2].playerName}. That slot is taken. Try again.`;
      updateArea.appendChild(update);
    }
  });

  return { gameboard, player };
};

Game(Gameboard(), player);
function Player (name,symbol) {
    return { name, symbol };
  }


const Gameboard = (() => {
    let board = ["X", "X", "O", "X", "O", "O", "O", "X", "O"];

    const getBoard = () => board;

    const makeMove = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
            return true; // Move successful
        }
        return false; // Move unsuccessful
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
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

  
    return {getBoard,makeMove,resetBoard,checkWinner};
})();

const Game = (() => {

  let currentPlayer;
  let playerX = Player("PlayerX", "X");
  let playerO = Player("PlayerO", "O");
  let _round=0;
  let Display_Winner=document.querySelector(".winner")
  let Display_player_turn=document.querySelector(".player_turn")
  const handleCellClick = (index) => {
    if (_round<9&&Gameboard.checkWinner()!=1&&Gameboard.checkWinner()!=-1 ){
      currentPlayer=_round%2==0?playerX:playerO;

      
      if (Gameboard.makeMove(index, currentPlayer.symbol)) {
        updateBoardDisplay();
        _round++;
        if(currentPlayer==playerX){
          Display_player_turn.textContent="PlayerO's turn"
        }
        else{
          Display_player_turn.textContent="PlayerX's turn"
        }
        console.log(_round)
        if(Gameboard.checkWinner()!=0){
          console.log("game over!")
          if(Gameboard.checkWinner()==1){
            Display_Winner.textContent="PlayerX wins!"
            Display_Winner.style.color = "#C44536";
          }
          else if(Gameboard.checkWinner()==-1){
            Display_Winner.textContent="PlayerO wins!"
            Display_Winner.style.color = "#197278";
          }
        }
        else if (_round==9&&Gameboard.checkWinner()==0){
          Display_Winner.textContent="DRAW !"
          Display_Winner.style.color = "#283D3B";
        }
        
      }
    }
};

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });
  const updateBoardDisplay = () => {
    cells.forEach((cell, index) => {
      let cellValue = Gameboard.getBoard()[index];
      cell.textContent = cellValue;
      if (cellValue === "X") {
          cell.style.color = "#C44536";
      } else {
          cell.style.color = "#197278";
      }
    });
  };

  const NewGame= (()=>{
    Gameboard.resetBoard()
    updateBoardDisplay()
    _round=0
    Display_Winner.textContent="May the Best Palyer Win ^^";
    Display_Winner.style.color = "black";
    Display_player_turn.textContent="PlayerX's turn"

  })
  document.querySelector(".new_game").addEventListener('click',()=>NewGame())
  return {updateBoardDisplay ,NewGame};

})();

Gameboard.resetBoard()
Game.updateBoardDisplay()
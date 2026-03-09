import { useState, useEffect } from "react"
import Player from "./Player"
import GameBoard from "./GameBoard"
import Log from "./Log"
import { winningCombinations } from "./winning-combinations"
import GameOver from "./GameOver"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  const activePlayer = gameTurns.length>0 && gameTurns[0].player === 'X' ? 'O' : 'X'
  return activePlayer;
}

function checkWinner(board) {
  const players = ['X', 'O'];
  for (const player of players) {
    const hasWon = winningCombinations.some(combination =>
      combination.every(([row, col]) => board[row][col] === player)
    );

    if (hasWon) {
      return player;
    }
  }
  return null; // No winner yet
}


function App() {
  const [gameTurns, setgameTurns] = useState([])
  const [reset, setReset] = useState(false)
  const [playerWinner, setPlayerWinner] = useState({'X': 'Player 1', 'O': 'Player2'})
  let winner = null;
  let activePlayer = 'X';
  let isDraw = false
  activePlayer = derivedActivePlayer(gameTurns)

  if (gameTurns.length > 0) {
      const { square: { rowIndex, colIndex }, player } = gameTurns[0];
      initialGameBoard[rowIndex][colIndex] = player;
      const symbolWinner = checkWinner(initialGameBoard);
      winner = symbolWinner ? playerWinner[symbolWinner] : null;
      isDraw = initialGameBoard.every(row => row.every(cell => cell !== null));
  }

  function handleSelectSquare (rowIndex, colIndex) {
    setgameTurns( prevTurns => {
      activePlayer = derivedActivePlayer(prevTurns)
      const updatedTurns = [{square: {rowIndex, colIndex}, player: activePlayer}, ...prevTurns]
      return updatedTurns;
    })
  }

  if(reset) {
    activePlayer = winner;
    setReset(prevvalue=>!prevvalue);
    setgameTurns([]);
    initialGameBoard.forEach((row, rIdx) => row.forEach((_, cIdx) => initialGameBoard[rIdx][cIdx] = null));
  }

  function handlePlayerWinner(playerName, symbol) {
    setPlayerWinner((prevValue) => {
      return {
        ...prevValue,
        [symbol]: playerName, // dynamically update 'X' or 'O'
      };
    });
  }

  return (    
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={'Player 1'} symbol={'X'} isActive={activePlayer==='X'} setPlayerWinner={handlePlayerWinner}/>
          <Player initialName={'Player 2'} symbol={'O'} isActive={activePlayer==='O'} setPlayerWinner={handlePlayerWinner}/>
        </ol>
        { (winner || isDraw )&& <GameOver winner={winner} setReset={setReset}/>}
        <GameBoard gameboard={initialGameBoard} onSelectSquare={handleSelectSquare}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App

import { useState, useEffect, useMemo } from "react";
import Player from "./Player";
import GameBoard from "./GameBoard";
import Log from "./Log";
import { winningCombinations } from "./winning-combinations";
import GameOver from "./GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_PLAYER_DATA = { X: 'Player 1', O: 'Player 2' }

function derivedActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
}

function checkWinner(board) {
  const players = ['X', 'O'];
  for (const player of players) {
    const hasWon = winningCombinations.some(combination =>
      combination.every(([row, col]) => board[row][col] === player)
    );
    if (hasWon) return player;
  }
  return null;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [reset, setReset] = useState(false);
  const [playerWinner, setPlayerWinner] = useState(INITIAL_PLAYER_DATA);

  // Derived game board from turns
  const gameBoard = useMemo(() => {
    const board = INITIAL_GAME_BOARD.map(row => [...row]);
    for (const turn of gameTurns) {
      const { rowIndex, colIndex } = turn.square;
      board[rowIndex][colIndex] = turn.player;
    }
    return board;
  }, [gameTurns]);

  const activePlayer = useMemo(() => derivedActivePlayer(gameTurns), [gameTurns]);

  const symbolWinner = useMemo(() => checkWinner(gameBoard), [gameBoard]);
  const winner = symbolWinner ? playerWinner[symbolWinner] : null;

  const isDraw = useMemo(() => gameBoard.every(row => row.every(cell => cell !== null)), [gameBoard]);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      return [{ square: { rowIndex, colIndex }, player: currentPlayer }, ...prevTurns];
    });
  }

  function handlePlayerWinner(playerName, symbol) {
    setPlayerWinner(prev => ({
      ...prev,
      [symbol]: playerName,
    }));
  }

  useEffect(() => {
    if (reset) {
      setGameTurns([]);
      setReset(false);
    }
  }, [reset]);

  // useEffect(() => {
  //   console.log('Updated playerWinner:', playerWinner);
  // }, [playerWinner]);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={INITIAL_PLAYER_DATA.X} symbol={'X'} isActive={activePlayer === 'X'} setPlayerWinner={handlePlayerWinner} />
          <Player initialName={INITIAL_PLAYER_DATA.O} symbol={'O'} isActive={activePlayer === 'O'} setPlayerWinner={handlePlayerWinner} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} setReset={setReset} />}
        <GameBoard gameboard={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
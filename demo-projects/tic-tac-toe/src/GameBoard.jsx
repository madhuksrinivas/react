export default function GameBoard({onSelectSquare, gameboard}) {
    return (
        <ol id="game-board">
                {gameboard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => (
                                <li key={colIndex}>
                                    <button onClick={()=>onSelectSquare(rowIndex, colIndex)} disabled={ playerSymbol!==null}>
                                        {playerSymbol}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
        </ol>
    );
}

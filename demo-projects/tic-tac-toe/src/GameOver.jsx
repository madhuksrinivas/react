export default function GameOver({winner, setReset}) {
  return (
    <div id="game-over">
        GameOver
        {
            winner ? <p>{winner} won</p> : <p>Game Draw!</p>
        }
        <p>
            <button onClick={()=>setReset(true)}>Rematch!</button>
        </p>
    </div>
    
  )
}

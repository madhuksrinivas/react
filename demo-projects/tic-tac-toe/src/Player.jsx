import { useState } from "react"

export default function Player ({initialName, symbol, isActive, setPlayerWinner}) {

    const [isEditing, setIsEditing] = useState(false);
    const [playername, setPlayerName] = useState(initialName);

    function handleClick () {
        setIsEditing((prevValue)=>!prevValue)
        setPlayerWinner(playername, symbol)
    }

    function nameChange (event) {
        setPlayerName(event.target.value)
    }

    let playerName = isEditing ? 
    <input type="text" value={playername} onChange={nameChange} placeholder="Enter name" required /> 
    : <span className="player-name">{playername}</span>
    

    return (
        <>
        <li className={isActive? "active": undefined}>
            <span className="Player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing? 'Save' : 'Edit'}</button>
        </li>
        </>
    )
}
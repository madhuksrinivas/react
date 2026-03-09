import React from 'react'

function Hero({ heroname }) {
    if (heroname === 'Joker') {
        throw new Error("Not a hero")
    }
    return (
        <div>
            <p>{heroname}</p>
        </div>
    )
}

export default Hero

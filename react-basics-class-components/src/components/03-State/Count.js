import React, { useState } from 'react'

function Count() {

    // const [current state,fun to update the current state] = useState(arg)
    const [count, setCount] = useState(() => 0)
    const [theme, setTheme] = useState(() => 'blue')

    function decrementCount() {
        setCount(prevCount => prevCount - 1)
        setTheme('Red')
    }
    function incrementCount() {
        setCount(prevCount => prevCount + 1)
        setTheme('Green')
    }


    // const [state, setState] = useState({ count: 0, theme: 'blue' })
    // const count = state.count
    // const theme = state.theme

    // function decrementCount() {
    //     setState(prevState => {
    //         return { ...prevState, count: prevState.count - 1, theme: 'red' } // ...prevState -> all the objects inside useState
    //     })
    // }
    // function incrementCount() {
    //     setState(prevState => {
    //         return { ...prevState, count: prevState.count + 1, theme: 'green' }

    //     })
    // }



    return (
        <>
            <button onClick={decrementCount}>-</button>
            <span>{count}</span>
            <span>{theme}</span>
            <button onClick={incrementCount}>+</button>
        </>
    )
}

export default Count


// useState dont work inside conditionals
// passing a fun to useState(fun) will render everytime
// instead can use arrow fun useState(()=>4)
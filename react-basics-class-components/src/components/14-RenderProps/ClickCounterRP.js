import React, { Component } from 'react'

class ClickCounterRP extends Component {

    render() {
        console.log("Click");
        const { count, incrementCount } = this.props
        return <button onClick={incrementCount}>Clicked {count} times</button>
    }
}

export default ClickCounterRP

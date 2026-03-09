import React, { Component } from 'react'

class HoverCounterRP extends Component {

    render() {
        console.log("Hover");
        const { count, incrementCount } = this.props
        return <h2 onMouseOver={incrementCount}>Hovered {count} times</h2>
    }
}

export default HoverCounterRP

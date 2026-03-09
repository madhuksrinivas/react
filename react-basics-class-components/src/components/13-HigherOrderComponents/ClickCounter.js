import React, { Component } from 'react'
import withCouter from './WithCounter'

class ClickCounter extends Component {
    render() {
        const { name = "Mr. Click", count, incrementCount } = this.props
        return (
            <div>
                <button onClick={incrementCount}>{this.props.name} Clicked {count} times</button>
            </div>
        )
    }
}

export default withCouter(ClickCounter, 5)

import React, { Component } from 'react'
import ForwardRefInput from './ForwardRefInput'

class ForwardRefParentInput extends Component {
    constructor(props) {
        super(props)

        this.parentRef = React.createRef()
    }

    clickHandler = () => {
        this.parentRef.current.focus()
    }

    render() {
        return (
            <div>
                <ForwardRefInput ref={this.parentRef} />
                <button onClick={this.clickHandler}>Focus Input</button>
            </div>
        )
    }
}

export default ForwardRefParentInput

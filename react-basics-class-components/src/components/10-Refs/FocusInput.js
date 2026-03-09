import React, { Component } from 'react'
import Input from './Input'

class FocusInput extends Component {

    constructor(props) {
        super(props)
        this.parentRef = React.createRef()
        this.componentRef = React.createRef()
    }

    componentDidMount() {
        this.parentRef.current.focus()
    }

    clickHandler = () => {
        this.componentRef.current.focusInput()
    }

    render() {
        return (
            <div>
                <label>Parent text box: </label>
                <input type='text' ref={this.parentRef} />
                <Input ref={this.componentRef} />
                <br />
                <button onClick={this.clickHandler}>Focus child input</button>
            </div>
        )
    }
}

export default FocusInput

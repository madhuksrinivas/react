import React, { Component } from 'react'

class RefsDemo extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()

        this.cbref = null
        //get element from dom
        this.setCbRef = (element) => {
            this.cbref = element
        }
    }

    componentDidMount() {
        // on page load the input element is focused

        // this.inputRef.current.focus()
        // console.log(this.inputRef);

        if (this.cbref) {
            this.cbref.focus()
        }
    }

    clickHandler = () => {
        // alert(this.inputRef.current.value)
        alert(this.cbref.value)
    }

    render() {
        return (
            <div>
                <label>Enter ref text: </label>
                <input type='text' ref={this.inputRef} />
                <br />
                <label>Enter cbref text: </label>
                <input type='text' ref={this.setCbRef} />
                <br />
                <button onClick={this.clickHandler}>Click</button>
            </div>
        )
    }
}

export default RefsDemo

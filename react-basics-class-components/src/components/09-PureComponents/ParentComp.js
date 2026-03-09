import React, { Component } from 'react'
import RegularComp from './RegularComp'
import PureComp from './PureComp'
import MemoComp from './MemoComp'

class ParentComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "Madhu"
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                name: "Madhu"
            })
        }, 2000)
    }

    render() {
        console.log("----------------------------Parent Component render()-------------------------");
        return (
            <div>
                <h1>Parent Component</h1>
                <MemoComp name={this.state.name} />
                {/* <RegularComp name={this.state.name}></RegularComp>
                <PureComp name={this.state.name}></PureComp> */}
            </div>
        )
    }
}

export default ParentComp

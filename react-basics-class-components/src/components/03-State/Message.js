import React,{ Component } from "react";

class Message extends Component{
    constructor() {
        super()
        // initialize state
        this.state = {
            message: "Welcome Visitor" // initialize property
        }
    }

    changeMessage() {
        this.setState({
            message: 'Thank you for Subscribing'
        })
    }
    render() {
        return (
            <div>
                <h1 style={{color:"blue", fontFamily:"cursive"}}>{this.state.message}</h1>
                <button style={{color:"green"}} onClick = { () => this.changeMessage() }>Subscribe</button> 
            </div>
        )
    }
}

export default Message;
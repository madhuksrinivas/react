import React, { Component } from "react";

class Welcome extends Component{
    render() {
        return (
            <div>
                <h1>Class Component</h1>
                <h2>Welcome {this.props.name} {this.props.surname}</h2>
            </div>
        )
    }

} 

export default Welcome;
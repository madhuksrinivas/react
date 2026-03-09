import React, { Component } from "react";

class DestructClassComp extends Component{
    render() {
        const {name,surname} = this.props
        return (
            <div>
                <h1>Destructuring Class Component</h1>
                <h2>Welcome {name} {surname}</h2>
            </div>
        )
    }
} 

export default DestructClassComp;
// Conditional Rendering

import React, { Component } from 'react'

class ConditionalRendering extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         isLoggedIn: true
      }
    }
    

  render() {
    // 1st approach - using if-else
    // if (this.state.isLoggedIn) {
    //     return <div>Welcome Me</div>
    // } else {
    //     return <div>Welcome Guest</div>
    // }

    // 2nd approach - using var
    // let message
    // if (this.state.isLoggedIn) {
    //     message =  <div>Welcome Me</div>
    // } else {
    //     message =  <div>Welcome Guest</div>
    // }
    // return <div>{message}</div>

    // 3rd approach - using ternary operator
    // return this.state.isLoggedIn ? <div>Welcome Me</div> : <div>Welcome Guest</div>
    

    // 4th approach - short circuit operator
    return this.state.isLoggedIn && <div>Welcome Me</div>
  }
}

export default ConditionalRendering

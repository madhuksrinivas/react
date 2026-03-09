import React, { Component } from 'react'

// Binding Event Handlers
class EventBind extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         message:"Hello"
      }

    //   approch 3
    // (becoz binding happens once in constructor cmp to binding in render method)
    //   this.clickHandler = this.clickHandler.bind(this)
    }
    // clickHandler() {
    //     this.setState({
    //         message: "Good Bye!"
    //     })
    // }

    // final approach
    // use arrow fun as class property
    clickHandler = () => {
        this.setState ({
            message: "Good Bye!"
        })
    }



    render() {
        return (
          <div>
            <div>{this.state.message}</div>
            {/* approach 1 - binding in render method */}
            {/* not recommended for large application */}
            {/* <button onClick={this.clickHandler.bind(this)}>Click</button> */}

            {/* approach 2 - arrow fun */}
            {/* performance application issues in some scenarios */}
            {/* <button onClick={() => this.clickHandler()}>Click</button> */}

            {/* approach 3&4 - binding in class constructor */}
            {/* used as most, official react doc */}
            <button onClick={this.clickHandler}>Click</button>

          </div>
        )
      }
}

export default EventBind

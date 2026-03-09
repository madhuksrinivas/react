import React, { Component } from 'react'

class Counter extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         count:0
      }
    }

    increment() {
        // this.setState({
        //     count: this.state.count + 1
        // },
        // ()=>{
        //     console.log("call back value = ",this.state.count)
        // })

        this.setState( (previousState, props) => ({
          count: previousState.count + Number(props.addValue)
        }))
    }

    incrementFiveTimes() {
      for(let i=0;i<5;i++)
      {
        this.increment()
      }
    }

    render() {
        return (
          <div>
            <p>Count = {this.state.count}</p>
            {/* <button onClick={() => this.increment()}>Increment</button> */}
            <button onClick={() => this.incrementFiveTimes()}>Increment</button>
          </div>
        )
      }
}

export default Counter

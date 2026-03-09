import React, { Component } from 'react'
import ChildComponent from './ChildComponent'

// Method as props to child
class ParentComponet extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         parentName: "Parent"
      }

      this.greetParent = this.greetParent.bind(this)
    }

    greetParent(childName) {
        alert(`Hello ${this.state.parentName} from ${childName}`)
    }
    
  render() {
    return (
      <div>
        {/* passing parent method(as ref) as props to child component */}
        <ChildComponent greetHandler={this.greetParent}/>
      </div>
    )
  }
}

export default ParentComponet

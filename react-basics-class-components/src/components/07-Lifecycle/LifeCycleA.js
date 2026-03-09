import React, { Component } from 'react'
import LifeCycleB from './LifeCycleB';

class LifeCycleA extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "Jiraiya"
    }
    console.log("LCA-constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("LCA-getDerivedStateFromProps");
    return null
  }

  componentDidMount() {
    console.log("LCA-componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("LCA-shouldComponentUpdate");
    return true
  }

  getSnapshotBeforeUpdate() {
    console.log("LCA-getSnapshotBeforeUpdate");
    return null
  }

  componentDidUpdate() {
    console.log("LCA-componentDidUpdate");
  }

  changeState = () => {
    this.setState({
      name: "Jiraiya the gallant"
    })
  }

  render() {
    console.log("LCA-render");
    return (
      <div>
        <h1>LCA Methods</h1>
        <button onClick={this.changeState}>Change state</button>
        <LifeCycleB />
      </div>
    )
  }

}

export default LifeCycleA

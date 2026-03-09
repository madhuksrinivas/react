import React, { Component } from 'react'

class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            comments: 'type comments',
            topic: 'select'
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value // sets to updated value
        })
    }

    handleCommentsChange = (event) => {
        this.setState({
            comments: event.target.value
        })
    }
    handleTopicChange = (event) => {
        this.setState({
            topic: event.target.value
        })
    }
    handleSubmit = (event) => {
        alert(`Confirm Submit?`)
        event.preventDefault()
    }

    render() {
        const { username, comments, topic } = this.state
        return (
            <div>
                <h1>Form Component</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <label>Username to enter </label>
                            <input type='text' value={username} placeholder='user name' onChange={this.handleUsernameChange} />
                        </div>
                    </div>
                    <br />
                    <div>
                        <label>Comments to write </label>
                        <textarea value={comments} onChange={this.handleCommentsChange}></textarea>
                    </div>
                    <br />
                    <div>
                        <label>Topics to select </label>
                        <select value={topic} onChange={this.handleTopicChange}>
                            <option value="select">select</option>
                            <option value="react">React</option>
                            <option value="angular">Angular</option>
                            <option value="vue">Vue</option>
                        </select>
                    </div>
                    <br />
                    <div><button type='submit'>Submit</button></div>
                </form>
            </div>
        )
    }
}

export default Form

import React, { Component } from 'react'
import axios from 'axios'

// Post method
class PostForm extends Component {

    //create state property for the below 3 input fields in form and link them back to the input element
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            title: '',
            body: '',
            errorMsg: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitHandler = (e) => {
        e.preventDefault() // to avoid page refresh
        console.log(this.state);
        axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
            .then(response => { console.log(response); })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMsg: 'Error in retreiving data'
                })
            })
    }

    render() {
        // destructure to add i/p values and assign them to the value attribute of the input element
        const { userId, title, body, errorMsg } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type='text' name='userId' value={userId} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type='text' name='title' value={title} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type='text' name='body' value={body} onChange={this.changeHandler} />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
                {
                    errorMsg ? <div>{errorMsg}</div> : null
                }
            </div>
        )
    }
}

export default PostForm

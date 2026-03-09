import React, { Component } from 'react'
import axios from 'axios'

// GET request
class PostList extends Component {
    // create state property which will store list of posts
    constructor(props) {
        super(props)

        this.state = {
            posts: [], // empty array
            errorMsg: ''
        }
    }

    //use axios to make get request to the jasonplaceholder api endpoint
    // this method executes when the component mounts for the first time and is only executed once during component life time
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(respose => {
                console.log(respose);
                // assign the data array from object (from the log) to the state property and render it in jsx
                //set response data to the posts array
                this.setState({
                    posts: respose.data
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMsg: 'Error in retreiving data'
                })
            })
    }

    render() {
        const { posts, errorMsg } = this.state
        return (
            <div>
                List of Posts
                {
                    posts.length ? posts.map(post => <div key={post.id}>{post.title}</div>) : null
                }
                {
                    errorMsg ? <div>{errorMsg}</div> : null
                }
            </div>
        )
    }
}

export default PostList

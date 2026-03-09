import React, { Component } from 'react'
import { UserConsumer } from './UserContext'

class ComponentF extends Component {
    render() {
        return (
            // Step 3
            <UserConsumer>
                {
                    (username) => {
                        return <div>
                            <p>Got data from Component C. And the data is username = {username}</p>
                        </div>
                    }
                }
            </UserConsumer>
        )
    }
}

export default ComponentF

import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log("error", error);
        console.log('error info', errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <h1 style={{ color: "red" }}>Something went wrong...Try again later</h1>
        }
        else {
            return this.props.children
        }
    }
}

export default ErrorBoundary

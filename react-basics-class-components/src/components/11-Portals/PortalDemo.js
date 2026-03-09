import React from 'react'
import ReactDOM from 'react-dom'


function PortalDemo() {
    return ReactDOM.createPortal(
        <div>
            <h1>Portal Demo</h1>
        </div>
        , document.getElementById('portal-root') // get dom element id from index.html
    )
}

export default PortalDemo

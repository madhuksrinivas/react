import React from 'react'

function InlineCss() {
    const heading = {
        fontSize: '50px',
        color: 'orchid'
    }
  return ( 
    <div>
        <h1 style={heading}>Inline Css 1</h1>
      <h1 style={{fontSize: '50px', color: 'blue'}}>Inline Css 2</h1>
    </div>
  )
}

export default InlineCss

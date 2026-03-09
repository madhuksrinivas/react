import React from 'react'

// import css file
import './StyleSheetCss.css'

function StyleSheet(props) {
    let secondary = props.secondary ? 'secondary' : ''
  return (
    <div>
      <h1 className='primary'>Css Style Sheet 1</h1>
      <h1 className={`${secondary} fontSize`}>Css Style Sheet 2</h1>
    </div>
  )
}

export default StyleSheet

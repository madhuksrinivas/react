import React from 'react'

function MemoComp({ name }) {
    console.log("Rendering Memo Component");
    return (
        <div>
            <p>{name}</p>
        </div>
    )
}

// export as react.memo() / called as Higher order component
export default React.memo(MemoComp)

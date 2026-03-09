import React from 'react'

// functional component
const Greet = (props) => {
    return (
        <div>
            <h1>Functional Component</h1>
            <h2>Hello {props.name} {props.surname}</h2>
            {props.children}
        </div>
    )
}; 

// named export
// export const Greet = () => <h1>Hello World!</h1>;

//export fun comp
export default Greet; // default export
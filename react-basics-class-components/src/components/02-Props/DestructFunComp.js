import React from 'react'

// destructuring in fun parameter
// const DestructFunComp = ({name,surname}) => {
//     return (
//         <div>
//             <h1>Destructuring Functional Component props</h1>
//             <h2>Hello {name} {surname}</h2>
//         </div>
//     )
// }; 

// destructuring in fun body
const DestructFunComp = (props) => {
    const {name, surname} = props
    return (
        <div>
            <h1>Destructuring Functional Component props</h1>
            <h2>Hello {name} {surname}</h2>
        </div>
    )
};

// named export
// export const Greet = () => <h1>Hello World!</h1>;

//export fun comp
export default DestructFunComp; // default export
import React from 'react';

const Hello = (props) => {
    // With JSX
    return (
        <div id='hello-id' className='hello-class'>
            <h1>Hello Boy!</h1>
        </div>
    )
 
    // Without JSX
    // return React.createElement(
    //     'div',
    //     {id:'hello-id', className: 'hello-class'},
    //     React.createElement('h1', null, 'Hello Boy')
    // );

}
export default Hello;
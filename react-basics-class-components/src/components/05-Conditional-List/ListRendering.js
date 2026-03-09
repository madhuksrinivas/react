import React from 'react'
import Person from './Person'

function ListRendering() {
    // const eyes = ["Sharingan","Rinnengan","Byakugan"]
    // const eyeList = eyes.map(eye => <h2>{eye}</h2>)
    // console.log(eyeList)
    // return <div> <h1>Eye List</h1> {eyeList} </div>

    const persons = [
        {
            id: 1,
            name: 'Bruce',
            age: 30,
            skill: 'React'
        },
        {
            id: 2,
            name: 'Diana',
            age: 28,
            skill: 'Angular'
        },
        {
            id: 3,
            name: 'Clark',
            age: 25,
            skill: 'Vue'
        }
    ]

    // Each child in an array should have a unique "key" prop.
    // safely use the index as key:
    // The array is static and will never change.
    // The array is never filtered (display a subset of the array).
    // The array is never reordered.
    // The array is used as a stack or LIFO (last in, first out). 
    // In other words, adding can only be done at the end of the array (i.e push), and only the last item can ever be removed (i.e pop).
   
    // const personList = persons.map((person,index,personsListArray) => <Person key={index} person={person}/> )
    // can use index as shown above but not suitable always (or)

    // can use unique id as key by passing from parent to child element
    const personList = persons.map((person) => <Person key={person.id} person={person}/> )
    // will return <div> <div1>I am...</div1> <div2>I am....</div2> etc <div>
    return <div>{personList}</div>
}

export default ListRendering

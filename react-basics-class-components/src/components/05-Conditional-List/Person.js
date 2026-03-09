import React from 'react'

function Person({person}) {
  return (
    <div>
      {/* Each child in an array should have a unique "key" prop. */}
      <h2 key={person.key}>
        I am {person.name}. I am {person.age} years old.
      </h2>
    </div>
  )
}

export default Person

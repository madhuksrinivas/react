import React from "react";


// Step 1
// default value
const UserContext = React.createContext('CodeEvolution')

const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }
export default UserContext
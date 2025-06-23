import React, { createContext, useState } from 'react'
export const userDataContext=createContext()

const UserContext = ({children}) => {
    const [userData,setUserData]=useState({
        email:'',
        fullName:{
            firstname:'',
            lastname:''
        }
    })
  return (
    <div>
     <userDataContext.Provider value={{userData,setUserData}}>
         {children}
     </userDataContext.Provider>
    </div>
  )
}

export default UserContext
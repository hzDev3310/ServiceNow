"use client"
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

const useAdmin = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const currentUser = localStorage.getItem("currentAdmin");
      setCurrentUser(currentUser);
      console.log(currentUser)
    }, [currentUser]); 
  
    useEffect(()=>{
  
     currentUser && useRouter().push("/login")
    },[currentUser])
    return {useAdmin}
}

export default useAdmin

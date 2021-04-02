import React, { useContext, useEffect } from "react";
import { WrapperContext } from "../index"

export const Header = ({logout}) =>{
  const {user} = useContext(WrapperContext)

  useEffect(()=>{
      console.log("user::::",user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
     <React.Fragment>
         {user.role?(
             <nav>
                 <button onClick={logout}>Logout</button>
             </nav>
         ):(<></>)}
     </React.Fragment>
  )
}
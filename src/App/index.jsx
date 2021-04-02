import React,{useContext, useState} from "react";
import{Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";

import {Header} from "./Header";
import {Login} from "./Login";
import{AdminMovieList} from "./Movies/admin";
import {UserMovieList} from "./Movies/user";

export const WrapperContext = React.createContext({
  user:null,
  token:null,
  isLoggedIn : false, 
  logout : ()=>{}
})

const WrapperRoute = ({render,...restProps})=>{
    const { isLoggedIn,user}=useContext(WrapperContext);
    return(
        <Route
        {...restProps}
        render = {
            (props)=>{
                if(isLoggedIn){
                    if(user.role === 1){
                        return <Redirect to={`/admin/all-movies`} />
                    }else{
                        return <Redirect to={`/user/all-movies`}/>
                    }
                }else{
                    return render(props)
                }
            }
        }
        />
    )
}

const ProtectRoute = ({component: Component, ...restProps})=>{
  const { isLoggedIn,logout, user}=useContext(WrapperContext);
  return(
      <Route
      {...restProps}
      render = {
          (props)=>{
              if(!isLoggedIn){
                 return <Redirect to="/login"/>
              }else{
                  return (
                      <>
                          <Header logout = {logout} user={user}/>
                          <Component {...props} user={user}/>
                      </>
                  )
              }
          }
      }
      />
  )
}

export const App = () =>{
  const[user, setUser] = useState(null);
  const[token, setToken] = useState(null);
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () =>{
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("auth_token");
  }

  const handleLogin = (usr,token)=>{
    setUser(usr);
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("auth_token",token);
}

  return (
    <Router>
        <WrapperContext.Provider
        value={
            {
                user,
                token,
                isLoggedIn,
                logout,
            }
        }
        >
            <Switch>
                <Route exact path="/" render={()=><Redirect to="/login"/>}/>
                <WrapperRoute
                path = "/login"
                render={(props)=><Login {...props} handleLogin={handleLogin}/>}
                 />

                <ProtectRoute path = "/admin/all-movies" component={AdminMovieList} />
                <ProtectRoute path = "/user/all-movies" component={UserMovieList} />
            </Switch>
        </WrapperContext.Provider>
    </Router>
)
}
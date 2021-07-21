import React,{useState,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider'
import {Route,Redirect} from 'react-router-dom'

function PrivateRoute({component:Component,...rest}) {
    const{currentUser}=useContext(AuthContext);
    return (
        <div>
            {/* Syntax     render is callBack   *props contain history location match*/}
            <Route {...rest} render={props=>{
                return currentUser?<Component {...props}/>:<Redirect to='/login'/>
                // if(currentUser is not null render component else redirect to login)
            }}/>
        </div>
    )
}

export default PrivateRoute

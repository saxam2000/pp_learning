import React,{useState,useContext,useEffect} from 'react'
import {auth} from '../firebase'
export const AuthContext = React.createContext();

function AuthProvider({children}){//children will be all the components wrapped inside authprovide component
const[currentUser,setcurrentuser]=useState();
const[loading,setLoading]=useState(true);

function signup(email,password){
    return auth.createUserWithEmailAndPassword(email,password);
}

function login(email,password){
    
    return auth.signInWithEmailAndPassword(email,password);
}

function logout(){
    return auth.signOut();
}

useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(user=>{//listener provided by firebase to keep track of user in eficient way
        setcurrentuser(user);
        setLoading(false);
    })
    return()=>{
        unsubscribe();
    }
},[])//this empty bracket willl show that this useEffext will work as componentDidMount and retyrn functin will be called as componentWillUnmount

const value={
    currentUser,
    login,
    logout,
    signup
}
return (
    <>
    {/* <div> this is auth provider</div>
    <AuthContext.Provider value={value}>
        <p>firest render of children with out checking loading</p>
        {children}
    </AuthContext.Provider> */}
    <AuthContext.Provider value={value}>
        {!loading&&(children)}
        {/* when loading is false render children */}
        {/* {!loading?<>{children} <p>loading successful</p></>:<></>} */}
        
    </AuthContext.Provider>
</>)
}

export default AuthProvider
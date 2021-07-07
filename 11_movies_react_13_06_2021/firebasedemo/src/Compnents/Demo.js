import React, { useState, useEffect } from "react";
import firebase from "./firebase";

export default function Demo() {
  const auth = firebase.auth();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignin = async () => {
    try {
      setLoading(true);
      let res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res.user);
      setUser(res.user);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  };
  const handleSignup = async () => {
    try {
      setLoading(true);
      let res = await auth.createUserWithEmailAndPassword(email, password);
      console.log(res.user);
      setUser(res.user);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
};
const handleSignOut= async()=>{
    try{
        setLoading(true);
        let res= await auth.signOut()
        setUser(null);
        setLoading(false);
    }
    catch(e){
        setError(e.message);
        setTimeout(()=>{
            setError('')
        },2000)
        setLoading(false)
    }
}
  return (
    <> { loading?<h1>Please wait</h1>:user==null?
      <div>
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label htmlFor="Password">Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
              handleSignup()
            }}
            >
                
          Sign up
        </button>
        <button
          onClick={() => {
              handleSignin()
            }}
            >
                
          Sign in
        </button>
            <h1>{error}</h1>
      </div>
    : <>
    <h2>{user.uid} is Signed In </h2>
    <button onClick={()=>{
        handleSignOut()
    }} >Sign Out</button>
    </>}
    </>
  );
}

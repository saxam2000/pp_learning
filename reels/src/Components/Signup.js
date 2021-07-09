import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider'

function Signup() {
const[user,setUser]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');
    const authcontext=useContext(AuthContext);
    const {signup}=useContext(AuthContext);
    console.log(authcontext.currentUser);
    console.log(signup);

    async function handleSignUp (e){
        e.preventDefault();//form onsubmit rerenders the page to avoid that functionality preventdefault is used
        try{

            let res= await signup(email,password);
            let uid=res.user.uid;
            console.log(uid);
            console.log(res);
        }
        catch(e){
          console.log(e);
        }

    }


    return (
        <div>
            {/* <p>this is signup component</p> */}
            <form onSubmit={(e)=>{handleSignUp(e)}}>

            <div><label htmlFor="">UserName
                    <input type="text" value={user} onChange={(e)=>setUser(e.target.value)}></input>
                </label>
                </div>
            <div>
                <label htmlFor="">Email
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </label>
            </div>
            <div><label htmlFor="">Password
                    <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                </label>
                </div>
                <button disabled={loading} >signup</button>
            </form>
        </div>
    )
}

export default Signup

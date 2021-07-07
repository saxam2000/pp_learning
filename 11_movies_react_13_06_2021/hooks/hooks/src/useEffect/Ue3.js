import React,{useState,useEffect} from 'react'
import "./Ue3.css"

export default function Ue3() {
const[darkMode,setDarkMode]=useState(false);
const[count,setCount]=useState(0);
useEffect(()=>{
    console.log("useEffect");
    // document.title=`clicked ${count} times`;
    document.title=count;
},[count]);

    return (
        <>
        <div className={darkMode?"view darkMode":"view"}>
            <div className="form-group">
              <label htmlFor="darkMode"></label>
              <input type="checkbox"
                className="form-control" name="" id="" aria-describedby="helpId" checked={darkMode}onClick={()=>{setDarkMode(!darkMode)}}/>
              <small id="helpId" className="form-text text-muted">Dark Mode</small>
            </div>
            <div> you have clicked {count} times </div>
            <button  onClick={()=>setCount(count+1)}> Button</button>
            
        </div>
        </>
        
    )
}

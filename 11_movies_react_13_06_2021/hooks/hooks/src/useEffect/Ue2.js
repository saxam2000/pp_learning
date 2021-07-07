import React,{useState,useEffect} from 'react'

export default function Ue2() {
    const [count,setCount]=useState(0);
    useEffect(()=>{
console.log("useEffect");
document.title=`clicked ${count} times`
    } ,[])
    //second Variation
    //used in place of componentDidMount 
    ////optional dependency array is  used so it will be behaving like our second variation 
    // useEffect will run in the end of  first render only
    console.log("render");
    return (
        <div>
           <p>you clicked the button {count} times</p>
           <button onClick={()=>{
               setCount(count+1);
           }}> button </button>
        </div>
    )
}

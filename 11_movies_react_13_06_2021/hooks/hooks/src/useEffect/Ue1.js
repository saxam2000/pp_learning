import React,{useState,useEffect} from 'react'

export default function Ue1() {
    const [count,setCount]=useState(0);
    useEffect(()=>{
console.log("useEffect");
document.title=`clicked ${count} times`
    })
//fIRST Variation...
//this is used when we want to combine componentDidMount and componentDidUpdate
    //optional dependency array is not used so it will be behaving like our first variation 
    // useEffect will run in the end of  every render
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

import React from 'react'
import {useState,useEffect} from 'react'

function Uewc1() {
    const[count,setCount]=useState(0);
    console.log("render");
    useEffect(()=>{
        console.log("useEffect");
        document.title=count;
        return ()=>{
            alert(`i am called before next useEffect is called ${count}`)
        }
    } );
    return (
        <div>
        <p> {count}</p>
        < button onClick={()=>{setCount(count+1)}}>  Click</button>    
        </div>
    )
}

export default Uewc1

import React,{useState} from 'react'



export default function Us() {
const [msgObj,setMessage]=useState({message:'',id:1,})

const handleChange=(e)=>{
    let message=e.target.value;
    setMessage({...msgObj,message:message});
}
    return (
        <div>
            <input type="text" value={msgObj.message} onChange={(e)=>handleChange(e)}></input>
            <p>{msgObj.message}</p>
            
        </div>
    )
}

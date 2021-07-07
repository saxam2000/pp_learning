import React,{useContext,useState} from 'react'
import Context from './Context'
import Demo from './Demo'


function Main() {
    const[count,setCount]=useState(0);
    return (
        <div>
            <p> button pressed {count} times</p>
            <button onClick={()=>setCount(count+1)}>Button</button>
<Context.Provider value={count}>{/* wrapper class it subscribes all conponent inside its tag to context   whenever count will be changed all  component trees of component inside this tag willl render again    
to rende only specific child componets who have use value of count we can use react.memo function  
In this way the prop count is passed to all the component tree without manually passing in every step 
to use this count in any child component we jut have to import Context(whatever name you gave) from wherever its  made  and use useContext
*/ }
<Demo></Demo>
</Context.Provider>

        </div>
    )
}

export default Main

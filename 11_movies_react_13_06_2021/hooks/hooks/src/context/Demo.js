import Context from './Context';
import React,{useContext} from 'react'
import Demochild from './Demochild'
function Demo() {
    console.log("demo render");
    const val=useContext(Context);
    console.log(val);
    return (
        <div>
            <Demochild/>
        </div>
    )
}

export default Demo

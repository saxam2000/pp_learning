import React,{useContext} from 'react'
import Context from './Context'


function Demochild() {
    console.log('Demochild render');
    const val=useContext(Context);
    console.log(val);
    return (
        <div>
            <p>value for val is {val}</p>
        </div>
    )
}

export default Demochild

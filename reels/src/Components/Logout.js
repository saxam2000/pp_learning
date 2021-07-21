import React,{useContext} from 'react'
import{AuthContext}from '../Context/AuthProvider'

function Logout() {
    const {logout}=useContext(AuthContext);

    const handleLogout=async()=>{
        try{

            await logout();
        }
        catch(e){
            console.log(e.message);

        }
    }
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout

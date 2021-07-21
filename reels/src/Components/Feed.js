import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider';
import Header from './Header'
import {database}from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile';
import Button from '@material-ui/core/Button';




function Feed() {
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(null);
    const types=['video/mp4','video/webm','video/ogg']
    const [userData,setUserData] = useState(null);
    const {currentUser}=useContext(AuthContext);
    useEffect(()=>{
        const unsub=database.users.doc(currentUser.uid)
    .onSnapshot((doc) => {//Event Listener on database
        console.log("Current data: ", doc.data());
        setUserData(doc.data());
    });
    
    },[currentUser])

    
    return (
        <div>
            {userData==null?<CircularProgress />:<><Header userData={userData}/> 
            <div style={{height:'1.5vh'}}/>
            <div className='feed-container'>
            <div className='center'>
            {/* /<Button variant="outlined" color="secondary">
                Upload
            </Button> */}
                <UploadFile userData={userData}/>
            </div>
        </div>
            </>
            }

            <h1>Welcome to feed</h1>
        </div>
    )
}

export default Feed

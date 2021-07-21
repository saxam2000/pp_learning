import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";
import { useHistory } from "react-router-dom";

function Signup() {
    const[name,setName]=useState('');
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const authcontext = useContext(AuthContext);
  const { signup ,currentUser} = useContext(AuthContext);
  const history=useHistory();
//   console.log(authcontext.currentUser);
//   console.log(signup);

  async function handleSignUp(e) {
    e.preventDefault(); //form onsubmit rerenders the page to avoid that functionality preventdefault is used
    try {
      setLoading(true);
      let res = await signup(email, password);
      let uid = res.user.uid;
      console.log(uid);
      console.log(res);
      const uploadTaskListener= storage.ref(`/users/${uid}/profileImage`).put(file);
      // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        // fn 1 -> progress tracking
        // fn2 -> error
        // fn3 -> success
uploadTaskListener.on('state_changed',fn1,fn2,fn3);
function fn1(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
}
function fn2(error){
    setError(error);
    setTimeout(()=>{
        setError('')
    },2000);
    setLoading(false)

    
}
async function fn3(){
    let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
    console.log('File available at', downloadUrl);
    console.log(database.users) 
          await database.users.doc(uid).set({
                email:email,
                userId:uid,
                username:user,
                createdAt:database.getCurrentTimeStamp(),
                profileUrl:downloadUrl,
                postIds:[]
            })

}

setLoading(false);
console.log('User has Signed up');
history.push('/');

    //   setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
      setTimeout(()=>setError(''),2000);
      setLoading(false);
    }
  }
  const handleFileSubmit = (e) => {
      let file=e.target.files[0];
    console.log(file);
    if(file!=null)setFile(file);
  };
  useEffect(()=>{
    if(currentUser){
      history.push('/');
    }
  },[])

  return (
    <div>
      {/* <p>this is signup component</p> */}
      <form
        onSubmit={(e) => {
          handleSignUp(e);
        }}
      >
        <div>
          <label htmlFor="">
            UserName
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="">
            Password
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
        </div>

        <input type="file" accept="images/*" onChange={handleFileSubmit}></input>
        <button disabled={loading}>signup</button>
      </form>
    </div>
  );
}

export default Signup;

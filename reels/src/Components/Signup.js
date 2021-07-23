import React, { useState, useEffect, useContext } from "react";

import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useHistory } from "react-router-dom";
import Navbar from './Navbar'
import background from "./background.jpg";
import Buttons from "./Buttons";
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";

// import TextFields from './TextFields'
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
 
    heading:{
      position:"relative",
      top:"10vh"
      ,
      left:"10vw",
      fontSize:"8vh",
      color:"darkBlue",
      margin:"3px"

    },
    form: {
     
      margin: "5vh",
      position: "absolute",
      top: "50vh",
      
    },
    loginLink:{
      position:"relative",
      bottom:"-20vh",
      left:"11vw",
      color:"white",
      fontSize:"1.6rem"

    },
    loginButton:{
      color: "#c8bec6",
      fontSize:"1rem",
      fontStyle:"italic",
    },
    errorDisp:{
      position:"absolute",
      top:"22vh",
      left:"10vw"
  },
  },
);

function TextFields(props) {
  const classesText = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.changeVal(event.target.value);
    // console.log(props.Label," ===========",value);
  };

  return (
    <div>
      <TextField
        style={
          props.Label === "PassWord"
            ? { width: "41vw", background: "white" }
            : { width: "20vw", background: "white" }
        }
        id="outlined-multiline-flexible"
        label={props.Label}
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        variant="outlined"
        height="5vh"
      />
    </div>
  );
}

function Signup() {
  const classes = useStyles();
  const history=useHistory();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const authcontext = useContext(AuthContext);
  const { signup ,currentUser} = useContext(AuthContext);
  //   console.log(authcontext.currentUser);
    console.log(authcontext);
    const gotoLogin=()=>{
      history.push("./login")
    }

    async function handleSignUp(e) {
      e.preventDefault(); //form onsubmit rerenders the page to avoid that functionality preventdefault is used
      setLoading(true);
      if(name===""){
        setLoading(false);
        setError("Please enter Name.....");
        setTimeout(() => {
          setError("");
          
        }, 2000);
        return;
      }
      try {
        
        setLoading(true);
      
        if(file===""){
          setLoading(false);
          setError("Please Upload a Profile Picture");
          setTimeout(() => {
            setError("");
            
          }, 2000);
          return;
          
        }
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
    setLoading(false)
      setError(error);
      setTimeout(()=>{
          setError('')
      },2000);
  
      
  }
  async function fn3(){
      let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
      console.log('File available at', downloadUrl);
      console.log(database.users) 
            await database.users.doc(uid).set({
                  email:email,
                  userId:uid,
                  username:name,
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
        setLoading(false);
        setError(e.message);
        setTimeout(()=>setError(''),2000);
      }
    }
    const handleFileSubmit = (e) => {
        let file=e.target.files[0];
      console.log(file);
      if(file!=null)setFile(file);
      else if(file==null){
        setError("Please upload profile picture...");
        setLoading(false);
        setTimeout(()=>setError(''),2000);
      }
    };

    useEffect(()=>{
      if(currentUser){
        history.push('/');
      }
    },[])
  console.log("Name ===", name);
  console.log("Password ===", password);
  console.log("Email ===", email);
  // const[name,setName]=React.useState("Saksham");
  return (
<>
    {loading?<><CircularProgress className={classes.loader} color="secondary" /></>:

      <>
      <div className={classes.signupPage}><Navbar style={{width:"80vw"}}/>
    {error!==""?<Alert className={classes.errorDisp} severity="error">{error}</Alert>:<></>}
    <div style={{ backgroundImage: `url(${background}) `,backgroundSize: 'cover',
            overflow: 'hidden', width:"100vw",height:"96vh"}}>

            <h1 className={classes.heading}>SignUp</h1>

    
            <div
            className={classes.form}
            style={{ margin: "8px", position: "relative", top: "20vh", left: "10vw" ,width:"50vw"}}
            >
      <FormControl>
        {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
      
        <TextFields
          value={name}
          Label="Name"
          changeVal={setName}
          style={{ backgroundColor: "white", Color: "red" }}
          ></TextFields>
        
      </FormControl>

      <FormControl style={{ margin: "0px 8px 0px 8px" }}>
        {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}

       
        <TextFields required value={email} Label="Email" changeVal={setEmail}></TextFields>
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>

      <div>
        <FormControl
          style={{ margin: "20px 0px", width: "20vw", height: "100px" }}
        >
          {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}

          {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
          <TextFields
            value=""
            fullwidth="true"
            Label="PassWord"
            changeVal={setPassword}
            style={{ font: "16px", margin: "0px 8px", width: "100%" }}
            ></TextFields>
          <FormHelperText id="my-helper-text">
            We'll never share your Info.
          </FormHelperText>
        </FormControl>
      </div>
      <div>
        <input type="file" id="fileInput"accept="images/*"onChange={handleFileSubmit} style={{display:"none"}}></input>
        <label htmlFor="fileInput"><Button 
        variant="contained"
        color="default" 
        component='span' 
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        >
        Upload Profile Image
      </Button>
      </label>
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<VpnKeyIcon />}
        onClick={handleSignUp}
        >
        SignUp
      </Button>
      
    </div>
    </div>
    <h4 className={classes.loginLink}>Already have an account ? To Login <Button onClick={gotoLogin} className={classes.loginButton}>Click here</Button></h4>
    </div>
    </div>
    </>
  }
  </>
    );
  }

export default Signup;

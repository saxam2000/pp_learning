import React, { useState, useEffect, useContext } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import background from "./loginbackground.jpg";
import Buttons from "./Buttons";
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from "./Header";

const useStyles = makeStyles({
  page: {
    // border: "2px solid black",
    height: "100vh",
    //  margin:"3px",
    display: "flex",
    //  flexDirection:"row"
  },
  formPart: {
    // border: "2px solid green",
    width: "50vw",
    marginLeft:"1px",
    //    position:"relative",
    //    top:"30vh",
    //    left:"5vw"

       display:"flex",
       backgroundColor:"#ede5e5",
    //    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  form: {
      width:"40vw",
  },
  wallPart: {
    // border: "2px solid red",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    
    
    width: "60vw",
    // margin:"3px",
  },
  emailplusLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PasswordplusLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  additionalInfo: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  submit: {
    position: "relative",
    left: "26%",
  },
  errorDisp:{
      position:"absolute",
  },
  header:{
      position:"fixed",
  },
  nameTag:{
    color: "#940e63",
    position: "relative",
    fontSize: "3rem",
    fontWeight:"400",
    marginBottom: "26vh",
    fontStyle: "oblique",
      
  },
});

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  // const authcontext = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      history.push('/');
    } catch(e) {
      setError(e.message);
      setTimeout(() => setError(""), 3000);
      setLoading(false);
    }
  };
  const goToSignup=()=>{
      history.push('/signup')
  }
  useEffect(()=>{
      if(currentUser){//if user is already logged in dont show login p;age instead redirect it to feed page
          history.push('/');
      }
  },[])
  return (
      <>
      {loading?<h1><CircularProgress className={classes.loader} color="secondary" /></h1>:<>
      {error!==""?<Alert className={classes.errorDisp} severity="error">{error}</Alert>:<></>}{<>
      {/* <Header className={classes.header}></Header> */}
      <div className={classes.page}>
        <div className={classes.formPart}>
          <form onSubmit={handleSubmit} className={classes.form}>
              <h1 className={classes.nameTag}> LateLitre...</h1>
          <h3 style={{fontSize:"1.7rem"}}>Welcome back Mitra</h3>
            <div className={classes.emailplusLabel}>
              <label htmlFor="emailInput" style={{ width: "20%" }}> Email :</label>
              <TextField
                style={{ width: "75%" }}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="emailInput"
                label="Required"
                value={email}
                variant="outlined"
                />
            </div>
            <br></br>
            <div className={classes.PasswordplusLabel}>
              <label htmlFor="PasswordInput" style={{ width: "20%" }}> Password :</label>
              <TextField
                style={{ width: "75%" }}
                required
                id="PasswordInput"
                label="Required"
                type="password"
                value={password}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <br></br>
            <div className={classes.submit}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
              </Button>
            </div>
            <div className={classes.additionalInfo}>
              <Button color="primary" onClick={goToSignup}>
                <h4>register</h4>
              </Button>
              <Button color="secondary">
                <h4>forgot Password</h4>
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.wallPart}style={{ backgroundImage: `url(${background}) `,backgroundPosition: "center",backgroundSize: 'cover',
            overflow: 'hidden', width:"60vw",height:"100vh"}}>
          
        </div>
      </div>
    </>}
      
      </>
 }
                </>
  );
}

export default Login;

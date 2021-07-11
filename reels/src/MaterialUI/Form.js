import React, { useState, useEffect, useContext } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Buttons from "./Buttons";
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";

// import TextFields from './TextFields'
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },button: {
      margin: theme.spacing(1),
    },
    form: {
      backgroundColor: "black",
      margin: "5vh",
      position: "absolute",
      top: "50vh",
      backgroundColor: "black",
    },
  },
}));

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

function Form() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const authcontext = useContext(AuthContext);
  const { signup } = useContext(AuthContext);
  //   console.log(authcontext.currentUser);
    console.log(authcontext);

  async function handleSignUp(e) {
    e.preventDefault(); //form onsubmit rerenders the page to avoid that functionality preventdefault is used
    try {
      setLoading(true);
      let res = await signup(email, password);
      let uid = res.user.uid;
      console.log(uid);
      console.log(res);
      const uploadTaskListener = storage
        .ref(`/users/${uid}/profileImage`)
        .put(file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      // fn 1 -> progress tracking
      // fn2 -> error
      // fn3 -> success
      uploadTaskListener.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      }
      function fn2(error) {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
      }
      async function fn3() {
        let downloadUrl =
          await uploadTaskListener.snapshot.ref.getDownloadURL();
        console.log("File available at", downloadUrl);
        await database.users.doc(uid).set({
          email: email,
          userId: uid,
          username: name,
          createdAt: database.getCurrentTimeStamp(),
          profileUrl: downloadUrl,
          postIds: [],
        });
      }

      setLoading(false);
      console.log("User has Signed up");

      //   setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
      setTimeout(() => setError(""), 2000);
      setLoading(false);
    }
  }
  const handleFileSubmit = (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (file != null) setFile(file);
  };

  const classes = useStyles();
  console.log("Name ===", name);
  console.log("Password ===", password);
  console.log("Email ===", email);
  // const[name,setName]=React.useState("Saksham");
  return (
    <div
      className={classes.form}
      style={{ margin: "8px", position: "relative", top: "20vh", left: "10vw" }}
    >
      <FormControl>
        {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
        <Input
          color="primary"
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <TextFields
          value=""
          Label="Name"
          changeVal={setName}
          style={{ backgroundColor: "white", Color: "red" }}
        ></TextFields>
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>

      <FormControl style={{ margin: "0px 8px 0px 8px" }}>
        {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}

        <Input id="my-input" aria-describedby="my-helper-text" />
        <TextFields value="" Label="Email" changeVal={setEmail}></TextFields>
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
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </div>
      <div>
        <input type="file" id="fileInput"accept="images/*"onChange={handleFileSubmit}></input>
        <label htmlFor="fileInput"><Button 
        variant="contained"
        color="default"
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
  );
}

export default Form;

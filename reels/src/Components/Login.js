// ifAlready LoggedIn redirect to feed page else display login form 



import React, { useState,useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
// import {AuthContext} from '../Context/AuthProvider'
import { AuthContext } from "../Context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {currentUser}=useContext(AuthContext);
  const history=useHistory();
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
  useEffect(()=>{
      if(currentUser){//if user is already logged in dont show login p;age instead redirect it to feed page
          history.push('/');
      }
  },[])
  // console.log(authcontext);
  return (
    <div>
      {loading ? (
        <>Loading.....</>
      ) : (
        <>
          <form>
            <div className="form-group">
              <label htmlFor=" email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control"
                name="email"
                id=""
                aria-describedby="helpId"
                placeholder="email"
              ></input>
              <small id="helpId" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <label htmlFor=" Password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                className="form-control"
                name="email"
                id=""
                aria-describedby="helpId"
                placeholder="Password"
              ></input>
              <small id="helpId" className="form-text text-muted"></small>
            </div>
            <button type="submit" disabled={loading} onClick={handleSubmit}>
              Login
            </button>
          </form>
          {error==null?(<></>):(<>{error}</>)}
        </>
      )}
    </div>
  );
}

export default Login;

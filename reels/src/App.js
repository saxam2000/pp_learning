// import logo from "./logo.svg";
import "./App.css";
import Signup from "./Components/Signup";
import AuthProvider from "./Context/AuthProvider";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
// import Logins from "./Components/Logins";
// import Loa from "./Components/Loa";
import Feed from "./Components/Feed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import reactDom from "react-dom";
import PrivateRoute from './Components/PrivateRoute'
import Profile from "./Components/Profile";

function App() {
  return (
    <div className="App">
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feed}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/logout' component={Logout}/>
          <Route exact path='/profile' component={Profile}/>

        </Switch>
      </AuthProvider>
    </Router>
    </div>
    
  );
}

export default App;

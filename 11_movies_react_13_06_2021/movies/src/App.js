import Movies from "./Components/Movies";
import Home from "./Components/Home";
import About from "./Components/About";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        {/* //display several pages over different paths */}
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movies" component={Movies} />
          {/* <Route path='/about' component={About}/> */}
          <Route
            path="/about"
            render={(props) => <About {...props} isAuth={true} />}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;

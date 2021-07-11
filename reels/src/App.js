import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';


function App() {
  return (
    <div className="App">
     <h1>hello</h1>
     <AuthProvider>
       <Signup></Signup>
     </AuthProvider>
    </div>
  );
}

export default App;

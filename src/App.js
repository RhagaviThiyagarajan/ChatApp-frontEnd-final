import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
      <Route path='/login' component={Login}/>  
    <Route path='/signup' component={SignUp}/>  
    </div>
  );
}

export default App;

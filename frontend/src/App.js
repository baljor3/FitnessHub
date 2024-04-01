import './App.css';
import Login from './sectionfiles/Login';
import Register from './sectionfiles/Register'
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<Login></Login>}></Route>
      <Route path = "/register" element = {<Register></Register>}></Route>
    </Routes>
  );
}

export default App;

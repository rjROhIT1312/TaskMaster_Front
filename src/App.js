import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Task from './component/CreateTask';
import AllTask from './component/AllTasks';
import EditTask from './component/EditTask'


function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/AllTask" element={<AllTask/>} />
          <Route path ="/EditTask" element ={<EditTask/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setErrorMessage("You need to login again")
      }


      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

        const response = await axios.get(`http://localhost:9000/tasks/${userId}`,config);
        setTasks(response.data.data);
        
      } catch (error) {
        if (error.response && error.response.data.status === false) {
          // Unauthorized: Incorrect email or password
          setErrorMessage(error.response.data.message);
        } else {
          // Other error occurred
          setErrorMessage('An error occurred. Please try again later.');
        }
        
      }
    };

    fetchTasks();
  }, []);
  const handleEdit = (taskId,title,discription,dueDate,status) => {

    localStorage.setItem('taskId', taskId);
    localStorage.setItem('title', title)
    localStorage.setItem('discription', discription)
    localStorage.setItem('dueDate', dueDate)
    localStorage.setItem('status', status)
    
  };
  
  
  
  const handleDelete = async(taskId) => {
    
    localStorage.setItem('taskId', taskId)
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const taskId = localStorage.getItem('taskId')

      if (!token || !userId) {
        setErrorMessage("You need to login again")
      }


      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

        await axios.delete(`http://localhost:9000/task/${userId}/${taskId}`,config);
        setTasks(tasks.filter(task => task._id !== taskId));
        localStorage.removeItem('taskId');
        
      } catch (error) {
        if (error.response && error.response.data.status === false) {
          // Unauthorized: Incorrect email or password
          setErrorMessage(error.response.data.message);
        } else {
          // Other error occurred
          setErrorMessage('An error occurred. Please try again later.');
        }
        
      }
    }
  };

  return (
    <div className="container text-center my-2">
      <h1>Task List</h1>
      {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table className="table table-bordered table-hover table-striped"style={{ backgroundColor:'white' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {tasks.map(task => {
    return (
      <tr key={task._id}>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.dueDate}</td>
        <td>{task.status}</td>
        <td>
        <a className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(task._id,task.title,task.description,task.dueDate,task.status)} href='/EditTask'>Edit</a>

          <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(task._id)}>Delete</button>
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;




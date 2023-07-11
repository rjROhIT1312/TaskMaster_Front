import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tit = localStorage.getItem('title');
const dis = localStorage.getItem('discription');
const due = localStorage.getItem('dueDate');
const sta = localStorage.getItem('status');

const EditTaskForm = () => {
  const [title, setTitle] = useState(tit);
  const [description, setDescription] = useState(dis);
  const [dueDate, setDueDate] = useState(due);
  const [status, setStatus] = useState(sta);
  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
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




       await axios.put(`http://localhost:9000/task/${userId}/${taskId}`,{title,description,dueDate,status},
      config
      )
      navigate('/AllTask')
      localStorage.removeItem('taskId');
        localStorage.removeItem('title');
        localStorage.removeItem('discription');
        localStorage.removeItem('dueDate');
        localStorage.removeItem('status');

    }catch (error){
      if (error.response && error.response.data.status === false) {
        // Unauthorized: Incorrect email or password
        setErrorMessage(error.response.data.message);
      } else {
        // Other error occurred
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <div className="container">
      <h1 className="text-center mt-4">Edit Your Task</h1>
      <div className="bg-white shadow p-4 mt-4 mx-auto sign-up-form" style={{ width: '23.125rem', borderRadius: '0.313rem' }}>
      {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input type="date" className="form-control" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div className="form-group">
  <label htmlFor="status">Status</label>
  <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
    <option value="">Select Status</option>
    <option value="In Progress">In Progress</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>
</div>
        <div className="text-center">
        <button type="submit" className="btn btn-primary my-3">Edit</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditTaskForm;



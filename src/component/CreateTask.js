import axios from 'axios';
import React, { useState } from 'react';

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
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




       await axios.post(`http://localhost:9000/task/${userId}`,{title,description,dueDate,status},
      config
      )
      setShowSuccessAlert(true);
    }catch (error){

    }
    // Reset form fields
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('');
  };


  return (
    <div className="container">
      <h1 className="text-center mt-4">Create a Task</h1>
      <div className="bg-white shadow p-4 mt-4 mx-auto sign-up-form" style={{ width: '23.125rem', borderRadius: '0.313rem' }}>
      {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {showSuccessAlert && (
          <div className="alert alert-success" role="alert">
            Task created successfully! Go to Your Tasks to check your All Tasks
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
        <button type="submit" className="btn btn-primary my-3">Create</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;



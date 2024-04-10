import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [records, setRecords] = useState([]);
  const [tempRecord, setTempRecord] = useState({ title: '', body: '' });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => setRecords(res.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleAddRecord = () => {
    if (tempRecord.title.trim() !== '' && tempRecord.body.trim() !== '') {
      setRecords((prevRecords) => [ tempRecord,...prevRecords]);
      setTempRecord({ title: '', body: '' });
    }
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              name="title"
              value={tempRecord.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              rows={3}
              placeholder="Enter body"
              name="body"
              value={tempRecord.body}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" onClick={handleAddRecord}>
            Add Record
          </button>
        </form>
{/* 
        <h3>Temporary Record</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tempRecord.title}</td>
              <td>{tempRecord.body}</td>
            </tr>
          </tbody>
        </table> */}

        <h3>Permanent Records</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {records.slice(0,10).map((record, index) => (
              <tr key={index}>
                <td>{record.title}</td>
                <td>{record.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

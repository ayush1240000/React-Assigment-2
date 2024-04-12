import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

function App() {
  const [records, setRecords] = useState([]);
  const [tempRecord, setTempRecord] = useState({ title: '', body: '' });
  const [editingIndex, setEditingIndex] = useState(null);

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
      setRecords((prevRecords) => [tempRecord, ...prevRecords]);
      setTempRecord({ title: '', body: '' });
    }
  };

  const handleUpdateRecord = (index) => {
    if (tempRecord.title.trim() !== '' && tempRecord.body.trim() !== '') {
      const updatedRecords = [...records];
      updatedRecords[index] = tempRecord;
      setRecords(updatedRecords);
      setTempRecord({ title: '', body: '' });
      setEditingIndex(null);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setTempRecord(records[index]);
  };

  const handleDelete = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
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
              className="form-control"
              id="body"
              rows={3}
              placeholder="Enter body"
              name="body"
              value={tempRecord.body}
              onChange={handleInputChange}
            />
          </div>

          <Button variant="primary" onClick={handleAddRecord}>
            Add Record
          </Button>
        </form>
        <h3>Permanent Records</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td onClick={() => handleEditClick(index)}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={tempRecord.title}
                      name="title"
                      onChange={handleInputChange}
                      onBlur={() => handleUpdateRecord(index)}
                    />
                  ) : (
                    record.title
                  )}
                </td>
                <td onClick={() => handleEditClick(index)}>
                  {editingIndex === index ? (
                    <textarea
                      rows="3"
                      value={tempRecord.body}
                      name="body"
                      onChange={handleInputChange}
                      onBlur={() => handleUpdateRecord(index)}
                    />
                  ) : (
                    record.body
                  )}
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;

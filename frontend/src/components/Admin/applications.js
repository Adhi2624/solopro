import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('/api/applications').then((response) => {
      setApplications(response.data);
    });
  }, []);

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <Header title="Applications" />
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
          <div className="card shadow border-0 mb-7">
            <div className="card-header">
              <h5 className="mb-0">Applications</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-nowrap">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Student Name</th>
                    <th scope="col">Course</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.studentName}</td>
                      <td>{app.course}</td>
                      <td>{app.status}</td>
                      <td>
                        <button className="btn btn-sm btn-neutral">View</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Applications;

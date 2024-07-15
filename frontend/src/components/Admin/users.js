import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <Header title="Users" />
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
          <div className="card shadow border-0 mb-7">
            <div className="card-header">
              <h5 className="mb-0">User Accounts</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-nowrap" >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody style={{color:'white'}}>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-sm btn-neutral">Edit</button>
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

export default Users;

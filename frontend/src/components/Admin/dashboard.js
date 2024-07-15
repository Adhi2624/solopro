import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('/api/statistics').then((response) => {
      setStats(response.data);
    });
  }, []);

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <Header title="Dashboard" />
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
          <div className="row g-6 mb-6">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">Budget</span>
                      <span className="h3 font-bold mb-0">{stats.budget}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <i className="bi bi-credit-card"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">New Projects</span>
                      <span className="h3 font-bold mb-0">{stats.newProjects}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                        <i className="bi bi-people"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Hours</span>
                      <span className="h3 font-bold mb-0">{stats.totalHours}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                        <i className="bi bi-clock-history"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">Work Load</span>
                      <span className="h3 font-bold mb-0">{stats.workLoad}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                        <i className="bi bi-minecart-loaded"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

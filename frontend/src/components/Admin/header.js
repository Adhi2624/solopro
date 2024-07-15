import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="bg-surface-primary border-bottom pt-6">
      <div className="container-fluid">
        <div className="mb-npx">
          <div className="row align-items-center">
            <div className="col-sm-6 col-12 mb-4 mb-sm-0">
              <h1 className="h2 mb-0 ls-tight">{title}</h1>
            </div>
            <div className="col-sm-6 col-12 text-sm-end">
              <div className="mx-n1">
                <a href="#" className="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                  <span className="pe-2">
                    <i className="bi bi-pencil"></i>
                  </span>
                  <span>Edit</span>
                </a>
                <a href="#" className="btn d-inline-flex btn-sm btn-primary mx-1">
                  <span className="pe-2">
                    <i className="bi bi-plus"></i>
                  </span>
                  <span>Create</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
